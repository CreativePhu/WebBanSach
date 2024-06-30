import React from "react";
import {useAppSelector} from "../../../../redux/Hooks";
import UserInf from "../../../../data_type/Auth/UserInf";
import {UserLogin} from "../../../../api/Auth";
import {VerifyOTPForm} from "./VerifyOTPForm";
import {GenerateOTP} from "../../../../api/Auth/GenerateOTP";

interface VerifyAccountFormProps {
    onClose: () => void;
    modalRef: React.RefObject<HTMLDivElement>;
    email: string;
}

export const VerifyAccountForm: React.FC<VerifyAccountFormProps> = ({onClose, modalRef, email}) => {

    const user: UserInf | null = useAppSelector(state => state.User.value)
    const token = localStorage.getItem("token")
    const [password, setPassword] = React.useState<string>("");
    const [errorPassword, setErrorPassword] = React.useState<string>("");
    const [moveVerifyOTPScreen, setMoveVerifyOTPScreen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const validatePassword = () => {
        let check = true
        if (password === "") {
            check = false
            setErrorPassword("Mật khẩu không được để trống");
        }
        return check
    }

    const moveVerifyOTP = async () => {
        setLoading(true);
        if (!validatePassword()) {
            setLoading(false);
            return;
        }

        try {
            await UserLogin({userName: user!.userName, passWord: password});
        } catch (e) {
            setLoading(false);
            setErrorPassword("Tên tài khoản hoặc mật khẩu không chính xác");
            return;
        }

        try {
            if (token) {
                await GenerateOTP(token, {userName: user!.userName, email})
            }else{
                throw new Error("Không tìm thấy token")
            }
        } catch (e) {
            setLoading(false);
            setErrorPassword("Có lỗi xảy ra, vui lòng thử lại sau");
            return;
        }

        setMoveVerifyOTPScreen(true);
        setLoading(false);
    }

    if (moveVerifyOTPScreen) {
        return (
            <VerifyOTPForm onClose={onClose} modalRef={modalRef} email={email}/>
        )
    }

    return (
        <div ref={modalRef} className={"rounded bg-white px-5 py-5 position-relative"}
             style={{width: "450px", minHeight: "250px"}}>
            <span className={"text-danger fw-semibold fs-3"}>Lấy mã xác thực</span>
            <p className={"text-danger"}>Vui lòng nhập mật khẩu để lấy mã xác thực</p>
            <label htmlFor={"email"} className={"fw-semibold"}>Tên tài khoản</label>
            <input id={"username"} type="text" className={"form-control mt-1 py-2 rounded-3"}
                   disabled={true}
                   value={user?.userName}
                   placeholder={"Tên tài khoản"}/>
            <label htmlFor={"email"} className={"fw-semibold mt-2"}>Mật khẩu</label>
            <input id={"password"} type="password" className={"form-control mt-1 py-2 rounded-3"}
                   value={password} onChange={(e) => {
                setPassword(e.target.value)
                setErrorPassword("")
            }}
                   placeholder={"Mật khẩu"}/>
            <p className={"text-danger"}>{errorPassword}</p>
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
                        className={"btn btn-danger w-100 mt-3 rounded-3"}>Lấy mã
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