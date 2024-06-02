import React from "react";
import Book from "../../data_type/Book";
import BookProduct from "../Book";
import TranslateX from "./TranslateX";

interface ProductHotProps {
    imageBackground: string;
    listBook: Book[];
}

const ProductHot: React.FC<ProductHotProps> = ({imageBackground, listBook}) => {

    return (
        <div id={"product-hot"} className={"container-fluid mt-4 py-4"}
             style={{minHeight: "450px", background: `url(${imageBackground}) no-repeat center center`, backgroundColor: "#ff6c6b"}}>
            <div className={"container d-flex justify-content-between align-items-center py-1 px-3 bg-white rounded-3"}>
                <span className={"d-flex flex-row align-items-center"}>
                    <i className="bi bi-bookmark-fill fs-2" style={{color: "red"}}></i>
                    <span className={"ms-2 fs-3 fw-bold"}>Sản phẩm nổi bật</span>
                </span>
                <a className={"d-flex justify-content-center align-items-center"} style={{textDecoration: "none"}}
                   href={"#"}>
                    <span className={"fw-bold"}>Xem tất cả</span>
                    <i className="bi bi-chevron-right fs-4"></i>
                </a>
            </div>
            <TranslateX listBook={listBook} />
        </div>
    )
}

export default ProductHot;