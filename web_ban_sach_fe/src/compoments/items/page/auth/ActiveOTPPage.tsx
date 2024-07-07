import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {CheckVerifyOTP} from "../../../api/Auth";
import {useAppDispatch, useAppSelector} from "../../../redux/Hooks";
import {updateVerified} from "../../../redux/slice/UserSlice";
import UserInf from "../../../data_type/Auth/UserInf";
import {GenerateOTP} from "../../../api/Auth/GenerateOTP";

const ActiveOTPPage: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || "";
    const user: UserInf | null = useAppSelector(state => state.User.value)

    const [codeOTP, setCodeOTP] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingResend, setLoadingResend] = React.useState<boolean>(false);
    const [verifySuccess, setVerifySuccess] = React.useState<boolean>(false);
    const [countDown, setCountDown] = React.useState<number>(0);

    React.useEffect(() => {
        const id = setInterval(() => {
            if (countDown > 0) {
                setCountDown(prevState => prevState - 1)
            } else {
                clearInterval(id)
            }
        }, 1000);
        return () => clearInterval(id);
    }, [countDown])

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

    const sendOTPBack = () => {
        setLoadingResend(true)
        let email = sessionStorage.getItem("email") || ""
        if(user) email = user.email
        GenerateOTP(email).catch((error) => {
            if ((error.message.includes("Failed to fetch") || error.message.includes("Network Error"))) {
                setError("Lỗi mạng, vui lòng kiểm tra lại kết nối internet của bạn")
            } else {
                setError(error?.response.data.message || error.message || "")
            }
        }).finally(() => {
            setCountDown(120)
            setLoadingResend(false)
        })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (checkValidateForm()) {
            setLoading(true)
            CheckVerifyOTP({email, verificationCode: codeOTP}).then(() => {
                if (user) {
                    dispatch(updateVerified(true))
                }
                return new Promise((resolve) => {
                    setLoading(false)
                    setVerifySuccess(true)
                    setTimeout(() => {
                        resolve(true)
                    }, 2000)
                })
            }).then(() => {
                navigate("/")
            }).catch((error) => {
                if ((error.message.includes("Failed to fetch") || error.message.includes("Network Error"))) {
                    setError("Lỗi mạng, vui lòng kiểm tra lại kết nối internet của bạn")
                } else {
                    setError(error.response.data.message)
                }
            })
        }
    }

    return (
        <div className={"container-fluid d-flex flex-column justify-content-center align-items-center bg-light py-5"}>
            <span className={"text-danger mb-2"}>Đã gửi mã xác thực tới Email: <span
                className={"text-decoration-underline text-secondary"}>{email}</span></span>
            <div className={"bg-white border p-5 rounded-3"} style={{width: "450px"}}>
                <h1 className={"text-center text-danger fw-bold"}>XÁC THỰC EMAIL</h1>
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
                    {
                        loadingResend ?
                            <div className={"d-flex justify-content-start"}>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            <>
                                <span className={"d-flex align-items-center"}>
                                <button
                                    onClick={() => {
                                        sendOTPBack()
                                    }}
                                    disabled={countDown > 0}
                                    type="button"
                                    className="btn btn-link p-0 text-decoration-none me-2">
                                    Gửi lại mã
                                </button>
                                <span className={`${countDown <= 0 ? "d-none" : "d-block"}`}>
                                    sau: {countDown}s
                                    <i className="bi bi-check-circle-fill ms-2 text-success"></i>
                                </span>
                                </span>
                            </>
                    }
                    {
                        !loading
                            ?
                            verifySuccess
                                ?
                                <div className={"mt-4 w-100 d-flex justify-content-center"}>
                                    <i className="bi bi-check-circle-fill fs-2 text-success"></i>
                                </div>
                                :
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