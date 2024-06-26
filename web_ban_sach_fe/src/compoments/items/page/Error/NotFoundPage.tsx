import React from "react";
import {Link} from "react-router-dom";

export const NotFoundPage: React.FC = () => {
    return (
        <div className={"container-fluid d-flex flex-column justify-content-center align-items-center bg-light py-5"} style={{minHeight: "600px"}}>
            <h1 className={"text-danger fs-1"}>404 NOT FOUND</h1>
            <Link to={"/"} className={"text-decoration-underline text-danger fs-4"}>Quay lại trang chủ</Link>
        </div>
    )
}