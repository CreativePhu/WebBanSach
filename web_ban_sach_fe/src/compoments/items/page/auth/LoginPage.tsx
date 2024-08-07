import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserLoginAPI} from "../../../api/Auth";
import {verifyTokenAPI} from "../../../api/Auth";
import {updateUser} from "../../../redux/slice/UserSlice";
import {useAppDispatch} from "../../../redux/Hooks";
import UserInf from "../../../data_type/Auth/UserInf";

const LoginPage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const [errorUsername, setErrorUsername] = React.useState<string>("");
    const [errorPassword, setErrorPasswrod] = React.useState<string>("");

    const [loading, setLoading] = React.useState<boolean>(false);

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
            setLoading(true)
            UserLoginAPI({userName: username, passWord: password}).then((response) => {
                const jwt: string = response.token
                localStorage.setItem("token", jwt)
                return jwt
            }).then((jwt: string) => {
                return verifyTokenAPI(jwt)
            }).then((user: UserInf) => {
                dispatch(updateUser(user));
                if (user.verified) {
                    navigate("/");
                } else {
                    navigate("/notVerifyEmail");
                }
            }).catch((error) => {
                if ((error.message.includes("Failed to fetch") || error.message.includes("Network Error"))) {
                    setErrorUsername("Lỗi mạng, vui lòng kiểm tra lại kết nối internet của bạn")
                } else {
                    setErrorUsername(error.response.data.message)
                }
            }).finally(() => {
              setLoading(false)
            })
        }
    }

    return (
        <div className={"container-fluid d-flex flex-column justify-content-center align-items-center bg-light py-5"}>
            <div className={"bg-white border p-5 rounded-3"} style={{width: "450px"}}>
                <h1 className={"text-center text-danger fw-bold"}>ĐĂNG NHẬP</h1>
                <form className={"mt-4"}>
                    <div className="mb-3">
                        <label htmlFor="taikhoan" className="form-label">Tài khoản</label>
                        <input type="text" className="form-control py-2" id="taikhoan" placeholder={"Tên tài khoản"}
                               value={username} onInput={() => {
                            setErrorUsername("")
                        }} onChange={(e) => {
                            setUsername(e.target.value)
                        }}/>
                        <span className={"text-danger"}>{errorUsername}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matkhau" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control py-2" id="matkhau" placeholder={"Mật khẩu"}
                               value={password} onInput={() => {
                            setErrorPasswrod("")
                        }} onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                        <span className={"text-danger"}>{errorPassword}</span>
                    </div>
                    <p className={"mt-2"}>
                        <Link className={"text-decoration-none"} to={"/forget-password"}>Quên mật khẩu?</Link>
                    </p>
                    {
                        !loading
                            ?
                            <button type="submit" className="btn btn-danger w-100 mt-4" onClick={handleSubmit}>Đăng nhập</button>
                            :
                            <div className={"mt-4 w-100 d-flex justify-content-center"}>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                    }
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