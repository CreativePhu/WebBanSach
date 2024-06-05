import React from "react";
import BookInf from "../../data_type/BookInf";
import BookProduct from "../items/Book";
import GetBooks from "../api/GetBooks";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const ListBook: React.FC = () => {

    const [listBook, setListBook] = React.useState<BookInf[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>("")

    const fetchListBook = async () => {
        try {
            const listBook: BookInf[] = await GetBooks();
            setListBook(listBook)
            setLoading(false)
        } catch (e:any) {
            setLoading(false)
            setError(e.message)
        }
    }

    React.useLayoutEffect(() => {
        fetchListBook()
    }, [])

    return (
        <div id={"list-book"} className={"container bg-white rounded mt-4"}>
            <div className={"d-flex align-items-center px-2 py-2 border-bottom"}>
                <i className="bi bi-collection-fill fs-2 text-danger"></i>
                <span className={"fs-4 fw-bold ms-3 text-danger"}>Danh sách sản phẩm</span>
            </div>
            {
                loading && (
                    <div className={"d-flex justify-content-center mt-4"}>
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
                ||
                error && (
                    <div className={"d-flex justify-content-center alert alert-danger mt-4"} role="alert">
                        {error}
                    </div>
                )
                ||
                listBook.length === 0 &&
                <div className={"d-flex justify-content-center alert alert-warning mt-4"} role="alert">
                    Không có sản phẩm nào
                </div>
                ||
                <div className={"py-4 px-2 d-flex justify-content-around flex-wrap"}>
                    {
                        listBook.map((book, index) => {
                            return (
                                <BookProduct key={index} book={book}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default ListBook;