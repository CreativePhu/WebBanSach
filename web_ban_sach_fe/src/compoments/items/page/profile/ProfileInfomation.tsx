import React from "react";
import UserInf from "../../../data_type/Auth/UserInf";
import {useAppSelector} from "../../../redux/Hooks";

interface ProfileInfomationProps {
    openFullName: () => void;
    openPhoneNumber: () => void;
    openEmail: () => void;
}

export const ProfileInfomation : React.FC<ProfileInfomationProps> = ({openEmail, openPhoneNumber, openFullName}) => {

    const user: UserInf | null = useAppSelector(state => state.User.value)

    return (
        <div>
            <div className={"bg-white rounded py-3 px-3 shadow-sm"}>
                <span className={"fw-bold fs-4"}>Thông tin người dùng</span>
                <div className={"d-flex flex-column justify-content-start mt-2"}>
                    <div>
                        <span className={"fw-semibold"}>Họ và tên: </span>
                        <span>{user?.fullName ? user.fullName : "chưa cập nhật !"}</span>
                        <i onClick={() => {openFullName()}} className="bi bi-pencil-square ms-2 text-primary cussor-pointer"></i>
                    </div>
                    <div>
                        <span className={"fw-semibold"}>Số điện thoại: </span>
                        <span>{user?.phone ? user.phone : "chưa cập nhật !"}</span>
                        <i onClick={() => {openPhoneNumber()}} className="bi bi-pencil-square ms-2 text-primary cussor-pointer"></i>
                    </div>
                    <div>
                        <span className={"fw-semibold"}>Email: </span>
                        <span>{user?.email ? user.email : "chưa cập nhật !"}</span>
                        <i onClick={() => {openEmail()}} className="bi bi-pencil-square ms-2 text-primary cussor-pointer"></i>
                    </div>
                </div>
            </div>
            <div className={"bg-white rounded py-3 px-3 mt-3 shadow-sm"}>
                <span className={"fw-bold fs-4"}>Tài khoản</span>
                <div className={"d-flex flex-column justify-content-start mt-2"}>
                    <div>
                        <span className={"fw-semibold"}>Tên tài khoản: </span>
                        <span>{user?.userName}</span>
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