import React from "react";
import {VerifyOTPAPI} from "../../../../../api/Auth";
import {useAppSelector} from "../../../../../redux/Hooks";
import UserInf from "../../../../../data_type/Auth/UserInf";
import {UpdateUserAPI} from "../../../../../api/profile/UpdateUserAPI";

interface VerifyOTPFormProps {
    onClose: () => void;
    modalRef: React.RefObject<HTMLDivElement>;
    email: string;
}

export const VerifyOTPForm: React.FC<VerifyOTPFormProps> = ({onClose, modalRef, email}) => {

    const token = localStorage.getItem("token")
    const user: UserInf | null = useAppSelector(state => state.User.value)
    const [OPT, setOTP] = React.useState<string>("");
    const [errorOTP, setErrorOTP] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const validatePassword = () => {
        let check = true
        if (OPT === "") {
            check = false
            setErrorOTP("Vui lòng nhập mã xác thực");
        }
        return check
    }

    const moveVerifyOTP = async () => {
        if (!validatePassword() || !token) {
            return;
        }
        setLoading(true);
        try {
            await VerifyOTPAPI({email: user!.email, verificationCode: OPT});
            try {
                await UpdateUserAPI(token, {email});
                onClose();
            } catch (e) {
                console.error("Update profile error:", e);
                setErrorOTP("Cập nhật hồ sơ không thành công");
            }
        } catch (e) {
            console.error("OTP verification error:", e);
            setErrorOTP("Mã xác thực không chính xác");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={modalRef} className={"rounded bg-white px-5 py-5 position-relative"}
             style={{width: "450px", minHeight: "250px"}}>
            <span className={"text-danger fw-semibold fs-3"}>Xác thực OTP</span>
            <p className={"mb-0"}>Mã xác thực đã được gửi đến email:</p>
            <p className={"fw-semibold text-decoration-underline text-danger"}>{email}</p>
            <label htmlFor={"email"} className={"fw-semibold mt-2"}>Mã OTP</label>
            <input id={"password"} type="text" className={"form-control mt-1 py-2 rounded-3"}
                   value={OPT} onChange={(e) => {
                setOTP(e.target.value)
                setErrorOTP("")
            }}
                   placeholder={"Mã OTP..."}/>
            <p className={"text-danger"}>{errorOTP}</p>
            {
                loading ?
                    <div className={"d-flex justify-content-center"}>
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <button
                        onClick={() => {
                            moveVerifyOTP()
                        }}
                        className={"btn btn-danger w-100 mt-3 rounded-3"}>Xác thực
                    </button>
            }
            <div onClick={() => {
                onClose()
            }} className={"position-absolute cussor-pointer"} style={{top: "10px", right: "20px"}}>
            <i className="bi bi-x fs-2"></i>
            </div>
        </div>
    )
}