import React from "react";
import UserInf from "../../../data_type/Auth/UserInf";
import {useAppDispatch, useAppSelector} from "../../../redux/Hooks";
import BookCartInf from "../../../data_type/Product/BookCartInf";
import BookDetailInf from "../../../data_type/Product/BookDetailInf";
import {GetBookDetailById} from "../../function";
import formatCurrencyVND from "../../function/FormatCurrencyVND";
import {DiscountProductMoney, GetImagePrimaryFromArrayImage} from "../../function";
import {REGEX_EMAIL, REGEX_NAME, REGEX_PHONENUMBER} from "../../Regex";
import {Link, useNavigate} from "react-router-dom";
import PaymentRequest from "../../../data_type/Payment/PaymentRequest";
import {setCounter} from "../../../redux/slice/CounterSlice";
import {ListBookPayment} from "../../../data_type/Payment/ListBookPayment";
import {CreateOrderAPI} from "../../../api/Order/CreateOrderAPI";
import {GetDistrictAPI, GetProvinceAPI, GetWardAPI, WardInf} from "../../../api/Address";
import {ProvinceInf} from "../../../api/Order/GetProvinceByShippingAddressIdAPI";
import {DistrictInf} from "../../../api/Order/GetDistrictByShippingAddressIdAPI";
import {Bounce, toast} from "react-toastify";

enum PaymentMethod {
    CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
    BANK_TRANSFER = 'BANK_TRANSFER'
}

