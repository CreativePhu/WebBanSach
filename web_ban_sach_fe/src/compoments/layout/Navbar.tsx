import React from 'react';
import {ICON_GRAY} from "../../colors";
import {Link, useNavigate} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [searchValue, setSearchValue] = React.useState<string>("")

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
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
                            <div className={"col-md-12 col-lg-3 col-xl-3 d-flex justify-content-start align-items-center p-0"}>
                                <Link className="navbar-brand" to={"/"}>
                                    <img
                                        src={"/images/banner.png"}
                                        alt="Bootstrap" style={{width: "220px", height: "auto"}}/>
                                </Link>
                            </div>
                            <div className={"col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center p-0"}>
                                <form className="d-flex w-100" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Nhập tên sách cần tìm"
                                           aria-label="Search" onChange={handleSearchChange} value={searchValue}/>
                                    <button className="btn bg-danger px-4" type="submit" onClick={handleSearchSubmit}>
                                        <i className="bi bi-search" style={{color: "white"}}></i>
                                    </button>
                                </form>
                            </div>
                            <div className={"d-none d-lg-block col-lg-3 col-xl-3 d-flex justify-content-end align-items-center p-0"}>
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <a className="nav-link px-3 py-0 pe-0" aria-current="page" href="#">
                                            <div
                                                className={"d-flex flex-column justify-content-center align-items-center"}>
                                                <i className="bi bi-cart-fill"
                                                   style={{fontSize: "20px", color: ICON_GRAY}}></i>
                                                <span style={{fontSize: "14px", color: ICON_GRAY}}>Giỏ Hàng</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link p-3 py-0 pe-0" aria-current="page" to={"/login"}>
                                            <div
                                                className={"d-flex flex-column justify-content-center align-items-center"}>
                                                <i className="bi bi-person-fill"
                                                   style={{fontSize: "20px", color: ICON_GRAY}}></i>
                                                <span style={{fontSize: "14px", color: ICON_GRAY}}>Tài Khoản</span>
                                            </div>
                                        </Link>
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