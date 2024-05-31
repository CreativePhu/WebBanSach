import React from 'react';
import {iconGray} from "../colors";

function Navbar() {
    return (
        <div className="container-fluid py-2" style={{backgroundColor: "white"}}>
            <div className={"container"}>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className={"row w-100"}>
                            <div className={"col-3 d-flex align-items-center"}>
                                <a className="navbar-brand" href="#">
                                    <img
                                        src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
                                        alt="Bootstrap" style={{width: "220px", height: "auto"}}/>
                                </a>
                            </div>
                            <div className={"col-6 d-flex justify-content-center"}>
                                <form className="d-flex w-100" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search"
                                           aria-label="Search"/>
                                    <button className="btn bg-danger px-4" type="submit">
                                        <i className="bi bi-search" style={{color: "white"}}></i>
                                    </button>
                                </form>
                            </div>
                            <div className={"col-3 d-flex align-items-center"}>
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <a className="nav-link px-3 py-0" aria-current="page" href="#">
                                            <div
                                                className={"d-flex flex-column justify-content-center align-items-center"}>
                                                <i className="bi bi-cart-fill"
                                                   style={{fontSize: "20px", color: iconGray}}></i>
                                                <span style={{fontSize: "14px", color: iconGray}}>Giỏ Hàng</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link p-3 py-0" aria-current="page" href="#">
                                            <div
                                                className={"d-flex flex-column justify-content-center align-items-center"}>
                                                <i className="bi bi-person-fill"
                                                   style={{fontSize: "20px", color: iconGray}}></i>
                                                <span style={{fontSize: "14px", color: iconGray}}>Tài Khoản</span>
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