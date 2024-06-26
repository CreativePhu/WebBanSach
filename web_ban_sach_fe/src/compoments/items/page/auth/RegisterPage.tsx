import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {REGEX_EMAIL, REGEX_PASSWORD, REGEX_USERNAME} from "../../Regex";
import UserRegisterInf from "../../../data_type/Auth/UserRegisterInf";
import {UserRegister} from "../../../api/Auth";
import {checkUserNameExists} from "../../../api/Auth";
import {checkEmailExists} from "../../../api/Auth";

const RegisterPage: React.FC = () => {

    const navigate = useNavigate()

    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [rePassword, setRePassword] = React.useState<string>("");

    const [errorUsername, setErrorUsername] = React.useState<string>("");
    const [errorEmail, setErrorEmail] = React.useState<string>("");
    const [errorPassword, setErrorPassword] = React.useState<string>("");
    const [errorRePassword, setErrorRePassword] = React.useState<string>("");

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");

    const checkValidateForm = async (): Promise<boolean> => {
        setLoading(true)
        let check = true;
        if (!username) {
            setErrorUsername("Tên tài khoản không được để trống");
            check = false;
        } else {
            if (!REGEX_USERNAME.test(username)) {
                setErrorUsername("Tên tài khoản phải có ít nhất ba ký tự và không chứa ký tự đặc biệt");
                check = false;
            }else if(await checkUserNameExists(username)){
                setErrorUsername("Tên tài khoản đã tồn tại");
                check = false;
            } else {
                setErrorUsername("");
            }
        }

        if (!email) {
            setErrorEmail("Email không được để trống");
            check = false;
        } else {
            if (!REGEX_EMAIL.test(email)) {
                setErrorEmail("Email không hợp lệ");
                check = false;
            }else if(await checkEmailExists(email)){
                setErrorEmail("Email đã tồn tại");
                check = false;
            } else {
                setErrorEmail("");
            }
        }

        if (!password) {
            setErrorPassword("Mật khẩu không được để trống");
            check = false;
        } else {
            if (!REGEX_PASSWORD.test(password)) {
                setErrorPassword("Mật khẩu tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt");
                check = false;
            } else {
                setErrorPassword("");
            }
        }

        if (!rePassword) {
            setErrorRePassword("Nhập lại mật khẩu không được để trống");
            check = false;
        } else {
            if (rePassword !== password) {
                setErrorRePassword("Nhập lại mật khẩu không khớp");
                check = false;
            } else {
                setErrorRePassword("");
            }
        }

        setLoading(false)

        return check;
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        try {
            e.preventDefault();
            setError("")
            if (await checkValidateForm()) {
                setLoading(true)
                const user: UserRegisterInf = {username, email, password}
                await UserRegister(user)
                navigate(`/active-otp?email=${email}`)
                setLoading(false)
            }
        }catch (e) {
            setError("Đăng kí thất bại")
            setLoading(false)
        }
    }

    return (
        <div className={"container-fluid d-flex flex-column justify-content-center align-items-center bg-light py-5"}>
            {
                error
                    ?
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                    :
                    ""
            }
            <div className={"bg-white border p-5 rounded-3"} style={{width: "450px"}}>
                <h1 className={"text-center text-danger fw-bold"}>ĐĂNG KÍ</h1>
                <form className={"mt-4"}>
                    <div className="mb-3">
                        <label htmlFor="taikhoan" className="form-label">Tên tài khoản</label>
                        <input type="text" className="form-control py-2" id="taikhoan"
                               placeholder={"Tên đăng nhập..."} value={username} onInput={() => {
                            setErrorUsername("")
                        }} onChange={(e) => {
                            setUsername(e.target.value)
                        }}/>
                        <span className={"text-danger"}>{errorUsername}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control py-2" id="email" placeholder={"Email..."}
                               value={email} onInput={() => {
                            setErrorEmail("")
                        }} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                        <span className={"text-danger"}>{errorEmail}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matkhau" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control py-2" id="matkhau" placeholder={"Mật khẩu..."}
                               value={password} onInput={() => {
                            setErrorPassword("")
                        }} onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                        <span className={"text-danger"}>{errorPassword}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nhaplaimatkhau" className="form-label">Nhập lại mật khẩu</label>
                        <input type="password" className="form-control py-2" id="nhaplaimatkhau"
                               placeholder={"Nhập lại mật khẩu..."} value={rePassword} onInput={() => {
                            setErrorRePassword("")
                        }} onChange={(e) => {
                            setRePassword(e.target.value)
                        }}/>
                        <span className={"text-danger"}>{errorRePassword}</span>
                    </div>
                    {
                        !loading
                            ?
                            <button type="submit" className="btn btn-danger w-100 mt-4" onClick={handleSubmit}>Đăng
                                kí</button>
                            :
                            <div className={"mt-4 w-100 d-flex justify-content-center"}>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                    }
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