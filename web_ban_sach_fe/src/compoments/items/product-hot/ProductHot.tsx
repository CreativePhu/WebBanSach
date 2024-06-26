import React from "react";
import TranslateX from "./TranslateX";

const ProductHot: React.FC = () => {

    return (
        <div id={"book-hot"} className={"container-fluid mt-4 py-4"}
             style={{minHeight: "450px", background: "url(/images/background/flash_sale.png) no-repeat center center", backgroundColor: "#ff6c6b"}}>
            <div className={"container d-flex justify-content-between align-items-center py-1 px-3 bg-white rounded-3"}>
                <span className={"d-flex flex-row align-items-center"}>
                    <i className="bi bi-journal-bookmark-fill fs-2 text-danger"></i>
                    <span className={"ms-2 fs-4 fw-bold text-danger"}>Sách mới</span>
                </span>
                <a className={"d-flex justify-content-center align-items-center"} style={{textDecoration: "none"}}
                   href={"#"}>
                    <span className={"fw-bold"}>Xem tất cả</span>
                    <i className="bi bi-chevron-right fs-4"></i>
                </a>
            </div>
            <TranslateX />
        </div>
    )
}

export default ProductHot;