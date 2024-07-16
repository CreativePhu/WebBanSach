import React from "react";
import {Link} from "react-router-dom";
import UserInf from "../../../../data_type/Auth/UserInf";
import {useAppSelector} from "../../../../redux/Hooks";
import {GetOrderByUserAPI, GetOrderByUserAPIResponseInf} from "../../../../api/Order/GetOrderByUserAPI";
import formatCurrencyVND from "../../../function/FormatCurrencyVND";
import {formatDateFunc} from "../../../function/FormartDateFunc";
import {ConvertOrderStatus} from "../../../function/ConvertOrderStatus";

interface OrderInformationViewProps {
    openOrderDetail: (orderID: number) => void;
}

export const OrderInformationView: React.FC<OrderInformationViewProps> = ({openOrderDetail}) => {

    const user: UserInf | null = useAppSelector(state => state.User.value)
    const [page, setPage] = React.useState<number>(0)
    const [size, setSize] = React.useState<number>(10)
    const [loading, setLoading] = React.useState<boolean>(false)

    const [orders, setOrders] = React.useState<GetOrderByUserAPIResponseInf[]>([])

    React.useEffect(() => {
        setLoading(true)
        GetOrderByUserAPI(user!.userName, size, page).then((data) => {
            setOrders(data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [page, size])

    return (
        <div className={"py-3 px-3"}>
            <span className={"fw-bold fs-1 text-danger"}>Lịch Sử Đặt Hàng</span>
            <div className={"row rounded bg-white pt-3"}>
                <div className={"col-3 col-sm-2 mb-3"}>
                    <span className={"fw-semibold"}>Mã hóa đơn</span>
                </div>
                <div className={"col-4 col-sm-2 text-sm-center"}>
                    <span className={"fw-semibold"}>Ngày đặt</span>
                </div>
                <div className={"col-4 col-sm-3 text-sm-center"}>
                    <span className={"fw-semibold"}>Tổng tiền</span>
                </div>
                <div className={"col-3 d-none d-sm-block"}>
                    <span className={"fw-semibold"}>Trạng thái</span>
                </div>
            </div>
            {
                loading
                    ?
                    <div className={"text-center text-danger fw-semibold mt-3"}>Loading...</div>
                    :
                    (orders.length === 0)
                        ?
                        <div className={"d-flex flex-column justify-content-center align-items-center mt-4"}>
                            <i className="bi bi-bag-x-fill fs-3 text-danger"></i>
                            <div className={"text-center fw-semibold mt-2"}>Bạn chưa có đơn hàng nào!</div>
                            <Link to={"/"} className={"btn btn-danger mt-4"}>Mua sắm ngay</Link>
                        </div>
                        :
                        orders.map((order, index) => {
                            return (
                                <div key={index} className={"row rounded bg-white"}>
                                    <hr/>
                                    <div className={"col-3 col-sm-2 mb-3"}>
                                        <span className={"fw-semibold"}>#{order.orderID}</span>
                                    </div>
                                    <div className={"col-4 col-sm-2 text-sm-center"}>
                                        <span>{formatDateFunc(order.orderDate)}</span>
                                    </div>
                                    <div className={"col-4 col-sm-3 text-sm-center"}>
                                        <span
                                            className={"text-danger fw-semibold"}>{formatCurrencyVND(order.total)}</span>
                                    </div>
                                    <div className={"col-3 d-none d-sm-block"}>
                                        <span>{ConvertOrderStatus(order?.orderStatus)}</span>
                                    </div>
                                    <div className={"col-1 col-sm-2 px-0 px-sm-1"}>
                                        <span className={"text-primary cussor-pointer"} onClick={() => openOrderDetail(order.orderID)}>
                                            <i className="bi bi-three-dots"></i>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
            }
        </div>
    )
}