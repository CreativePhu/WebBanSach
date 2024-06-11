import React from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {CheckVerifyOTP} from "../../api/CheckVerifyOTP";

const ActiveOTPPage: React.FC = () => {

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || "";

    const [codeOTP, setCodeOTP] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const checkValidateForm = (): boolean => {
        let check = true;
        if (!codeOTP) {
            setError("vui lòng nhập mã OTP");
            check = false;
        } else {
            setError("");
        }

        return check;
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (checkValidateForm()) {
                await CheckVerifyOTP({email, verificationCode: codeOTP});
                setLoading(false)
                alert("Xác thực thành công");
                navigate("/")
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError("Mã OTP không chính xác")
        }
    }

    return (
        <div className={"container-fluid d-flex flex-column justify-content-center align-items-center bg-light py-5"}>
            <span className={"text-danger mb-2"}>Đã gửi mã xác thực tới Email: <span
                className={"text-decoration-underline text-secondary"}>{email}</span></span>
            <div className={"bg-white border p-5 rounded-3"} style={{width: "450px"}}>
                <h1 className={"text-center text-danger fw-bold"}>XÁC THỰC TÀI KHOẢN</h1>
                <form className={"mt-4"}>
                    <div className="mb-3">
                        <label htmlFor="taikhoan" className="form-label">Mã OTP:</label>
                        <input type="text" className="form-control py-2" id="taikhoan" placeholder={"Mã xác thực..."}
                               value={codeOTP} onInput={() => {
                            setError("")
                        }} onChange={(e) => {
                            setCodeOTP(e.target.value)
                        }}/>
                        <span className={"text-danger"}>{error}</span>
                    </div>
                    <p className={"mt-2"}>
                        <Link className={"text-decoration-none"} to={""}>Gửi lại mã</Link>
                    </p>
                    {
                        !loading
                            ?
                            <button type="submit" className="btn btn-danger w-100 mt-4" onClick={handleSubmit}>Xác
                                thực</button>
                            :
                            <div className={"mt-4 w-100 d-flex justify-content-center"}>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default ActiveOTPPage;