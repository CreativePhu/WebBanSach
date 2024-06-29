import React from "react";
import {FullScreenOverlay} from "../../../FullScreenOverlay";
import UserInf from "../../../../data_type/Auth/UserInf";
import {useAppDispatch, useAppSelector} from "../../../../redux/Hooks";
import {REGEX_NAME} from "../../../Regex";
import {UpdateProfileUser} from "../../../../api/profile/UpdateProfileUser";
import {updateUserFullName} from "../../../../redux/slice/UserSlice";

interface UpdateFullNameProps {
    isVisible: boolean;
    onClose: () => void;
}

export const UpdateFullName: React.FC<UpdateFullNameProps> = ({isVisible, onClose}) => {

    const dispatch = useAppDispatch()

    const modalRef = React.useRef<HTMLDivElement>(null);
    const user: UserInf | null = useAppSelector(state => state.User.value)
    const token = localStorage.getItem("token");
    const [fullName, setFullName] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (user) {
            setFullName(user.fullName);
        }
    }, [user])

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

    const validateForm = () => {
        let check = true;
        if (fullName === "") {
            check = false;
            setError("Tên không được để trống");
        } else {
            if (!fullName.match(REGEX_NAME)) {
                check = false;
                setError("Phải là chỗi, không chứa ký tự đặc biệt, tối thiểu 2 ký tự");
            }
        }
        return check;
    }

    const updateFullName = () => {
        if (validateForm()) {
            setLoading(true);
            if (user?.userName && token) {
                UpdateProfileUser(user.userName, token, {fullName}).then(() => {
                    dispatch(updateUserFullName(fullName))
                    setLoading(false);
                    onClose();
                }).catch(err => {
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

    return (
        <FullScreenOverlay isVisible={isVisible}>
            <div ref={modalRef} className={"rounded bg-white px-5 py-5 position-relative"}
                 style={{width: "450px", minHeight: "350px"}}>
                <span className={"text-danger fw-semibold fs-3"}>Cập nhật tên của bạn</span>
                <p className={"text-danger"}>Tên sẽ được hiển thị trên trang cá nhân và các bài viết của bạn</p>
                <label htmlFor={"fullName"} className={"fw-semibold"}>Họ và Tên</label>
                <input id={"fullName"} type="text" className={"form-control mt-1 py-2 rounded-3"}
                       value={fullName}
                       onChange={(e) => {
                           setFullName(e.target.value)
                           setError("")
                       }}
                       placeholder={"Tên mới của bạn"}/>
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
                                updateFullName()
                            }}
                            disabled={fullName === user?.fullName}
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