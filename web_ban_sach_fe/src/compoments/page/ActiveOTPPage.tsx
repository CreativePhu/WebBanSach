import React from "react";
import {Link} from "react-router-dom";

const ActiveOTPPage: React.FC = () => {

    const [codeOTP, setCodeOTP] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

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

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (checkValidateForm()) {
            alert("Xác thực thành công!")
        }
    }

    return (
        <div className={"container-fluid d-flex justify-content-center align-items-center bg-light py-5"}>
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
                    <button type="submit" className="btn btn-danger w-100 mt-4" onClick={handleSubmit}>Xác thực</button>
                </form>
            </div>
        </div>
    )
}

export default ActiveOTPPage;