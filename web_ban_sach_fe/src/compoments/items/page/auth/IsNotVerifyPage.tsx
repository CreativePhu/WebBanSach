import React from "react";
import {Link, useNavigate} from "react-router-dom";
import UserInf from "../../../data_type/Auth/UserInf";
import {useAppSelector} from "../../../redux/Hooks";
import {GenerateOTP} from "../../../api/Auth/GenerateOTP";

export const IsNotVerifyPage: React.FC = () => {

    const navigate = useNavigate()
    const user: UserInf | null = useAppSelector(state => state.User.value)
    const token = localStorage.getItem("token")

    const [loading, setLoading] = React.useState<boolean>(false);

    const handleVerify = () => {
        setLoading(true)
        GenerateOTP(token || "").then(()  => {
            navigate(`/active-otp?email=${user!.email}`)
            setLoading(false)

        }).catch(() => {
            alert("Có lỗi xảy ra, vui lòng thử lại sau")
            setLoading(false)
        })
    }

    return (
        <div className={"container-fluid d-flex flex-column justify-content-center align-items-center bg-light py-5"}
             style={{minHeight: "600px"}}>
            <h1 className={"text-danger fs-1"}>XÁC THỰC EMAIL</h1>
            <p className={"text-danger fs-4"}>Vui lòng xác thực email: {user?.email}</p>
            <p className={"text-danger fs-4"}>Bạn không thể lấy lại mật khẩu bằng email này nếu chưa xác thực</p>
            <Link to={"/"} className={"text-decoration-underline text-danger fs-4"}>Quay lại trang chủ</Link>
            {
                loading
                    ?
                    <div className="spinner-border text-danger mt-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <button
                        onClick={() => {
                            handleVerify()
                        }}
                        style={{width: "250px"}}
                        type="button"
                        className="btn btn-danger mt-3">Xác thực ngay
                    </button>
            }
        </div>
    )
}