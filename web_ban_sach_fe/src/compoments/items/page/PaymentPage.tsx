import React from "react";
import UserInf from "../../data_type/Auth/UserInf";
import {useAppSelector} from "../../redux/Hooks";
import GetProvince from "../../api/Address/GetProvince";
import ProvinceInf from "../../data_type/Address/ProvinceInf";
import DistrictInf from "../../data_type/Address/DistrictInf";
import WardInf from "../../data_type/Address/WardInf";
import PaymentDetailInf from "../../data_type/Payment/PaymentDetailInf";
import GetDistrict from "../../api/Address/GetDistrict";
import GetWard from "../../api/Address/GetWard";
import BookCartInf from "../../data_type/Product/BookCartInf";
import BookDetailInf from "../../data_type/Product/BookDetailInf";
import {GetBookDetailById} from "../function";
import formatCurrencyVND from "../function/FormatCurrencyVND";
import {DiscountProductMoney, GetImagePrimaryFromArrayImage} from "../function";
import {REGEX_EMAIL, REGEX_NAME, REGEX_PHONENUMBER} from "../Regex";
import {Link} from "react-router-dom";

enum PaymentMethod {
    CASH_ON_DELIVERY = 'money',
    BANK_TRANSFER = 'card'
}

export const PaymentPage: React.FC = () => {

    const user: UserInf | null = useAppSelector(state => state.User.value)
    const listIdBookPayment: number[] = sessionStorage.getItem('listBookPayment') ? JSON.parse(sessionStorage.getItem('listBookPayment') as string) : []
    const listBookInCart: BookCartInf[] = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : []
    const [listBookPayment, setListBookPayment] = React.useState<BookDetailInf[]>([])
    const [paymentDetail, setPaymentDetail] = React.useState<PaymentDetailInf>({
        fullName: '',
        email: '',
        phone: '',
        province: {provinceID: 0, provinceName: ''},
        district: {districtID: 0, districtName: ''},
        ward: {wardID: 0, wardName: ''},
        address: '',
        paymentMethod: ''
    })
    const [provinces, setProvinces] = React.useState<ProvinceInf[]>([])
    const [districts, setDistricts] = React.useState<DistrictInf[]>([])
    const [wards, setWards] = React.useState<WardInf[]>([])
    const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(PaymentMethod.CASH_ON_DELIVERY)

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
        const bookInCart = listBookInCart.find((book) => book.bookID === bookID)
        if (bookInCart) {
            return bookInCart.quantity
        }
        return 0
    }

    const getProvincesByProvinceID = (provinceID: number): ProvinceInf => {
        if (provinces.length > 0) {
            const province = provinces.find((province) => province.provinceID === provinceID)
            if (province) {
                return province
            }
            return {provinceID: 0, provinceName: ''}
        }
        return {provinceID: 0, provinceName: ''}
    }


    const getDistrictByDistrictID = (districtID: number): DistrictInf => {
        if (districts.length > 0) {
            const district = districts.find((district) => district.districtID === districtID)
            if (district) {
                return district
            }
            return {districtID: 0, districtName: ''}
        }
        return {districtID: 0, districtName: ''}
    }

    const getWardByWardID = (wardID: number): WardInf => {
        if (wards.length > 0) {
            const ward = wards.find((ward) => ward.wardID === wardID)
            if (ward) {
                return ward
            }
            return {wardID: 0, wardName: ''}
        }
        return {wardID: 0, wardName: ''}
    }


    React.useEffect(() => {
        if (user) {
            setPaymentDetail(prevPaymentDetail => ({
                ...prevPaymentDetail,
                fullName: user?.fullName ? user.fullName : '',
                email: user?.email ? user.email : '',
                phone: user?.phone ? user.phone : '',
            }));
        }
    }, [user]);


    React.useEffect(() => {
        GetProvince().then(data => {
            setProvinces(data)
        }).catch(e => {
            console.log(e)
        })
    }, []);


    React.useEffect(() => {
        if (paymentDetail.province.provinceID !== 0) {
            GetDistrict(paymentDetail.province.provinceID).then(data => {
                setDistricts(data)
            }).catch(e => {
                console.log(e)
            })
            return
        }
        setPaymentDetail(prevPaymentDetail => ({
            ...prevPaymentDetail,
            district: {districtID: 0, districtName: ''},
            ward: {wardID: 0, wardName: ''}
        }));
    }, [paymentDetail.province, provinces]);


    React.useEffect(() => {
        if (paymentDetail.district.districtID !== 0) {
            GetWard(paymentDetail.district.districtID).then(data => {
                setWards(data)
            }).catch(e => {
                console.log(e)
            })
            return
        }
        setPaymentDetail(prevPaymentDetail => ({
            ...prevPaymentDetail,
            ward: {wardID: 0, wardName: ''}
        }));
    }, [paymentDetail.district, districts]);

    React.useEffect(() => {
        Promise.all(listIdBookPayment.map(async (bookID) => {
            return await GetBookDetailById(bookID);
        })).then(listBookPaymentDetail => {
            setListBookPayment(listBookPaymentDetail)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    const validateForm = (): boolean => {
        let check = true

        if (paymentDetail.fullName === '') {
            setErrorName('Vui lòng nhập trường này')
            check = false
        } else {
            if (!paymentDetail.fullName.match(REGEX_NAME)) {
                setErrorName('Phải là chữ, tối thiểu 2 kí tự')
                check = false
            }
        }
        if (paymentDetail.email === '') {
            setErrorEmail('Vui lòng nhập trường này')
            check = false
        } else {
            if (!paymentDetail.email.match(REGEX_EMAIL)) {
                setErrorEmail('Email không hợp lệ')
                check = false
            }
        }
        if (paymentDetail.phone === '') {
            setErrorPhone('Vui lòng nhập trường này')
            check = false
        } else {
            if (!paymentDetail.phone.match(REGEX_PHONENUMBER)) {
                setErrorPhone('Số điện thoại không hợp lệ')
                check = false
            }
        }
        if (paymentDetail.province.provinceID === 0) {
            setErrorProvince("Vui lòng nhập trường này")
            check = false
        }
        if (paymentDetail.district.districtID === 0) {
            setErrorDistrict("Vui lòng nhập trường này")
            check = false
        }
        if (paymentDetail.ward.wardID === 0) {
            setErrorWard("Vui lòng nhập trường này")
            check = false
        }
        if (paymentDetail.address === '') {
            setErrorAddress('Vui lòng nhập trường này')
            check = false
        }

        return check
    }

    return (
        <div className={"container-fluid bg-light py-4"}>
            {
                !user ?
                    <div
                        className={"container bg-white rounded my-3 d-flex flex-row justify-content-start align-items-center"}>
                        <i className="bi bi-exclamation-triangle text-danger fs-3"></i>
                        <span className={"fs-5 m-3"}>
                            Bạn đã là thành viên !
                            <Link to={"/login"}
                                  className={"ms-auto text-decoration-underline text-danger fw-bold ps-2"}>Đăng nhập</Link>
                        </span>
                    </div> : null
            }
            <div className={"container bg-white rounded py-3"}>
                <span className={"fw-semibold fs-5"}>ĐỊA CHỈ GIAO HÀNG</span>
                <hr/>
                <form>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Họ và tên người nhận</label>
                        <input value={paymentDetail.fullName} onChange={(e) => {
                            setPaymentDetail({...paymentDetail, fullName: e.target.value})
                            setErrorName('')
                        }} type="text" className="form-control" id="fullname"
                               placeholder="Nhập họ và tên người nhận"/>
                        <span className={"text-danger"}>{errorName}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input value={paymentDetail.email} onChange={(e) => {
                            setPaymentDetail({...paymentDetail, email: e.target.value})
                            setErrorEmail('')
                        }} type="email" className="form-control" id="email"
                               placeholder={"Nhập email"}/>
                        <span className={"text-danger"}>{errorEmail}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Số điện thoại</label>
                        <input value={paymentDetail.phone} onChange={(e) => {
                            setPaymentDetail({...paymentDetail, phone: e.target.value})
                            setErrorPhone('')
                        }} type="tel" className="form-control" id="phone"
                               placeholder={"Ví dụ: 0348323xxx (10 chữ số)"}/>
                        <span className={"text-danger"}>{errorPhone}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="province" className="form-label">Tỉnh/Thành Phố</label>
                        <select className="form-select" id="province"
                                value={paymentDetail.province.provinceID !== 0 ? paymentDetail.province.provinceID : 0}
                                onChange={(e) => {
                                    setPaymentDetail({
                                        ...paymentDetail,
                                        province: getProvincesByProvinceID(Number(e.target.value))
                                    })
                                    setErrorProvince('')
                                }
                                }>
                            <option value={0}>Chọn Tỉnh/Thành phố</option>
                            {provinces.map((province) => (
                                <option key={province.provinceID}
                                        value={province.provinceID}>{province.provinceName}</option>
                            ))}
                        </select>
                        <span className={"text-danger"}>{errorProvince}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="district" className="form-label">Quận/Huyện</label>
                        <select className="form-select" id="district"
                                disabled={paymentDetail.province.provinceID === 0}
                                value={paymentDetail.district.districtID !== 0 ? paymentDetail.district.districtID : 0}
                                onChange={(e) => {
                                    setPaymentDetail({
                                        ...paymentDetail,
                                        district: getDistrictByDistrictID(Number(e.target.value))
                                    })
                                    setErrorDistrict('')
                                }}>
                            <option value={0}>Chọn Quận/Huyện</option>
                            {districts.map((district) => (
                                <option key={district.districtID}
                                        value={district.districtID}>{district.districtName}</option>
                            ))}
                        </select>
                        <span className={"text-danger"}>{errorDistrict}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ward" className="form-label">Phường/Xã</label>
                        <select className="form-select" id="ward"
                                disabled={paymentDetail.district.districtID === 0}
                                value={paymentDetail.ward.wardID !== 0 ? paymentDetail.ward.wardID : 0}
                                onChange={(e) => {
                                    setPaymentDetail({
                                        ...paymentDetail,
                                        ward: getWardByWardID(Number(e.target.value))
                                    })
                                    setErrorWard('')
                                }}>
                            <option value={0}>Chọn Phường/Xã</option>
                            {wards.map((ward) => (
                                <option key={ward.wardID} value={ward.wardID}>{ward.wardName}</option>
                            ))}
                        </select>
                        <span className={"text-danger"}>{errorWard}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Địa chỉ nhận hàng</label>
                        <input value={paymentDetail.address} onChange={(e) => {
                            setPaymentDetail({...paymentDetail, address: e.target.value})
                            setErrorAddress('')
                        }} type="text" className="form-control" id="address"
                               placeholder={"Nhập địa chỉ nhận hàng"}/>
                        <span className={"text-danger"}>{errorAddress}</span>
                    </div>
                </form>
            </div>

            <div className={"container bg-white rounded py-3 mt-4"}>
                <span className={"fw-semibold fs-5"}>PHƯƠNG THỨC THANH TOÁN</span>
                <hr/>
                <div className="form-check d-flex align-items-center">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="money"
                           onClick={() => setPaymentMethod(PaymentMethod.CASH_ON_DELIVERY)}
                           value={PaymentMethod.CASH_ON_DELIVERY}
                           onChange={() => setPaymentDetail({
                               ...paymentDetail,
                               paymentMethod: PaymentMethod.CASH_ON_DELIVERY
                           })}
                           checked={paymentMethod === PaymentMethod.CASH_ON_DELIVERY}/>
                    <label className="form-check-label d-flex align-items-center ms-3 cussor-pointer" htmlFor="money">
                        <i className="bi bi-cash-coin fs-2 text-danger"></i>
                        <span className={"ms-3"}>Thanh toán khi nhận hàng</span>
                    </label>
                </div>
                <div className="form-check d-flex align-items-center">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="card"
                           onClick={() => setPaymentMethod(PaymentMethod.BANK_TRANSFER)}
                           onChange={() => setPaymentDetail({
                               ...paymentDetail,
                               paymentMethod: PaymentMethod.BANK_TRANSFER
                           })}
                           value={PaymentMethod.BANK_TRANSFER} checked={paymentMethod === PaymentMethod.BANK_TRANSFER}/>
                    <label className="form-check-label d-flex align-items-center ms-3 cussor-pointer" htmlFor="card">
                        <i className="bi bi-credit-card-2-front fs-2 text-danger"></i>
                        <span className={"ms-3"}>Chuyển khoản</span>
                    </label>
                </div>
            </div>

            <div className={"container bg-white rounded py-3 mt-4"}>
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
                                        <span>{book.bookTitle}</span>
                                        <div className={"d-block d-lg-none"}>
                                            {
                                                book.bookDiscount > 0 ? (
                                                    <div className={"d-flex flex-row"}>
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
                                            <span>Số lượng: {getQuantityBookInCart(book.bookId)}</span>
                                            {
                                                book.bookDiscount > 0 ? (
                                                    <p
                                                        className={"text-warning fw-bold"}>{formatCurrencyVND(DiscountProductMoney(book.bookPrice, book.bookDiscount) * getQuantityBookInCart(book.bookId))}</p>
                                                ) : (
                                                    <p
                                                        className={"text-warning"}>{formatCurrencyVND(book.bookPrice * getQuantityBookInCart(book.bookId))}</p>
                                                )
                                            }
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
                                            <span
                                                className={"text-danger"}>{formatCurrencyVND(book.bookPrice)}</span>
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
                className={"container bg-white rounded my-4 py-4 d-flex flex-column flex-lg-row justify-content-between align-items-center position-sticky bottom-0"}>
                <span className={"fs-2 fw-bold text-danger"}>TỔNG TIỀN: {formatCurrencyVND(getTotalMoney())}</span>
                <button onClick={() => {
                    if (validateForm()) {
                        console.log(paymentDetail)
                    }
                }} type="button" className="btn btn-danger fw-bold py-3 px-5">XÁC NHẬN THANH TOÁN
                </button>
            </div>
        </div>
    );
}