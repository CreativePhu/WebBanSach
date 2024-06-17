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

enum PaymentMethod {
    CASH_ON_DELIVERY = 'money',
    BANK_TRANSFER = 'card'
}

export const PaymentPage: React.FC = () => {

    const user: UserInf | null = useAppSelector(state => state.User.value)
    const listIdBookPayment: number[] = sessionStorage.getItem('listBookPayment') ? JSON.parse(sessionStorage.getItem('listBookPayment') as string) : []
    const listBookInCart: BookCartInf = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : []
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

    const ressetStatusDistrict = () => {
        if (paymentDetail.province.provinceID === 0) {
            setPaymentDetail({
                ...paymentDetail,
                district: {districtID: 0, districtName: ''},
                ward: {wardID: 0, wardName: ''}
            })
        }
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
            setPaymentDetail({
                ...paymentDetail,
                fullName: user?.fullName ? user.fullName : '',
                email: user?.email ? user.email : '',
                phone: user?.phone ? user.phone : '',
            })
        }
    }, [user])


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetProvince();
                setProvinces(data)
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, []);


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (paymentDetail.province.provinceID !== 0) {
                    const data = await GetDistrict(paymentDetail.province.provinceID);
                    setDistricts(data)
                    return
                }
                ressetStatusDistrict()
            } catch (e) {
                console.log(e)
            }
        };

        fetchData();

    }, [paymentDetail.province, provinces]);


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (paymentDetail.district.districtID !== 0) {
                    const data = await GetWard(paymentDetail.district.districtID);
                    setWards(data)
                    return
                }
                setPaymentDetail({...paymentDetail, ward: {wardID: 0, wardName: ''}})
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();

    }, [paymentDetail.district, districts]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const listBookPaymentDetail = await Promise.all(listIdBookPayment.map(async (bookID) => {
                    const book = await GetBookDetailById(bookID);
                    return book;
                }));
                setListBookPayment(listBookPaymentDetail);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={"container-fluid bg-light py-4"}>
            <div className={"container bg-white rounded py-3"}>
                <span className={"fw-semibold fs-5"}>ĐỊA CHỈ GIAO HÀNG</span>
                <hr/>
                <form>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Họ và tên người nhận</label>
                        <input value={paymentDetail.fullName} onChange={(e) => {
                            setPaymentDetail({...paymentDetail, fullName: e.target.value})
                        }} type="text" className="form-control" id="fullname"
                               placeholder="Nhập họ và tên người nhận"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input value={paymentDetail.email} onChange={(e) => {
                            setPaymentDetail({...paymentDetail, email: e.target.value})
                        }} type="email" className="form-control" id="email"
                               placeholder={"Nhập email"}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Số điện thoại</label>
                        <input value={paymentDetail.phone} onChange={(e) => {
                            setPaymentDetail({...paymentDetail, phone: e.target.value})
                        }} type="tel" className="form-control" id="phone"
                               placeholder={"Ví dụ: 0348323xxx (10 chữ số)"}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="province" className="form-label">Tỉnh/Thành Phố</label>
                        <select className="form-select" id="province"
                                value={paymentDetail.province.provinceID !== 0 ? paymentDetail.province.provinceID : 0}
                                onChange={(e) => setPaymentDetail({
                                    ...paymentDetail,
                                    province: getProvincesByProvinceID(Number(e.target.value))
                                })}>
                            <option value={0}>Chọn Tỉnh/Thành phố</option>
                            {provinces.map((province) => (
                                <option key={province.provinceID}
                                        value={province.provinceID}>{province.provinceName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="district" className="form-label">Quận/Huyện</label>
                        <select className="form-select" id="district"
                                disabled={paymentDetail.province.provinceID === 0}
                                value={paymentDetail.district.districtID !== 0 ? paymentDetail.district.districtID : 0}
                                onChange={(e) => setPaymentDetail({
                                    ...paymentDetail,
                                    district: getDistrictByDistrictID(Number(e.target.value))
                                })}>
                            <option value={0}>Chọn Quận/Huyện</option>
                            {districts.map((district) => (
                                <option key={district.districtID}
                                        value={district.districtID}>{district.districtName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ward" className="form-label">Phường/Xã</label>
                        <select className="form-select" id="ward"
                                disabled={paymentDetail.district.districtID === 0}
                                value={paymentDetail.ward.wardID !== 0 ? paymentDetail.ward.wardID : 0}
                                onChange={(e) => setPaymentDetail({
                                    ...paymentDetail,
                                    ward: getWardByWardID(Number(e.target.value))
                                })}>
                            <option value={0}>Chọn Phường/Xã</option>
                            {wards.map((ward) => (
                                <option key={ward.wardID} value={ward.wardID}>{ward.wardName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Địa chỉ nhận hàng</label>
                        <input value={paymentDetail.address} onChange={(e) => {
                            setPaymentDetail({...paymentDetail, address: e.target.value})
                        }} type="text" className="form-control" id="address"
                               placeholder={"Nhập địa chỉ nhận hàng"}/>
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
                           checked={paymentMethod === PaymentMethod.CASH_ON_DELIVERY}/>
                    <label className="form-check-label d-flex align-items-center ms-3 cussor-pointer" htmlFor="money">
                        <i className="bi bi-cash-coin fs-2 text-danger"></i>
                        <span className={"ms-3"}>Thanh toán khi nhận hàng</span>
                    </label>
                </div>
                <div className="form-check d-flex align-items-center">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="card"
                           onClick={() => setPaymentMethod(PaymentMethod.BANK_TRANSFER)}
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
                    <div className={"col-2 text-center"}>
                        <span className={"fw-semibold fs-6"}>Giá sản phẩm</span>
                    </div>
                    <div className={"col-2 text-center"}>
                        <span className={"fw-semibold fs-6"}>Số lượng</span>
                    </div>
                    <div className={"col-2 text-center"}>
                        <span className={"fw-semibold fs-6"}>Thành tiền</span>
                    </div>
                </div>
                <hr/>
                {
                    listBookPayment.map(book => {
                        return (
                            <div key={book.bookId} className={"row"}>
                                <div className={"col-6"}>
                                    <div className={"d-flex align-items-start"}>
                                        <img src={GetImagePrimaryFromArrayImage(book.bookImage)} alt={book.bookTitle}
                                             className={"img-fluid"}
                                             style={{width: "150px", height: "auto"}}/>
                                        <span className={"ms-3"}>{book.bookTitle}</span>
                                    </div>
                                </div>
                                <div className={"col-2 d-flex flex-column align-items-center"}>
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
                                <div className={"col-2 text-center"}>
                                    <span>2</span>
                                </div>
                                <div className={"col-2 text-center"}>
                                    {
                                        book.bookDiscount > 0 ? (
                                            <span
                                                className={"text-warning fw-bold"}>{formatCurrencyVND(DiscountProductMoney(book.bookPrice, book.bookDiscount) * 2)}</span>
                                        ) : (
                                            <span
                                                className={"text-warning"}>{formatCurrencyVND(book.bookPrice * 2)}</span>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}