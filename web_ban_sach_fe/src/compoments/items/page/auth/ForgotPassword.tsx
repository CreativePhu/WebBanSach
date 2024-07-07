import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {REGEX_EMAIL, REGEX_PASSWORD} from "../../Regex";
import {GenerateOTPAPI} from "../../../api/Auth/GenerateOTPAPI";
import {VerifyOTPAPI} from "../../../api/Auth";
import {ForgetPasswordAPI} from "../../../api/Auth/ForgetPasswordAPI";

const ForgetPassword: React.FC = () => {

    const navigate = useNavigate();

    const [email, setEmail] = React.useState<string>("");
    const [newPassword, setNewPassword] = React.useState<string>("");
    const [newPasswordAgain, setNewPasswordAgain] = React.useState<string>("");
    const [otpCode, setOtpCode] = React.useState<string>("");

    const [error, setError] = React.useState<string>("");
    const [errorEmail, setErrorEmail] = React.useState<string>("");
    const [errorNewPassword, setErrorNewPassword] = React.useState<string>("");
    const [errorNewPasswordAgain, setErrorNewPasswordAgain] = React.useState<string>("");
    const [errorOtpCode, setErrorOTPCode] = React.useState<string>("");

    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingOTP, setLoadingOTP] = React.useState<boolean>(false);
    const [countDown, setCountDown] = React.useState<number>(0);
    const [isShow, setIsShow] = React.useState<boolean>(false);

    React.useEffect(() => {
        const id = setInterval(() => {
            if (countDown > 0) {
                setCountDown(prevState => prevState - 1)
            } else {
                clearInterval(id)
            }
            console.log("dfsdf")
        }, 1000)

        return () => clearInterval(id)
    }, [countDown])

    const checkValidateFormVerifyOTP = (): boolean => {
        let check = true;
        if (!email) {
            setErrorEmail("Email không được để trống");
            check = false;
        } else {
            if (!REGEX_EMAIL.test(email)) {
                setErrorEmail("Email không hợp lệ")
                check = false;
            } else {
                setErrorEmail("");
            }
        }

        if (!otpCode) {
            setErrorOTPCode("Vui lòng nhập mã xác thực");
            check = false;
        } else {
            setErrorOTPCode("");
        }

        return check;
    }

    const checkValidateFormNewPassword = (): boolean => {
        let check = true;
        if (!newPassword) {
            setErrorNewPassword("Mật khẩu không được để trống");
            check = false;
        } else {
            if (!REGEX_PASSWORD.test(newPassword)) {
                setErrorNewPassword("Mật khẩu tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt");
                check = false;
            } else {
                setErrorNewPassword("");
            }
        }

        if (!newPasswordAgain) {
            setErrorNewPasswordAgain("Nhập lại mật khẩu không được để trống");
            check = false;
        } else {
            if (newPasswordAgain !== newPassword) {
                setErrorNewPasswordAgain("Mật khẩu nhập lại không khớp");
                check = false;
            } else {
                setErrorNewPasswordAgain("");
            }
        }

        return check;
    }

    const GenerateOTPCode = () => {
        setLoadingOTP(true)
        setError("")
        GenerateOTPAPI(email).then((res) => {
            setCountDown(120)
            setError("Mã xác thực đã được gửi đến email của bạn")
        }).catch((error) => {
            if ((error.message.includes("Failed to fetch") || error.message.includes("Network Error"))) {
                setError("Lỗi mạng, vui lòng kiểm tra lại kết nối internet của bạn")
            } else {
                setError("Lỗi hệ thống, vui lòng thử lại sau")
            }
        }).finally(() => {
            setLoadingOTP(false)
        })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (checkValidateFormVerifyOTP()) {
            setLoading(true)
            VerifyOTPAPI({email, verificationCode: otpCode}).then((res) => {
                setIsShow(true)
            }).catch((error) => {
                if ((error.message.includes("Failed to fetch") || error.message.includes("Network Error"))) {
                    setError("Lỗi mạng, vui lòng kiểm tra lại kết nối internet của bạn")
                } else {
                    setError("Mã xác thực không chính xác")
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const handleSubmitNewPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (checkValidateFormNewPassword()) {
            setLoading(true)
            ForgetPasswordAPI(email, newPassword).then((res) => {
                alert("Đặt lại mật khẩu thành công")
                navigate("/login")
            }).catch((error) => {
                if ((error.message.includes("Failed to fetch") || error.message.includes("Network Error"))) {
                    setError("Lỗi mạng, vui lòng kiểm tra lại kết nối internet của bạn")
                } else {
                    setError("Có lỗi xảy ra, vui lòng thử lại sau")
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <div className={"container-fluid d-flex flex-column justify-content-center align-items-center bg-light py-5"}>
            <div className={"bg-white border p-5 rounded-3"} style={{width: "450px"}}>
                {
                    !isShow ?
                        <>
                            <h1 className={"text-center text-danger fw-bold"}>Quên mật khẩu?</h1>
                            <p className={"text-danger"}>Nhập email liên kết của bạn để nhận mã xác thực</p>
                            <form className={"mt-4"}>
                                <div className="mb-3">
                                    <label htmlFor="mail" className="form-label">Email liên kết</label>
                                    <input type="text" className="form-control py-2" id="mail" placeholder={"Email"}
                                           value={email} onInput={() => {
                                        setErrorEmail("")
                                        setError("")
                                    }} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}/>
                                    <span className={"text-danger"}>{errorEmail}</span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="matkhau" className="form-label">Mã xác thực</label>
                                    <input
                                        type="text"
                                        className="form-control py-2"
                                        id="matkhau"
                                        placeholder={"Nhập mã xác thực"}
                                        value={otpCode}
                                        onInput={() => {
                                            setErrorOTPCode("")
                                            setError("")
                                        }}
                                        onChange={(e) => {
                                            setOtpCode(e.target.value)
                                        }}
                                        disabled={email === ""}
                                    />
                                    <span className={"text-danger"}>{errorOtpCode}</span>
                                </div>
                                {
                                    !loadingOTP ?
                                        <div className={"d-flex justify-content-start align-items-center"}>
                                            <button
                                                onClick={() => {
                                                    GenerateOTPCode()
                                                }}
                                                disabled={countDown > 0 || email === ""}
                                                type="button"
                                                className="btn btn-link p-0 text-decoration-none"
                                            >
                                                Lấy mã xác thực
                                            </button>
                                            <span
                                                className={`ms-2 ${countDown <= 0 ? "d-none" : "d-block"}`}>sau {countDown}s</span>
                                        </div>
                                        :
                                        <div>
                                            <button
                                                disabled={true}
                                                type="button"
                                                className="btn btn-link p-0 text-decoration-none"
                                            >
                                                Đang gửi mã xác thực...
                                            </button>
                                        </div>
                                }
                                <span className={"text-danger"}>{error}</span>
                                {
                                    !loading
                                        ?
                                        <button
                                            disabled={email === "" || otpCode === ""}
                                            type="submit"
                                            className="btn btn-danger w-100 mt-4"
                                            onClick={handleSubmit}
                                        >
                                            Đặt lại mật khẩu
                                        </button>
                                        :
                                        <button
                                            disabled={true}
                                            type="submit"
                                            className="btn btn-danger w-100 mt-4"
                                            onClick={handleSubmit}
                                        >
                                            Đang xác thực...
                                        </button>
                                }
                                <p className={"mt-2 d-flex justify-content-center"}>
                                    <span>Bạn chưa có tài khoản?</span>
                                    <Link className={"text-decoration-none ms-2"} to={"/register"}>Đăng kí</Link>
                                </p>
                            </form>
                        </>
                        :
                        <form>
                            <h1 className={"text-center text-danger fw-bold"}>Đặt lại mật khẩu</h1>
                            <p className={"text-danger"}>Vui lòng nhập mật khẩu mới của bạn để thay đổi</p>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                                <input type="password" className="form-control py-2" id="newPassword"
                                       placeholder={"Nhập mật khẩu mới"}
                                       value={newPassword} onInput={() => {
                                    setErrorNewPassword("")
                                }} onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }}/>
                                <span className={"text-danger"}>{errorNewPassword}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPasswordAgaint" className="form-label">Nhập lại mật khẩu mới</label>
                                <input type="password" className="form-control py-2" id="newPasswordAgaint"
                                       placeholder={"Nhập lại mật khẩu mới"}
                                       value={newPasswordAgain} onInput={() => {
                                    setErrorNewPasswordAgain("")
                                }} onChange={(e) => {
                                    setNewPasswordAgain(e.target.value)
                                }}/>
                                <span className={"text-danger"}>{errorNewPasswordAgain}</span>
                            </div>
                            <span className={"text-danger"}>{error}</span>
                            {
                                !loading
                                    ?
                                    <button
                                        disabled={newPassword === "" || newPasswordAgain === "" || newPassword !== newPasswordAgain}
                                        type="submit"
                                        className="btn btn-danger w-100 mt-4"
                                        onClick={handleSubmitNewPassword}
                                    >
                                        Đặt lại mật khẩu
                                    </button>
                                    :
                                    <button
                                        disabled={true}
                                        type="submit"
                                        className="btn btn-danger w-100 mt-4"
                                    >
                                        Đang đặt lại mật khẩu...
                                    </button>
                            }
                            <p className={"mt-2 d-flex justify-content-center"}>
                                <span>Bạn chưa có tài khoản?</span>
                                <Link className={"text-decoration-none ms-2"} to={"/register"}>Đăng kí</Link>
                            </p>
                        </form>
                }
            </div>
        </div>
    )
}

export default ForgetPassword;