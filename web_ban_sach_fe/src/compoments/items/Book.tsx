import React from "react";
import BookInf from "../data_type/Product/BookInf";
import BookImageInf from "../data_type/Product/BookImageInf";
import {Link} from "react-router-dom";
import formatCurrencyVND from "./function/FormatCurrencyVND";
import {GetBookImageByIdAPI} from "../api/Product";

interface BookProps {
    book: BookInf
    width?: string
    height?: string
    isHover?: boolean
    className?: string
}

const BookProduct: React.FC<BookProps> = ({book, width, height, isHover, className}) => {

    const [isPrimaryImage, setIsPrimaryimage] = React.useState<string | undefined>("")
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>("")
    const [hover, setHover] = React.useState<boolean>(false)

    const fetchListImage = async () => {
        try {
            const listImage: BookImageInf[] = await GetBookImageByIdAPI(book.bookID);
            const primaryImage = listImage.find((image) => image?.primary === true)
            setIsPrimaryimage(primaryImage?.bookImage || "")
            setLoading(false)
        } catch (e: any) {
            setLoading(false)
            setError(e.message)
        }
    }

    React.useLayoutEffect(() => {
        fetchListImage()
            .then(() => {
                return
            })
            .catch((e) => setError(e.message))
    }, [])

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`card flex-grow-0 flex-shrink-0 mb-3 me-4 mx-0 me-lg-3 border-0 ${isHover && hover ? "shadow" : "shadow-sm"} ${className}`}
             style={{flexBasis: "auto", width: `${width ? width : "250px"}`, boxSizing: "border-box"}}>
            <div className={"w-100 mt-3 d-flex justify-content-center align-items-center"}
                 style={{height: `${height ? height : "190px"}`}}>
                {
                    loading ? (
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : error ? (
                        <div className={"alert alert-danger mt-4"} role="alert">
                            {error}
                        </div>
                    ) : (
                        <Link className={"mt-3"} to={`/book-detail?bookId=${book.bookID}`}>
                            <img src={isPrimaryImage} className="card-img-top" alt={`${book.bookTitle}`}
                                 style={{maxWidth: "190px", maxHeight: "100%"}}/>
                        </Link>
                    )
                }
            </div>
            <div className="card-body">
                <Link to={`/book-detail?bookId=${book.bookID}`} className="card-title d-block mb-3 fw-semibold"
                      style={{textDecoration: "none"}}>{book.bookTitle}
                </Link>
                <div
                    className="card-text fw-semibold text-danger">{formatCurrencyVND(book.bookPrice - (book.bookPrice * 0.1))}
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