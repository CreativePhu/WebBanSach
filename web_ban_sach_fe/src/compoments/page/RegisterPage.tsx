import React from "react";
import {Link} from "react-router-dom";

const RegisterPage: React.FC = () => {
    return (
        <div className={"container-fluid d-flex justify-content-center align-items-center bg-light py-5"}>
            <div className={"bg-white border p-5 rounded-3"} style={{width: "450px"}}>
                <h1 className={"text-center text-danger fw-bold"}>ĐĂNG KÍ</h1>
                <form className={"mt-4"}>
                    <div className="mb-3">
                        <label htmlFor="taikhoan" className="form-label">Tên tài khoản</label>
                        <input type="text" className="form-control py-2" id="taikhoan"
                               placeholder={"Tên đăng nhập..."}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control py-2" id="email" placeholder={"Email..."}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matkhau" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control py-2" id="matkhau" placeholder={"Mật khẩu..."}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nhaplaimatkhau" className="form-label">Nhập lại mật khẩu</label>
                        <input type="password" className="form-control py-2" id="nhaplaimatkhau"
                               placeholder={"Nhập lại mật khẩu..."}/>
                    </div>
                    <button type="submit" className="btn btn-danger w-100 mt-4">Đăng kí</button>
                    <p className={"mt-2 d-flex justify-content-center"}>
                        <span>Bạn đã có tài khoản?</span>
                        <Link className={"text-decoration-none ms-2"} to={"/login"}>Đăng nhập</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;