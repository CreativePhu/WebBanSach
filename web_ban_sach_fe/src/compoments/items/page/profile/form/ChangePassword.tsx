import React from "react";
import {FullScreenOverlay} from "../../../FullScreenOverlay";
import {UpdateUser} from "../../../../api/profile/UpdateProfileUser";
import {REGEX_PASSWORD} from "../../../Regex";
import {ChangePasswordAPI} from "../../../../api/Auth/ChangePasswordAPI";

interface ChangePasswordProps {
    isVisible: boolean;
    onClose: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({isVisible, onClose}) => {

    const modalRef = React.useRef<HTMLDivElement>(null);

    const [password, setPassword] = React.useState<string>("");
    const [newPassword, setNewPassword] = React.useState<string>("");
    const [newPasswordBack, setNewPasswordBack] = React.useState<string>("");

    const [error, setError] = React.useState<string>("");
    const [errorPassword, setErrorPassword] = React.useState<string>("");
    const [errorNewPassword, setErrorNewPassword] = React.useState<string>("");
    const [errorNewPasswordBack, setErrorNewPasswordBack] = React.useState<string>("");

    const [loading, setLoading] = React.useState<boolean>(false);
    const [changeSuccess, setChangeSuccess] = React.useState<boolean>(false);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },)

    React.useEffect(() => {
        if (isVisible) {
            setPassword("")
            setNewPassword("")
            setNewPasswordBack("")
            setError("")
            setErrorPassword("")
            setErrorNewPassword("")
            setErrorNewPasswordBack("")
            setLoading(false)
            setChangeSuccess(false)
        }

    }, [isVisible])

    const validatePassword = () => {

        let check = true
        if (password === "") {
            check = false
            setErrorPassword("Vui lòng nhập mật khẩu");
        } else {
            setErrorPassword("");
        }

        if (newPassword === "") {
            setErrorNewPassword("Mật khẩu không được để trống");
            check = false;
        } else {
            if (!REGEX_PASSWORD.test(newPassword)) {
                setErrorNewPassword("Mật khẩu tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt");
                check = false;
            } else {
                setErrorNewPassword("")
            }
        }

        if (newPasswordBack === "") {
            check = false
            setErrorNewPasswordBack("Vui lòng nhập lại mật khẩu mới");
        } else {
            setErrorNewPasswordBack("");
        }
        return check
    }

    const validateSamePassword = () => {
        let check = true
        if (newPassword !== newPasswordBack) {
            check = false
            setErrorNewPasswordBack("Mật khẩu không trùng khớp");
        } else {
            setErrorNewPasswordBack("");
        }
        return check
    }

    const updatePassword = () => {
        if (validatePassword() && validateSamePassword()) {
            setLoading(true)
            const token = localStorage.getItem("token")
            ChangePasswordAPI(token || "", {password, newPassword}).then(() => {
                setChangeSuccess(true)
            }).catch((error: any) => {
                if ((error.message.includes("Failed to fetch") || error.message.includes("Network Error"))) {
                    setError("Lỗi mạng, vui lòng kiểm tra lại kết nối internet của bạn")
                } else {
                    setErrorPassword("Mật khẩu không chính xác")
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <FullScreenOverlay isVisible={isVisible}>
            <div ref={modalRef} className={"rounded bg-white px-5 py-5 position-relative"}
                 style={{width: "450px", minHeight: "250px"}}>
                {
                    !changeSuccess ?
                        <>
                            <p className={"text-danger fw-semibold fs-3"}>Đổi mật khẩu</p>
                            <p className={"text-danger"}>{error}</p>
                            <label htmlFor={"password"} className={"fw-semibold mt-2"}>Mật khẩu cũ</label>
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setErrorPassword("")
                                }}
                                type={"password"}
                                className={"form-control"}
                                id={"password"}
                                placeholder={"Nhập mật khẩu cũ"}
                            />
                            <p className={"text-danger"}>{errorPassword}</p>
                            <label htmlFor={"newPassword"} className={"fw-semibold mt-2"}>Mật khẩu mới</label>
                            <input
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value)
                                    setErrorNewPassword("")
                                }}
                                type={"password"}
                                className={"form-control"}
                                id={"newPassword"}
                                placeholder={"Nhập mật khẩu mới"}
                            />
                            <p className={"text-danger"}>{errorNewPassword}</p>
                            <label htmlFor={"newPasswordBack"} className={"fw-semibold mt-2"}>Nhập lại mật khẩu
                                mới</label>
                            <input
                                value={newPasswordBack}
                                onChange={(e) => {
                                    setNewPasswordBack(e.target.value)
                                    setErrorNewPasswordBack("")
                                }}
                                type={"password"}
                                className={"form-control"}
                                id={"newPasswordBack"}
                                placeholder={"Nhập lại mật khẩu mới"}
                            />
                            <p className={"text-danger"}>{errorNewPasswordBack}</p>
                            {
                                loading ?
                                    <button disabled={true} className={"btn btn-danger w-100 mt-3 rounded-3"}>Đang cập
                                        nhật...</button>
                                    :
                                    <button
                                        disabled={password === "" || newPassword === "" || newPasswordBack === "" || password === newPassword}
                                        onClick={() => {
                                            updatePassword()
                                        }} className={"btn btn-danger w-100 mt-3 rounded-3"}>Cập nhật</button>

                            }
                        </>
                        :
                        <>
                            <div className={"d-flex flex-column justify-content-center align-items-center"}>
                                <p className={"text-success fw-semibold fs-3"}>Đổi mật khẩu thành công</p>
                                <div className={"mt-4 w-100 d-flex justify-content-center"}>
                                    <i className="bi bi-check-circle-fill fs-2 text-success"></i>
                                </div>
                            </div>
                        </>
                }
                <div onClick={() => {
                    onClose()
                }} className={"position-absolute cussor-pointer"} style={{top: "10px", right: "20px"}}>
                    <i className="bi bi-x fs-2"></i>
                </div>
            </div>
        </FullScreenOverlay>
    );
}