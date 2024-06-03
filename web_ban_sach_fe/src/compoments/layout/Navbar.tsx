import React from 'react';
import {ICON_GRAY} from "../../colors";

function Navbar() {
    return (
        <div id={"navbar"} className="container-fluid py-2" style={{backgroundColor: "white"}}>
            <div className={"container"}>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className={"row w-100"}>
                            <div className={"col-md-12 col-lg-3 col-xl-3 d-flex justify-content-start align-items-center"}>
                                <a className="navbar-brand" href="#">
                                    <img
                                        src={"images/banner.png"}
                                        alt="Bootstrap" style={{width: "220px", height: "auto"}}/>
                                </a>
                            </div>
                            <div className={"col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center"}>
                                <form className="d-flex w-100" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Nhập từ khóa tìm kiếm ..."
                                           aria-label="Search"/>
                                    <button className="btn bg-danger px-4" type="submit">
                                        <i className="bi bi-search" style={{color: "white"}}></i>
                                    </button>
                                </form>
                            </div>
                            <div className={"d-none d-lg-block col-lg-3 col-xl-3 d-flex justify-content-end align-items-center"}>
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <a className="nav-link px-3 py-0" aria-current="page" href="#">
                                            <div
                                                className={"d-flex flex-column justify-content-center align-items-center"}>
                                                <i className="bi bi-cart-fill"
                                                   style={{fontSize: "20px", color: ICON_GRAY}}></i>
                                                <span style={{fontSize: "14px", color: ICON_GRAY}}>Giỏ Hàng</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link p-3 py-0" aria-current="page" href="#">
                                            <div
                                                className={"d-flex flex-column justify-content-center align-items-center"}>
                                                <i className="bi bi-person-fill"
                                                   style={{fontSize: "20px", color: ICON_GRAY}}></i>
                                                <span style={{fontSize: "14px", color: ICON_GRAY}}>Tài Khoản</span>
                                            </div>
                                        </a>
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