export const PaymentPage: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const messageSuccess = (message: string) => toast.success(message, {autoClose: 2000, transition: Bounce});
    const messageError = (message: string) => toast.error(message, {autoClose: 2000, transition: Bounce});

    const user: UserInf | null = useAppSelector(state => state.User.value)
    const listIdBookPayment: ListBookPayment[] = sessionStorage.getItem('listBookPayment') ? JSON.parse(sessionStorage.getItem('listBookPayment') as string) : []
    const [listBookPayment, setListBookPayment] = React.useState<BookDetailInf[]>([])

    const [fullName, setFullName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [phone, setPhone] = React.useState<string>('')
    const [province, setProvince] = React.useState<number>(0)
    const [district, setDistrict] = React.useState<number>(0)
    const [ward, setWard] = React.useState<number>(0)
    const [address, setAddress] = React.useState<string>('')
    const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(PaymentMethod.CASH_ON_DELIVERY)

    const [provinces, setProvinces] = React.useState<ProvinceInf[]>([])
    const [districts, setDistricts] = React.useState<DistrictInf[]>([])
    const [wards, setWards] = React.useState<WardInf[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)

    const [errorName, setErrorName] = React.useState<string>('')
    const [errorEmail, setErrorEmail] = React.useState<string>('')
    const [errorPhone, setErrorPhone] = React.useState<string>('')
    const [errorProvince, setErrorProvince] = React.useState<string>('')
    const [errorDistrict, setErrorDistrict] = React.useState<string>('')
    const [errorWard, setErrorWard] = React.useState<string>('')
    const [errorAddress, setErrorAddress] = React.useState<string>('')

    const getTotalMoney = (): number => {
        let totalMoney = 0
        listBookPayment.forEach((book) => {
            const quantity = getQuantityBookInCart(book.bookId)
            if (book.bookDiscount > 0) {
                totalMoney += DiscountProductMoney(book.bookPrice, book.bookDiscount) * quantity
            } else {
                totalMoney += book.bookPrice * quantity
            }
        })
        return totalMoney
    }

    const getQuantityBookInCart = (bookID: number): number => {
        const bookInCart = listIdBookPayment.find((book) => book.bookID === bookID)
        if (bookInCart) {
            return bookInCart.quantity
        }
        return 0
    }

    const validateForm = (): boolean => {
        let check = true

        if (fullName === '') {
            setErrorName('Vui lòng nhập trường này')
            check = false
        } else {
            if (!fullName.match(REGEX_NAME)) {
                setErrorName('Phải là chữ, tối thiểu 2 kí tự')
                check = false
            }
        }
        if (email === '') {
            setErrorEmail('Vui lòng nhập trường này')
            check = false
        } else {
            if (!email.match(REGEX_EMAIL)) {
                setErrorEmail('Email không hợp lệ')
                check = false
            }
        }
        if (phone === '') {
            setErrorPhone('Vui lòng nhập trường này')
            check = false
        } else {
            if (!phone.match(REGEX_PHONENUMBER)) {
                setErrorPhone('Số điện thoại không hợp lệ')
                check = false
            }
        }
        if (province === 0) {
            setErrorProvince("Vui lòng nhập trường này")
            check = false
        }
        if (district === 0) {
            setErrorDistrict("Vui lòng nhập trường này")
            check = false
        }
        if (ward === 0) {
            setErrorWard("Vui lòng nhập trường này")
            check = false
        }
        if (address === '') {
            setErrorAddress('Vui lòng nhập trường này')
            check = false
        }

        return check
    }

    const ressetPaymentDetail = () => {
        setFullName('')
        setEmail('')
        setPhone('')
        setProvince(0)
        setDistrict(0)
        setWard(0)
        setAddress('')
        setPaymentMethod(PaymentMethod.CASH_ON_DELIVERY)
    }

    const paymentRequest: PaymentRequest = {
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        userID: user ? user.userID : 0,
        paymentMethod: paymentMethod,
        provinceID: province,
        districtID: district,
        wardID: ward,
        address: address,
        listBookOrder: listBookPayment.map((book) => {
            return {
                bookID: book.bookId,
                quantity: getQuantityBookInCart(book.bookId)
            }
        })
    }

    const removeBookInCart = (listIDBook: ListBookPayment[]) => {
        const listBookInCart = JSON.parse(localStorage.getItem('cart') as string)
        const newListBookInCart = listBookInCart.filter((book: BookCartInf) => {
            return !listIDBook.some((bookPayment) => book.bookID === bookPayment.bookID)
        })
        localStorage.setItem('cart', JSON.stringify(newListBookInCart))
        dispatch(setCounter(newListBookInCart.length))
    }

    const payment = () => {
        if (validateForm()) {
            setLoading(true)
            CreateOrderAPI(paymentRequest).then(() => {
                messageSuccess("Đặt hàng thành công")
                ressetPaymentDetail()
                removeBookInCart(listIdBookPayment)
                navigate("/")
            }).catch((e) => {
                messageError("Có lỗi xảy ra, vui lòng thử lại sau")
            }).finally(() => {
                setLoading(false)
            })
        }
        document.getElementById('FormUpdate-payment')?.scrollIntoView({behavior: "smooth"})
    }

    React.useEffect(() => {
        if (user) {
            setFullName(user.fullName)
            setEmail(user.email)
            setPhone(user.phone)
        }
    }, [user]);

    React.useEffect(() => {
        GetProvinceAPI().then(data => {
            setProvinces(data)
        }).catch(e => {
            setErrorProvince("Có lỗi xảy ra, vui lòng thử lại sau")
        })
    }, []);

    React.useEffect(() => {
        GetDistrictAPI(province).then(data => {
            setDistricts(data)
            if (data.length === 0) {
                setDistrict(0)
                setWard(0)
            }
        }).catch(e => {
            // setErrorDistrict("Có lỗi xảy ra, vui lòng thử lại sau")
        })
        if (province === 0) {
            setDistrict(0)
            setWard(0)
        }
    }, [province, provinces]);

    React.useEffect(() => {
        if (district !== 0) {
            GetWardAPI(district).then(data => {
                setWards(data)
                if (data.length === 0) setWard(0)
            }).catch((e: any) => {
                // setErrorWard("Có lỗi xảy ra, vui lòng thử lại sau")
            })
            setWard(0)
            return
        }
        if (district === 0) setWard(0)
    }, [district, districts])

    React.useEffect(() => {
        Promise.all(listIdBookPayment.map(async (book) => {
            return await GetBookDetailById(book.bookID);
        })).then(listBookPaymentDetail => {
            setListBookPayment(listBookPaymentDetail)
        }).catch(e => {
            console.error(e)
        })
    }, [])

    return (
        <div className={"container-fluid bg-light py-4"}>
            {
                !user ?
                    <div
                        className={"container bg-white rounded my-3 d-flex flex-row justify-content-start align-items-center shadow-sm"}>
                        <i className="bi bi-exclamation-triangle text-danger fs-3"></i>
                        <span className={"fs-5 m-3"}>
                            Bạn đã là thành viên !
                            <Link to={"/login"}
                                  className={"ms-auto text-decoration-underline text-danger fw-bold ps-2"}>Đăng nhập</Link>
                        </span>
                    </div> : null
            }
            <div id={"FormUpdate-payment"} className={"container bg-white rounded py-3 shadow-sm"}>
                <span className={"fw-semibold fs-5"}>ĐỊA CHỈ GIAO HÀNG</span>
                <hr/>
                <form>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Họ và tên người nhận</label>
                        <input value={fullName} onChange={(e) => {
                            setFullName(e.target.value)
                            setErrorName('')
                        }} type="text" className="form-control" id="fullname"
                               placeholder="Nhập họ và tên người nhận"/>
                        <span className={"text-danger"}>{errorName}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input value={email} onChange={(e) => {
                            setEmail(e.target.value)
                            setErrorEmail('')
                        }} type="email" className="form-control" id="email"
                               placeholder={"Nhập email"}/>
                        <span className={"text-danger"}>{errorEmail}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Số điện thoại</label>
                        <input value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                            setErrorPhone('')
                        }} type="tel" className="form-control" id="phone"
                               placeholder={"Ví dụ: 0348323xxx (10 chữ số)"}/>
                        <span className={"text-danger"}>{errorPhone}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="province" className="form-label">Tỉnh/Thành Phố</label>
                        <select className="form-select" id="province"
                                value={province !== 0 ? province : 0}
                                onChange={(e) => {
                                    setProvince(Number(e.target.value))
                                    setErrorProvince('')
                                }
                                }>
                            <option value={0}>Chọn Tỉnh/Thành phố</option>
                            {
                                provinces.map((province) => (
                                    <option key={province.provinceID} value={province.provinceID}>
                                        {province.provinceName}
                                    </option>
                                ))
                            }
                        </select>
                        <span className={"text-danger"}>{errorProvince}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="district" className="form-label">Quận/Huyện</label>
                        <select className="form-select" id="district"
                                disabled={province === 0}
                                value={district !== 0 ? district : 0}
                                onChange={(e) => {
                                    setDistrict(Number(e.target.value))
                                    setErrorDistrict('')
                                }}>
                            <option value={0}>Chọn Quận/Huyện</option>
                            {
                                districts.map((district) => (
                                    <option key={district.districtID} value={district.districtID}>
                                        {district.districtName}
                                    </option>
                                ))
                            }
                        </select>
                        <span className={"text-danger"}>{errorDistrict}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ward" className="form-label">Phường/Xã</label>
                        <select className="form-select" id="ward"
                                disabled={district === 0}
                                value={ward !== 0 ? ward : 0}
                                onChange={(e) => {
                                    setWard(Number(e.target.value))
                                    setErrorWard('')
                                }}>
                            <option value={0}>Chọn Phường/Xã</option>
                            {
                                wards.map((ward) => (
                                    <option key={ward.wardID} value={ward.wardID}>
                                        {ward.wardName}
                                    </option>
                                ))
                            }
                        </select>
                        <span className={"text-danger"}>{errorWard}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Địa chỉ nhận hàng</label>
                        <input value={address} onChange={(e) => {
                            setAddress(e.target.value)
                            setErrorAddress('')
                        }} type="text" className="form-control" id="address"
                               placeholder={"Nhập địa chỉ nhận hàng"}/>
                        <span className={"text-danger"}>{errorAddress}</span>
                    </div>
                </form>
            </div>

            <div className={"container bg-white rounded py-3 mt-4 shadow-sm"}>
                <span className={"fw-semibold fs-5"}>PHƯƠNG THỨC THANH TOÁN</span>
                <hr/>
                <div className="form-check d-flex align-items-center">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="money"
                           onClick={() => setPaymentMethod(PaymentMethod.CASH_ON_DELIVERY)}
                           value={PaymentMethod.CASH_ON_DELIVERY}
                           onChange={() => setPaymentMethod(PaymentMethod.CASH_ON_DELIVERY)}
                           checked={paymentMethod === PaymentMethod.CASH_ON_DELIVERY}/>
                    <label className="form-check-label d-flex align-items-center ms-3 cussor-pointer" htmlFor="money">
                        <i className="bi bi-cash-coin fs-2 text-danger"></i>
                        <span className={"ms-3"}>Thanh toán khi nhận hàng</span>
                    </label>
                </div>
                <div className="form-check d-flex align-items-center">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="card"
                           onClick={() => setPaymentMethod(PaymentMethod.BANK_TRANSFER)}
                           onChange={() => setPaymentMethod(PaymentMethod.BANK_TRANSFER)}
                           value={PaymentMethod.BANK_TRANSFER}
                           checked={paymentMethod === PaymentMethod.BANK_TRANSFER}
                    />
                    <label className="form-check-label d-flex align-items-center ms-3 cussor-pointer" htmlFor="card">
                        <i className="bi bi-credit-card-2-front fs-2 text-danger"></i>
                        <span className={"ms-3"}>Chuyển khoản</span>
                    </label>
                </div>
            </div>

            <div className={"container bg-white rounded py-3 mt-4 shadow-sm"}>
                <span className={"fw-semibold fs-5"}>KIỂM TRA LẠI ĐƠN HÀNG</span>
                <hr/>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <span className={"fw-semibold fs-6"}>Thông tin sách</span>
                    </div>
                    <div className={"col-2 text-center d-none d-lg-block"}>
                        <span className={"fw-semibold fs-6"}>Giá sản phẩm</span>
                    </div>
                    <div className={"col-2 text-center d-none d-lg-block"}>
                        <span className={"fw-semibold fs-6"}>Số lượng</span>
                    </div>
                    <div className={"col-2 text-center d-none d-lg-block"}>
                        <span className={"fw-semibold fs-6"}>Thành tiền</span>
                    </div>
                </div>
                <hr/>
                {
                    listBookPayment.map((book, index) => {
                        return (
                            <div key={book.bookId} className={"row"}>
                                <div className={"col-12 col-lg-6 d-flex flex-row"}>
                                    <img src={GetImagePrimaryFromArrayImage(book.bookImage)}
                                         alt={book.bookTitle}
                                         className={"img-fluid"}
                                         style={{width: "150px", height: "auto"}}/>
                                    <div className={"d-flex flex-column justify-content-start align-items-start"}>
                                        <span className={"fw-semibold"}>{book.bookTitle}</span>
                                        <div className={"d-block d-lg-none"}>
                                            {
                                                book.bookDiscount > 0 ? (
                                                    <div className={"d-flex flex-row mt-1"}>
                                                    <span
                                                        className={"text-danger fw-bold"}>{formatCurrencyVND(DiscountProductMoney(book.bookPrice, book.bookDiscount))}</span>
                                                        <span
                                                            className={"text-decoration-line-through ms-3"}>{formatCurrencyVND(book.bookPrice)}</span>
                                                    </div>
                                                ) : (
                                                    <p
                                                        className={"text-danger"}>{formatCurrencyVND(book.bookPrice)}</p>
                                                )
                                            }
                                            <div className={"mt-1"}>
                                                <span className={"fw-semibold"}>Số lượng:</span>
                                                <span className={"ms-2"}>{getQuantityBookInCart(book.bookId)}</span>
                                            </div>
                                            {/*{*/}
                                            {/*    book.bookDiscount > 0 ? (*/}
                                            {/*        <p*/}
                                            {/*            className={"text-warning fw-bold"}>{formatCurrencyVND(DiscountProductMoney(book.bookPrice, book.bookDiscount) * getQuantityBookInCart(book.bookId))}</p>*/}
                                            {/*    ) : (*/}
                                            {/*        <p*/}
                                            {/*            className={"text-warning"}>{formatCurrencyVND(book.bookPrice * getQuantityBookInCart(book.bookId))}</p>*/}
                                            {/*    )*/}
                                            {/*}*/}
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-2 flex-column align-items-center d-none d-lg-flex"}>
                                    {
                                        book.bookDiscount > 0 ? (
                                            <>
                                                <span
                                                    className={"text-danger fw-bold"}>{formatCurrencyVND(DiscountProductMoney(book.bookPrice, book.bookDiscount))}</span>
                                                <span
                                                    className={"text-decoration-line-through"}>{formatCurrencyVND(book.bookPrice)}</span>
                                            </>
                                        ) : (
                                            <span className={"text-danger"}>{formatCurrencyVND(book.bookPrice)}</span>
                                        )
                                    }
                                </div>
                                <div className={"col-2 text-center d-none d-lg-block"}>
                                    <span>{getQuantityBookInCart(book.bookId)}</span>
                                </div>
                                <div className={"col-2 text-center d-none d-lg-block"}>
                                    {
                                        book.bookDiscount > 0 ? (
                                            <span
                                                className={"text-warning fw-bold"}>{formatCurrencyVND(DiscountProductMoney(book.bookPrice, book.bookDiscount) * getQuantityBookInCart(book.bookId))}</span>
                                        ) : (
                                            <span
                                                className={"text-warning"}>{formatCurrencyVND(book.bookPrice * getQuantityBookInCart(book.bookId))}</span>
                                        )
                                    }
                                </div>
                                {
                                    index !== listBookPayment.length - 1 ? (
                                        <hr className={"my-4"}/>
                                    ) : null
                                }
                            </div>
                        )
                    })
                }
            </div>

            <div
                className={"container bg-white rounded my-4 py-4 d-flex flex-column flex-md-row justify-content-between align-items-center position-sticky bottom-0 shadow-sm"}>
                <span className={"fs-2 fw-bold text-danger"}>TỔNG TIỀN: {formatCurrencyVND(getTotalMoney())}</span>
                <button
                    disabled={loading}
                    onClick={() => {
                        payment()
                    }}
                    type="button"
                    className="btn btn-danger fw-semibold py-3 px-5"
                >
                    {
                        loading ? "Đang Xử Lý..." : "XÁC NHẬN ĐẶT HÀNG"
                    }
                </button>
            </div>
        </div>
    );
}