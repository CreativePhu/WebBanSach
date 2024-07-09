import React from "react";
import {FullScreenOverlay} from "../../../../FullScreenOverlay";
import {GetOrderDetailByOrderId, OrderDetailInfResponse} from "../../../../../api/Order/GetOrderDetailByOrderId";
import formatCurrencyVND from "../../../../function/FormatCurrencyVND";
import {GetOrderByOrderIdAPI, OrderInfResponse} from "../../../../../api/Order/GetOrderByOrderIdAPI";
import {formartDateFunc} from "../../../../function/FormartDateFunc";
import {GetAddressToStringByShippingAddressId} from "../../../../function/GetAddressByOrderIdConvertToString";

interface OrderDetailInformationFormViewProps {
    isVisible: boolean;
    onClose: () => void;
    orderID: number;
}

export const OrderDetailInformationFormView: React.FC<OrderDetailInformationFormViewProps> = ({
                                                                                                  isVisible,
                                                                                                  onClose,
                                                                                                  orderID
                                                                                              }) => {

    const modalRef = React.useRef<HTMLDivElement>(null);

    const [order, setOrder] = React.useState<OrderInfResponse|null>(null);
    const [orderDetails, setOrderDetails] = React.useState<OrderDetailInfResponse[]>([]);
    const [address, setAddress] = React.useState<string>("");

    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (orderID !== 0) {
            setLoading(true)
            Promise.all([GetOrderByOrderIdAPI(orderID), GetOrderDetailByOrderId(orderID), GetAddressToStringByShippingAddressId(orderID)]).then(
                ([order, orderDetails, address]) => {
                    setOrder(order);
                    setOrderDetails(orderDetails);
                    setAddress(address);
                }
            ).catch((err) => {
                    console.log(err)
                }
            ).finally(() => {
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

    return (
        <FullScreenOverlay isVisible={isVisible}>
            <div ref={modalRef} className={"w-50 bg-white rounded h-75 p-5 position-relative"}>
                <h3>Thông Tin Đơn Hàng: #1</h3>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <span className={"fw-semibold"}>Tên khách hàng:</span>
                        <span className={"ms-2"}>{order?.customerName}</span>
                    </div>
                    <div className={"col-6"}>
                        <span className={"fw-semibold"}>Ngày đặt hàng:</span>
                        <span className={"ms-2"}>{formartDateFunc(order?.orderDate)}</span>
                    </div>
                </div>
                <div className={"row mt-2"}>
                    <div className={"col-6"}>
                        <span className={"fw-semibold"}>Số điện thoại:</span>
                        <span className={"ms-2"}>{order?.customerPhone}</span>
                    </div>
                    <div className={"col-6"}>
                        <span className={"fw-semibold"}>Trạng thái:</span>
                        <span className={"ms-2"}>{order?.orderStatus}</span>
                    </div>
                </div>
                <div className={"row mt-2"}>
                    <div className={"col-12"}>
                        <span className={"fw-semibold"}>Địa chỉ nhận hàng:</span>
                        <span className={"ms-2"}>{address}</span>
                    </div>
                </div>
                <div className={"row mt-2"}>
                    <div className={"col-12"}>
                        <span className={"fw-semibold"}>Phương thức thanh toán:</span>
                        <span className={"ms-2"}>{order?.paymentMethod}</span>
                    </div>
                </div>
                <div className={"row mt-5"}>
                    <div className={"col-12"}>
                        <h4>Danh sách sản phẩm:</h4>
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
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>Áo thun nam</td>
                                            <td>{orderDetail.quantity}</td>
                                            <td>{formatCurrencyVND(orderDetail.unitPrice)}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <span className={"fw-semibold"}>Tổng tiền:</span>
                        <span className={"ms-2"}>300.000đ</span>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <span className={"fw-semibold"}>Ghi chú:</span>
                        <span className={"ms-2"}>Không có</span>
                    </div>
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