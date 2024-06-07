import React from "react";
import BookInf from "../../data_type/BookInf";
import BookProduct from "../items/Book";
import FindBookByBookTitle from "../api/FindBookByBookTitle";
import {useSearchParams} from "react-router-dom";

const SearchPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const bookTitle = searchParams.get('bookTitle');

    const [listBook, setListBook] = React.useState<BookInf[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>("")
    const [page, setPage] = React.useState<number>(0)
    const pageSize:number = 12
    const [hasMore, setHasMore] = React.useState<boolean>(true)

    const fetchListBook = async ():Promise<void> => {
        try {
            setLoading(true)
            const listBookReq: BookInf[] = await FindBookByBookTitle(bookTitle, page, pageSize)
            setListBook([...listBook, ...listBookReq])
            setLoading(false)
            if(listBook.length === 0) {
                setHasMore(false)
            }
        } catch (e:any) {
            setLoading(false)
            setError(e.message)
        }
    }

    const handleScroll = ():void => {
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
        if(hasMore) {
            setPage(prevState => prevState + 1)
        }
    }

    React.useLayoutEffect(() => {
        fetchListBook()
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [page])


    React.useLayoutEffect(() => {
        setListBook([]);
        setPage(0);
        setHasMore(true);
    }, [bookTitle]);


    React.useLayoutEffect(() => {
        const fetchListBookNew = async () => {
            await fetchListBook();
        }
        fetchListBookNew();
    }, [bookTitle]);


    return (
        <div id={"list-book"} className={"container bg-white rounded mt-4"}>
            <h2>{`Kết quả tìm kiếm với tên sách là: ${bookTitle}`}</h2>
            <div className={"d-flex align-items-center px-2 py-2 border-bottom"}>
                <i className="bi bi-collection-fill fs-2 text-danger"></i>
                <span className={"fs-4 fw-bold ms-3 text-danger"}>Danh sách sản phẩm cần tìm</span>
            </div>
            {
                <div className={"py-4 px-2 d-flex justify-content-around flex-wrap"}>
                    {
                        listBook.map((book, index) => {
                            return (
                                <BookProduct key={index} book={book}/>
                            )
                        })
                    }
                    {
                        loading && (
                            <div className={"d-flex justify-content-center mt-4 w-100"}>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                        ||
                        error && (
                            <div className={"d-flex justify-content-center alert alert-danger mt-4 w-100"} role="alert">
                                {error}
                            </div>
                        )
                        ||
                        listBook.length === 0 &&
                        <div className={"d-flex justify-content-center alert alert-warning mt-4 w-100"} role="alert">
                            Không có sản phẩm nào
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default SearchPage;