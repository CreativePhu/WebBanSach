import React from "react";
import UserInf from "../../data_type/Auth/UserInf";
import {useAppSelector} from "../../redux/Hooks";
import {Link} from "react-router-dom";

interface MenuNavbarProps {
    isVisible: boolean;
    close: () => void;
}

export const MenuNavbar: React.FC<MenuNavbarProps> = ({isVisible, close}) => {

    const user: UserInf | null = useAppSelector(state => state.User.value)

    return (
        <div className={"full-screen-overlay-menu bg-white d-flex flex-column justify-content-center"}
             style={{transform: `translateX(-${isVisible ? 0 : 100}%)`, transition: "transform 0.5s ease"}}>
            <div className={"d-flex justify-content-center align-items-center"}>
                <img src={"/images/banner.png"} alt="Bootstrap" style={{width: "220px", height: "auto"}}/>
            </div>
            <div>
                {
                    user === null ? (
                        <ul className={"list-group mt-4"}>
                            <li className={"list-group-item bg-danger"}>
                                <Link onClick={() => close()} to={"/"}
                                      className={"text-decoration-none text-white d-block"}>Trang Chủ</Link>
                            </li>
                            <li className={"list-group-item bg-danger"}>
                                <Link onClick={() => close()} to={"/cart"}
                                      className={"text-decoration-none text-white d-block"}>Giỏ Hàng</Link>
                            </li>
                            <li className={"list-group-item bg-danger"}>
                                <Link onClick={() => close()} to={"/login"}
                                      className={"text-decoration-none text-white d-block"}>Đăng Nhập</Link>
                            </li>
                            <li className={"list-group-item bg-danger"}>
                                <Link onClick={() => close()} to={"/register"}
                                      className={"text-decoration-none text-white d-block"}>Đăng Kí</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className={"list-group mt-4"}>
                            <li className={"list-group-item bg-danger"}>
                                <Link onClick={() => close()} to={"/"}
                                      className={"text-decoration-none text-white d-block"}>Trang Chủ</Link>
                            </li>
                            <li className={"list-group-item bg-danger"}>
                                <Link onClick={() => close()} to={"/profile"}
                                      className={"text-decoration-none text-white d-block"}>Thông Tin Tài Khoản</Link>
                            </li>
                            <li className={"list-group-item bg-danger"}>
                                <Link onClick={() => close()} to={"/cart"}
                                      className={"text-decoration-none text-white d-block"}>Giỏ Hàng</Link>
                            </li>
                        </ul>
                    )
                }
            </div>
            <div onClick={() => {
                close()
            }} className={"position-absolute cussor-pointer"} style={{top: "10px", right: "10px"}}>
                <i className="bi bi-x fs-1 text-danger"></i>
            </div>
        </div>
    );
}