import React from "react";
import BookInf from "../../../data_type/Product/BookInf";
import BookProduct from "../../Book";
import {useSearchParams} from "react-router-dom";
import {FindBookByBookTitleAPI} from "../../../api/Product/FindBookByBookTitleAPI";

const SearchPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const bookTitle = searchParams.get('bookTitle');

    const [listBook, setListBook] = React.useState<BookInf[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>("")
    const [page, setPage] = React.useState<number>(0)
    const pageSize: number = 15
    const [hasMore, setHasMore] = React.useState<boolean>(true)
    const [isChangeBookTitle, setIsChangeBookTitle] = React.useState<boolean>(false)

    const fetchListBook = async (): Promise<void> => {
        try {
            setLoading(true)
            const listBookReq: BookInf[] = await FindBookByBookTitleAPI(bookTitle, page, pageSize)
            setListBook([...listBook, ...listBookReq])
            setLoading(false)
            if (listBook.length === 0) {
                setHasMore(false)
            }
        } catch (e: any) {
            setLoading(false)
            setError(e.message)
        }
    }

    // khi scroll xuong cuoi trang thi se fetch du lieu
    const handleScroll = (): void => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
        if (hasMore) {
            setPage(prevState => prevState + 1)
        }
    }

    // khi page thay doi thi se fetch lai du lieu
    React.useEffect(() => {
        fetchListBook()
            .then(() => {
                return
            })
            .catch((e) => setError(e.message))
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [page])

    // khi thay doi ten sach thi se cap nhat lai cac trang thai
    React.useLayoutEffect(() => {
        setListBook([]);
        setPage(0);
        setHasMore(true);
        setIsChangeBookTitle(true);
    }, [bookTitle]);

    // doi cac trang thai sau khi thay doi ten sach duoc cap nhat lai se chay useEffect nay
    React.useEffect(() => {
        if (isChangeBookTitle) {
            fetchListBook()
                .then(() => {
                    return
                })
                .catch((e) => setError(e.message))
            setIsChangeBookTitle(false);
        }
    }, [isChangeBookTitle]);


    return (
        <div id={"list-book"} className={"container bg-white rounded mt-4 px-sm-0"}>
            <h2>{`Kết quả tìm kiếm với tên sách là: ${bookTitle}`}</h2>
            <div className={"d-flex align-items-center py-2 border-bottom"}>
                <i className="bi bi-collection-fill fs-2 text-danger"></i>
                <span className={"fs-4 fw-bold ms-3 text-danger"}>Danh sách sản phẩm cần tìm</span>
            </div>
            {
                <div className={"py-4 px-2 d-flex flex-wrap justify-content-around justify-content-xl-start"}>
                    {
                        listBook.map((book, index) => {
                            return (
                                <BookProduct key={index} book={book} width={"240px"} isHover={true} className={"me-sm-0 mx-xl-3 mx-xxl-0 me-xxl-3"}/>
                            )
                        })
                    }
                    {
                        loading ? (
                            <div className={"d-flex justify-content-center mt-4 w-100"}>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : error ? (
                            <div className={"d-flex justify-content-center alert alert-danger mt-4 w-100"} role="alert">
                                {error}
                            </div>
                        ) : listBook.length === 0 ? (
                            <div className={"d-flex justify-content-center alert alert-warning mt-4 w-100"}
                                 role="alert">
                                Không có sản phẩm nào
                            </div>
                        ) : null
                    }
                </div>
            }
        </div>
    )
}

export default SearchPage;