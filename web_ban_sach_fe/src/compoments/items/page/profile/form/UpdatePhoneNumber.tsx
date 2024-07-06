import React from "react";
import {FullScreenOverlay} from "../../../FullScreenOverlay";
import UserInf from "../../../../data_type/Auth/UserInf";
import {useAppDispatch, useAppSelector} from "../../../../redux/Hooks";
import {REGEX_PHONENUMBER} from "../../../Regex";
import {updateUserPhoneNumber} from "../../../../redux/slice/UserSlice";
import {UpdateUser} from "../../../../api/profile/UpdateProfileUser";

interface UpdatePhoneNumberProps {
    isVisible: boolean;
    onClose: () => void;
}

export const UpdatePhoneNumber: React.FC<UpdatePhoneNumberProps> = ({isVisible, onClose}) => {

    const dispatch = useAppDispatch()

    const modalRef = React.useRef<HTMLDivElement>(null);
    const user: UserInf | null = useAppSelector(state => state.User.value)
    const token = localStorage.getItem("token");
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (user) {
            setPhoneNumber(user?.phone);
            setError("")
        }
    }, [user, isVisible])

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
    })

    const updatePhoneNumber = () => {
        if (validateForm()) {
            setLoading(true);
            if (user?.userName && token) {
                UpdateUser(token, {phoneNumber}).then(() => {
                    dispatch(updateUserPhoneNumber(phoneNumber))
                    setLoading(false);
                    onClose();
                }).catch((err: any) => {
                    setLoading(false);
                    console.error(err)
                    setError("Có lỗi xảy ra, vui lòng thử lại sau");
                })
                return
            }
            setLoading(false);
            setError("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    }

    const validateForm = () => {
        let check = true;
        if (phoneNumber === "") {
            check = false;
            setError("Số điện thoại không được để trống");
        } else {
            if (!phoneNumber.match(REGEX_PHONENUMBER)) {
                check = false;
                setError("Số điện thoại không hợp lệ");
            }
        }
        return check;
    }

    return (
        <FullScreenOverlay isVisible={isVisible}>
            <div ref={modalRef} className={"rounded bg-white px-5 py-5 position-relative"}
                 style={{width: "450px", minHeight: "250px"}}>
                <p className={"text-danger fw-semibold fs-3"}>Cập nhật số điện thoại</p>
                <label htmlFor={"phoneNumber"} className={"fw-semibold mt-2"}>Số điện thoại</label>
                <input id={"phoneNumber"} type="text" className={"form-control mt-1 py-2 rounded-3"}
                       value={phoneNumber}
                       onChange={(e) => {
                           setPhoneNumber(e.target.value)
                       }}
                       placeholder={"Số điện thoại của bạn"}/>
                <p className={"text-danger"}>{error}</p>
                {
                    loading ?
                        <div className={"w-100 d-flex justify-content-center align-items-center"}>
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        :
                        <button
                            onClick={() => {
                                updatePhoneNumber()
                            }}
                            disabled={phoneNumber === user?.phone}
                            className={"btn btn-danger w-100 mt-3 rounded-3"}>Cập nhật
                        </button>
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