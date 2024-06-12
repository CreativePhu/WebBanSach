import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/Hooks";
import UserInf from "../../data_type/Auth/UserInf";
import {resetUser} from "../../redux/UserSlice";

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const count = useAppSelector(state => state.Count.value)

    const user: UserInf | null = useAppSelector(state => state.User.value)

    const [searchValue, setSearchValue] = React.useState<string>("")
    const [showUserDropdown, setShowUserDropdown] = React.useState<boolean>(false)
    const [isHover, setIsHover] = React.useState<boolean>(false)
    const [numberCart, setNumberCart] = React.useState<number>(0)

    React.useEffect(() => {
        if (user) {
            setShowUserDropdown(true)
        } else {
            setShowUserDropdown(false)
        }
    }, [user])

    React.useEffect(() => {
        setNumberCart(count)
        console.log("change" + count)
    }, [count])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const logout = () => {
        localStorage.removeItem("token")
        dispatch(resetUser())
        navigate("/login")
    }

    const handleSearchSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        navigate(`/search?bookTitle=${searchValue}`)
        setSearchValue("")
    }

    return (
        <div id={"navbar"} className="container-fluid py-2" style={{backgroundColor: "white"}}>
            <div className={"container"}>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <div className={"row w-100"}>
                            <div
                                className={"col-md-12 col-lg-3 col-xl-3 d-flex justify-content-start align-items-center p-0"}>
                                <Link className="navbar-brand" to={"/"}>
                                    <img
                                        src={"/images/banner.png"}
                                        alt="Bootstrap" style={{width: "220px", height: "auto"}}/>
                                </Link>
                            </div>
                            <div className={"col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center p-0"}>
                                <form className="d-flex w-100" role="search">
                                    <input className="form-control me-2" type="search"
                                           placeholder="Nhập tên sách cần tìm"
                                           aria-label="Search" onChange={handleSearchChange} value={searchValue}/>
                                    <button className="btn bg-danger px-4" type="submit" onClick={handleSearchSubmit}>
                                        <i className="bi bi-search" style={{color: "white"}}></i>
                                    </button>
                                </form>
                            </div>
                            <div
                                className={"d-none d-lg-block col-lg-3 col-xl-3 d-flex justify-content-end align-items-center p-0"}>
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <Link className="nav-link me-3 py-1 pe-0" aria-current="page" to={"/cart"}>
                                            <button type="button" className={`${count > 0 ? "shadow btn btn-outline-light position-relative" : "border-0 bg-white"}`}>
                                                <i className="bi bi-cart-fill fs-4 text-danger"></i>
                                                <span className={`${count <= 0 ? "d-none" : ""} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>{numberCart}<span className="visually-hidden">unread messages</span></span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        {
                                            !showUserDropdown ?
                                                <>
                                                    <Link id={"user-login"} onMouseEnter={() => setIsHover(true)}
                                                          onMouseLeave={() => setIsHover(false)}
                                                          className="nav-link p-3 py-0 pe-0" aria-current="page"
                                                          to={"/login"}>
                                                        <div
                                                            className={"d-flex flex-column justify-content-center align-items-center py-1 px-3"}>
                                                            <i className="bi bi-person-fill fs-4 text-danger"></i>
                                                        </div>
                                                    </Link>
                                                    <div
                                                        onMouseEnter={() => setIsHover(true)}
                                                        onMouseLeave={() => setIsHover(false)}
                                                        className={`${isHover ? "d-block" : "d-none"} position-absolute d-flex flex-column bg-white shadow-sm p-3 mb-5 bg-body-tertiary rounded`}
                                                        style={{width: "150px"}}>
                                                        <Link to={"/login"}
                                                              className={"text-decoration-none text-danger"}>
                                                            Đăng nhập
                                                        </Link>
                                                        <hr className={"my-2 text-danger"}/>
                                                        <Link to={"/register"}
                                                              className={"text-decoration-none text-danger"}>
                                                            Đăng ký
                                                        </Link>
                                                    </div>
                                                </>
                                                :
                                                <div className="dropdown d-flex flex-row ms-3">
                                                    <button className="btn btn-danger dropdown-toggle" type="button"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="bi bi-person-fill fs-4 text-white"></i>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <span
                                                                className="dropdown-item text-danger fw-bold">{user?.fullName}</span>
                                                        </li>
                                                        <li>
                                                            <hr className="dropdown-divider text-danger"/>
                                                        </li>
                                                        <li>
                                                            <Link to={"/profile"} className="dropdown-item text-danger">Thông
                                                                tin cá nhân</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={"/history-order"}
                                                                  className="dropdown-item text-danger">Lich sử mua
                                                                hàng</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={"/cart"} className="dropdown-item text-danger">Giỏ
                                                                hàng</Link>
                                                        </li>
                                                        <li>
                                                            <hr className="dropdown-divider text-danger"/>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item text-danger"
                                                                    onClick={() => {
                                                                        logout()
                                                                    }}>Đăng xuất
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;