import React from "react";
import Book from "../../data_type/Book";

interface BookProps {
    book: Book
}

const BookProduct : React.FC<BookProps> = ({book}) => {

    // chuyen so tien sang dang tien te VND
    function formatCurrencyVND(amount: number): string {
        return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    }

    return (
        <div className="card me-3 flex-grow-0 flex-shrink-0 my-3"
             style={{flexBasis: "auto", width: "calc(95%/5)"}}>
            <div className={"w-100 mt-3 d-flex justify-content-center align-items-center"}
                 style={{height: "190px"}}>
                <a href={"#"}>
                    <img src={book.image} className="card-img-top" alt="..."
                         style={{maxWidth: "190px", maxHeight: "100%"}}/>
                </a>
            </div>
            <div className="card-body">
                <a href={"#"} className="card-title d-block mb-3"
                   style={{textDecoration: "none"}}>{book.title}
                </a>
                <div
                    className="card-text fw-bold text-danger">{formatCurrencyVND(book.price - (book.price * book.discount))}
                    <span
                        className="badge bg-danger py-2 ms-2">{book.discount * 100}%</span>
                </div>
                <span
                    className={"text-decoration-line-through text-secondary"}>{formatCurrencyVND(book.price)}</span>
            </div>
        </div>
    )
}

export default BookProduct;