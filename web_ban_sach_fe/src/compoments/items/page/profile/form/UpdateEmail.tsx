import React from "react";
import {FullScreenOverlay} from "../../../FullScreenOverlay";
import {REGEX_EMAIL} from "../../../Regex";
import UserInf from "../../../../data_type/Auth/UserInf";
import {useAppSelector} from "../../../../redux/Hooks";
import {VerifyAccountForm} from "./VerifyAccountForm";
import {checkEmailExistsAPI} from "../../../../api/Auth";

interface UpdateEmailProps {
    isVisible: boolean;
    onClose: () => void;
}

export const UpdateEmail: React.FC<UpdateEmailProps> = ({isVisible, onClose}) => {


    const user: UserInf | null = useAppSelector(state => state.User.value)
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [email, setEmail] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [moveVerifyAccount, setMoveVerifyAccount] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (user) {
            setEmail(user.email)
            setError("")
            setMoveVerifyAccount(false)
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

    const validateEmail = async () => {
        let check = true
        if (email === "") {
            check = false
            setError("Email không được để trống");
        } else {
            if (!email.match(REGEX_EMAIL)) {
                check = false
                setError("Email không hợp lệ");
            } else {
                if (await checkEmailExistsAPI(email)) {
                    setError("Email đã tồn tại");
                    check = false;
                }
            }
        }

        return check
    }

    const moveVerifyAccountForm = async () => {
        try {
            if (await validateEmail()) {
                setMoveVerifyAccount(true)
            }
        } catch (e) {
            setError("Có lỗi xảy ra, vui lòng thử lại sau")
        }
    }

    return (
        <FullScreenOverlay isVisible={isVisible}>
            {
                !moveVerifyAccount ?
                    <div ref={modalRef} className={"rounded bg-white px-5 py-5 position-relative"}
                         style={{width: "450px", minHeight: "250px"}}>
                        <p className={"text-danger fw-semibold fs-3"}>Cập nhật Email</p>
                        <label htmlFor={"email"} className={"fw-semibold"}>Email</label>
                        <input id={"email"} type="text" className={"form-control mt-1 py-2 rounded-3"}
                               value={email} onChange={(e) => setEmail(e.target.value)}
                               placeholder={"Email mới của bạn"}/>
                        <p className={"text-danger"}>{error}</p>
                        <button
                            onClick={() => {
                                moveVerifyAccountForm()
                            }}
                            disabled={email === user?.email}
                            className={"btn btn-danger w-100 mt-3 rounded-3"}>Cập nhật
                        </button>
                        <div onClick={() => {
                            onClose()
                        }} className={"position-absolute cussor-pointer"} style={{top: "10px", right: "20px"}}>
                            <i className="bi bi-x fs-2"></i>
                        </div>
                    </div>
                    :
                    <VerifyAccountForm onClose={onClose} modalRef={modalRef} email={email}/>
            }
        </FullScreenOverlay>
    );
}