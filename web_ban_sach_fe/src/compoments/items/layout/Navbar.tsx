import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/Hooks";
import UserInf from "../../data_type/Auth/UserInf";
import {resetUser} from "../../redux/UserSlice";

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const user: UserInf | null = useAppSelector(state => state.User.value)

    const [searchValue, setSearchValue] = React.useState<string>("")
    const [showUserDropdown, setShowUserDropdown] = React.useState<boolean>(false)

    React.useLayoutEffect(() => {
        if (user) {
            setShowUserDropdown(true)
        } else {
            setShowUserDropdown(false)
        }
    }, [user])

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
                                        <a className="nav-link px-3 py-0 pe-0" aria-current="page" href="#">
                                            <div
                                                className={"d-flex flex-column justify-content-center align-items-center py-1 px-3"}>
                                                <i className="bi bi-cart-fill fs-4 text-danger"></i>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        {
                                            !showUserDropdown ?
                                                <Link className="nav-link p-3 py-0 pe-0" aria-current="page"
                                                      to={"/login"}>
                                                    <div
                                                        className={"d-flex flex-column justify-content-center align-items-center py-1 px-3"}>
                                                        <i className="bi bi-person-fill fs-4 text-danger"></i>
                                                    </div>
                                                </Link>
                                                :
                                                <div className="dropdown d-flex flex-row ms-3">
                                                    <button className="btn btn-danger dropdown-toggle" type="button"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="bi bi-person-fill fs-4 text-white"></i>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item text-danger" href="#">Action</a>
                                                        </li>
                                                        <li><a className="dropdown-item text-danger" href="#">Another
                                                            action</a>
                                                        </li>
                                                        <li><a className="dropdown-item text-danger" href="#">Something
                                                            else here</a></li>
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