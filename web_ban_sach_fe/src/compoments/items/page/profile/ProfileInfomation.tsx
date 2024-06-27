import React from "react";

export const ProfileInfomation = () => {
    return (
        <div>
            <div className={"bg-white rounded py-3 px-3 shadow-sm"}>
                <span className={"fw-bold fs-4"}>Thông tin người dùng</span>
                <div className={"d-flex flex-column justify-content-start mt-2"}>
                    <div>
                        <span className={"fw-semibold"}>Họ và tên: </span>
                        <span>Nguyễn Văn A</span>
                        <i className="bi bi-pencil-square ms-2 text-primary cussor-pointer"></i>
                    </div>
                    <div>
                        <span className={"fw-semibold"}>Số điện thoại: </span>
                        <span>0348191482</span>
                        <i className="bi bi-pencil-square ms-2 text-primary cussor-pointer"></i>
                    </div>
                    <div>
                        <span className={"fw-semibold"}>Email: </span>
                        <span>phutot232@gmail.com</span>
                        <i className="bi bi-pencil-square ms-2 text-primary cussor-pointer"></i>
                    </div>
                </div>
            </div>
            <div className={"bg-white rounded py-3 px-3 mt-3 shadow-sm"}>
                <span className={"fw-bold fs-4"}>Tài khoản</span>
                <div className={"d-flex flex-column justify-content-start mt-2"}>
                    <div>
                        <span className={"fw-semibold"}>Tên tài khoản: </span>
                        <span>acbdsd2323</span>
                    </div>
                    <div>
                        <span className={"fw-semibold"}>Mật khẩu: </span>
                        <span>**********</span>
                        <i className="bi bi-pencil-square ms-2 text-primary cussor-pointer"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}