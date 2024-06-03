import React from "react";
import Book from "../../data_type/Book";
import BookProduct from "../items/Book";

interface ListBookProps {
    listBook: Book[];
}

const ListBook: React.FC<ListBookProps> = ({listBook}) => {
    return (
        <div id={"list-book"} className={"container bg-white rounded mt-4"}>
            <div className={"d-flex align-items-center px-2 py-2 border-bottom"}>
                <i className="bi bi-collection-fill fs-2 text-danger"></i>
                <span className={"fs-4 fw-bold ms-3 text-danger"}>Danh sách sản phẩm</span>
            </div>
            <div className={"py-4 px-2 d-flex justify-content-around flex-wrap"}>
                {
                    listBook.map((book, index) => {
                        return (
                            <BookProduct key={index} book={book}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ListBook;