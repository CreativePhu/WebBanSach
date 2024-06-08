import React from "react";
import BookInf from "../../data_type/BookInf";
import BookImageInf from "../../data_type/BookImageInf";
import GetBookImageById from "../api/GetBookImageById";
import {Link} from "react-router-dom";

interface BookProps {
    book: BookInf
}

const BookProduct : React.FC<BookProps> = ({book}) => {

    const [isPrimaryImage, setIsPrimaryimage] = React.useState<string|undefined>("")
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>("")

    const fetchListImage = async () => {
        try {
            const listImage: BookImageInf[] = await GetBookImageById(book.bookID);
            const primaryImage = listImage.find((image) => image.primary === true)
            setIsPrimaryimage(primaryImage?.bookImage || "")
            setLoading(false)
        } catch (e:any) {
            setLoading(false)
            setError(e.message)
        }
    }

    React.useLayoutEffect(() => {
        fetchListImage()
    }, [])

    // chuyen so tien sang dang tien te VND
    function formatCurrencyVND(amount: number): string {
        return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    }

    return (
        <div className="card me-3 flex-grow-0 flex-shrink-0 my-3"
             style={{flexBasis: "auto", width: "250px"}}>
            <div className={"w-100 mt-3 d-flex justify-content-center align-items-center"}
                 style={{height: "190px"}}>
                {
                    loading && (
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )
                    ||
                    error && (
                        <div className={"alert alert-danger mt-4"} role="alert">
                            {error}
                        </div>
                    )
                    ||
                    <Link to={`/book-detail?bookId=${book.bookID}`}>
                        <img src={isPrimaryImage} className="card-img-top" alt={`${book.bookTitle}`}
                             style={{maxWidth: "190px", maxHeight: "100%"}}/>
                    </Link>
                }
            </div>
            <div className="card-body">
                <Link to={`/book-detail?bookId=${book.bookID}`} className="card-title d-block mb-3"
                      style={{textDecoration: "none"}}>{book.bookTitle}
                </Link>
                <div
                    className="card-text fw-bold text-danger">{formatCurrencyVND(book.bookPrice - (book.bookPrice * 0.1))}
                    <span
                        className="badge bg-danger py-2 ms-2">{0.1 * 100}%</span>
                </div>
                <span
                    className={"text-decoration-line-through text-secondary"}>{formatCurrencyVND(book.bookPrice)}</span>
            </div>
        </div>
    )
}

export default BookProduct;