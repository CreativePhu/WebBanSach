import React from "react";
import {Link} from "react-router-dom";

const LoginPage: React.FC = () => {

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [errorUsername, setErrorUsername] = React.useState<string>("");
    const [errorPassword, setErrorPasswrod] = React.useState<string>("");

    const checkValidateForm = (): boolean => {
        let check = true;
        if (!username) {
            setErrorUsername("Tên tài khoản không được để trống");
            check = false;
        } else {
            setErrorUsername("");
        }

        if (!password) {
            setErrorPasswrod("Mật khẩu không được để trống");
            check = false;
        } else {
            setErrorPasswrod("");
        }

        return check;
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (checkValidateForm()) {
            alert("Đăng nhập thành công")
        }
    }

    return (
        <div className={"container-fluid d-flex justify-content-center align-items-center bg-light py-5"}>
            <div className={"bg-white border p-5 rounded-3"} style={{width: "450px"}}>
                <h1 className={"text-center text-danger fw-bold"}>ĐĂNG NHẬP</h1>
                <form className={"mt-4"}>
                    <div className="mb-3">
                        <label htmlFor="taikhoan" className="form-label">Tài khoản</label>
                        <input type="text" className="form-control py-2" id="taikhoan" placeholder={"Tên tài khoản"}
                               value={username} onInput={() => {setErrorUsername("")}} onChange={(e) => {
                            setUsername(e.target.value)}}/>
                        <span className={"text-danger"}>{errorUsername}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matkhau" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control py-2" id="matkhau" placeholder={"Mật khẩu"}
                               value={password} onInput={() => {setErrorPasswrod("")}} onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                        <span className={"text-danger"}>{errorPassword}</span>
                    </div>
                    <p className={"mt-2"}>
                        <Link className={"text-decoration-none"} to={""}>Quên mật khẩu?</Link>
                    </p>
                    <button type="submit" className="btn btn-danger w-100 mt-4" onClick={handleSubmit}>Đăng nhập
                    </button>
                    <p className={"mt-2 d-flex justify-content-center"}>
                        <span>Bạn chưa có tài khoản?</span>
                        <Link className={"text-decoration-none ms-2"} to={"/register"}>Đăng kí</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;