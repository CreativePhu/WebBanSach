import React from "react";
import {Link} from "react-router-dom";

export const OrderInformation = () => {
    return (
        <div className={"py-3 px-3"}>
            <span className={"fw-bold fs-4"}>Lịch sử đặt hàng</span>
            <div className={"row rounded bg-white pt-3"}>
                <div className={"col-2 mb-3"}>
                    <span className={"fw-semibold"}>Mã đơn hàng</span>
                </div>
                <div className={"col-2"}>
                    <span className={"fw-semibold"}>Ngày đặt</span>
                </div>
                <div className={"col-2"}>
                    <span className={"fw-semibold"}>Tổng tiền</span>
                </div>
                <div className={"col-2"}>
                    <span className={"fw-semibold"}>Trạng thái</span>
                </div>
            </div>
            <div className={"row rounded bg-white"}>
                <hr/>
                <div className={"col-2 mb-3"}>
                    <span className={"fw-semibold"}>#32323</span>
                </div>
                <div className={"col-2"}>
                    <span>22/2/2023</span>
                </div>
                <div className={"col-2"}>
                    <span>123.000.003 đ</span>
                </div>
                <div className={"col-2"}>
                    <span>COMPLETE</span>
                </div>
                <div className={"col-2"}>
                    <Link to={"/"} className={""}>Xem chi tiết</Link>
                </div>
            </div>
            <div className={"row rounded bg-white"}>
                <hr/>
                <div className={"col-2 mb-3"}>
                    <span className={"fw-semibold"}>#32323</span>
                </div>
                <div className={"col-2"}>
                    <span>22/2/2023</span>
                </div>
                <div className={"col-2"}>
                    <span>123.000.003 đ</span>
                </div>
                <div className={"col-2"}>
                    <span>COMPLETE</span>
                </div>
                <div className={"col-2"}>
                    <Link to={"/"} className={""}>Xem chi tiết</Link>
                </div>
            </div>
        </div>
    )
}