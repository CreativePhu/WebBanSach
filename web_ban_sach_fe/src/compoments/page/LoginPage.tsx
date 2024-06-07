import React from "react";
import {Link} from "react-router-dom";

const LoginPage: React.FC = () => {
    return (
        <div className={"container-fluid d-flex justify-content-center align-items-center bg-light py-5"}>
            <div className={"bg-white border p-5 rounded-3"} style={{width: "450px"}}>
                <h1 className={"text-center text-danger"}>Đăng nhập</h1>
                <form className={"mt-4"}>
                    <div className="mb-3">
                        <label htmlFor="taikhoan" className="form-label">Tài khoản</label>
                        <input type="text" className="form-control py-2" id="taikhoan" placeholder={"Tên tài khoản"}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matkhau" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control py-2" id="matkhau" placeholder={"Mật khẩu"}/>
                    </div>
                    <button type="submit" className="btn btn-danger w-100 mt-4">Đăng nhập</button>
                    <p className={"mt-2"}>
                        <Link className={"text-decoration-none"} to={""}>Quên mật khẩu?</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;