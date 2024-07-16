import React from "react";
import {FullScreenOverlay} from "../../../../FullScreenOverlay";
import {GetOrderDetailByOrderId, OrderDetailInfResponse} from "../../../../../api/Order/GetOrderDetailByOrderId";
import formatCurrencyVND from "../../../../function/FormatCurrencyVND";
import {GetOrderByOrderIdAPI, OrderInfResponse} from "../../../../../api/Order/GetOrderByOrderIdAPI";
import {formatDateFunc} from "../../../../function/FormartDateFunc";
import {GetAddressToStringByShippingAddressId} from "../../../../function/GetAddressByOrderIdConvertToString";
import {
    BookDetailByOrderDetailInfResponse,
    GetBookByOrderDetailIdAPI
} from "../../../../../api/Order/GetBookByOrderDetailIdAPI";
import {Link} from "react-router-dom";
import {ConvertPaymentMethod} from "../../../../function/ConvertPaymentMethod";
import {ConvertOrderStatus} from "../../../../function/ConvertOrderStatus";
import {ConvertPaymentStatus} from "../../../../function/ConvertPaymentStatus";

interface OrderDetailInformationFormViewProps {
    isVisible: boolean;
    onClose: () => void;
    orderID: number;
}

export const OrderDetailInformationFormView: React.FC<OrderDetailInformationFormViewProps> = ({
                                                                                                  isVisible,
                                                                                                  onClose,
                                                                                                  orderID,
                                                                                              }) => {

    const modalRef = React.useRef<HTMLDivElement>(null);

    const [order, setOrder] = React.useState<OrderInfResponse | null>(null);
    const [orderDetails, setOrderDetails] = React.useState<OrderDetailInfResponse[]>([]);
    const [books, setBooks] = React.useState<BookDetailByOrderDetailInfResponse[]>([]);
    const [address, setAddress] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (orderID !== 0) {
            setLoading(true)
            Promise.all([GetOrderByOrderIdAPI(orderID), GetOrderDetailByOrderId(orderID), GetAddressToStringByShippingAddressId(orderID)]).then(
                ([order, orderDetails, address]) => {
                    setOrder(order);
                    setOrderDetails(orderDetails);
                    setAddress(address);
                    return orderDetails;
                }
            ).then((orderDetails) => {
                return Promise.all(orderDetails.map((orderDetail) => {
                    return GetBookByOrderDetailIdAPI(orderDetail.oderDetailID)
                }))
            }).then((books) => {
                setBooks(books)
            }).catch(() => {
                setError("Có lỗi xảy ra, vui lòng thử lại sau!")
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [isVisible, orderID])

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })

    const sumTotal = () => {
        let total = 0;
        orderDetails.forEach((orderDetail) => {
            total += orderDetail.unitPrice;
        })
        return total;
    }

    if (orderID === 0) {
        return <></>
    }

    if (loading) {
        return (
            <FullScreenOverlay isVisible={isVisible}>
                <div className={"w-50 bg-white rounded h-75 p-5 position-relative"}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </FullScreenOverlay>
        )
    }

    if (error) {
        return (
            <FullScreenOverlay isVisible={isVisible}>
                <div ref={modalRef} className={"w-50 bg-white rounded p-5 position-relative"}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <span className={"text-danger"}>{error}</span>
                    </div>
                    <div onClick={() => {
                        onClose()
                    }} className={"position-absolute cussor-pointer"} style={{top: "10px", right: "20px"}}>
                        <i className="bi bi-x fs-2"></i>
                    </div>
                </div>
            </FullScreenOverlay>
        )
    }

    return (
        <FullScreenOverlay isVisible={isVisible}>
            <div ref={modalRef} className={"w-auto bg-white rounded p-3 p-sm-5 position-relative overflow-y-scroll"} style={{maxHeight: "100vh"}}>
                <h3 className={"fw-bold text-danger fs-2"}>Thông Tin Đơn Hàng #{order?.orderID}</h3>
                <div className={"row d-flex flex-column flex-xl-row"}>
                    <div className={"col-12 col-xl-6"}>
                        <span className={"fw-semibold"}>Tên khách hàng:</span>
                        <span className={"ms-2"}>{order?.customerName}</span>
                    </div>
                    <div className={"col-12 col-xl-6"}>
                        <span className={"fw-semibold"}>Ngày đặt hàng:</span>
                        <span className={"ms-2"}>{formatDateFunc(order?.orderDate)}</span>
                    </div>
                </div>
                <div className={"row d-flex flex-column flex-xl-row"}>
                    <div className={"col-12 col-xl-6"}>
                        <span className={"fw-semibold"}>Số điện thoại:</span>
                        <span className={"ms-2"}>{order?.customerPhone}</span>
                    </div>
                    <div className={"col-12 col-xl-6"}>
                        <span className={"fw-semibold"}>Trạng thái:</span>
                        <span className={"ms-2"}>{ConvertOrderStatus(order?.orderStatus)}</span>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <span className={"fw-semibold"}>Địa chỉ nhận hàng:</span>
                        <span className={"ms-2"}>{address}</span>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <span className={"fw-semibold"}>Phương thức thanh toán:</span>
                        <span className={"ms-2"}>{ConvertPaymentMethod(order?.paymentMethod)}</span>
                    </div>
                </div>
                <div className={"row mt-3"}>
                    <div className={"col-12"}>
                        <h4 className={"text-danger"}>Danh sách sản phẩm</h4>
                        <table className={"table"}>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orderDetails.map((orderDetail, index) => {
                                    const myBook = books[index]
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link className={"text-decoration-none"} to={`/book-detail?bookId=${myBook?.bookID}`}>
                                                    <span>{myBook?.bookTitle}</span>
                                                </Link>
                                            </td>
                                            <td>{orderDetail.quantity}</td>
                                            <td>
                                                <span className={"text-danger fw-semibold"}>{formatCurrencyVND(myBook.bookPrice)}</span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={"row d-flex flex-column flex-md-row"}>
                    <div className={"col-12 col-md-6"}>
                        <span className={"fw-semibold"}>Tổng tiền:</span>
                        <span className={"ms-2 text-danger fw-semibold fs-4"}>{formatCurrencyVND(sumTotal())}</span>
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <span className={"fw-semibold"}>Thanh toán:</span>
                        <span className={"ms-2 text-danger fw-semibold fs-4"}>{ConvertPaymentStatus(order?.paymentStatus)}</span>
                    </div>
                </div>
                <div onClick={() => {
                    onClose()
                }} className={"position-absolute cussor-pointer"} style={{top: "10px", right: "20px"}}>
                    <i className="bi bi-x fs-2 text-danger"></i>
                </div>
            </div>
        </FullScreenOverlay>
    )
}