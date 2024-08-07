import React from "react";
import BookInf from "../../data_type/Product/BookInf";
import BookProduct from "../Book";
import {GetBooksByPageAPI} from "../../api/Product";

const ListBook: React.FC = () => {

    const [listBook, setListBook] = React.useState<BookInf[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>("")
    const [page, setPage] = React.useState<number>(0)
    const pageSize:number = 15
    const [hasMore, setHasMore] = React.useState<boolean>(true)
    const [windowHeight, setWindowHeight] = React.useState<number>(window.innerHeight);

    React.useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchListBook = async ():Promise<void> => {
        try {
            setLoading(true)
            const listBook: BookInf[] = await GetBooksByPageAPI(pageSize,page);
            setListBook(prevState => [...prevState, ...listBook])
            setLoading(false)
            if(listBook.length === 0) setHasMore(false)
        } catch (e:any) {
            setLoading(false)
            setError(e.message)
        }
    }

    const handleScroll = (): void => {
        if (windowHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (hasMore) setPage(prevState => prevState + 1)
    };

    React.useLayoutEffect(() => {
        fetchListBook()
            .then(() => {return})
            .catch((e) => {
                console.log(e)
            })
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [page, hasMore])

    return (
        <div id={"list-book"} className={"container-fluid container-lg bg-white rounded shadow-sm mt-4"}>
            <div className={"d-flex align-items-center px-2 py-2 border-bottom"}>
                <i className="bi bi-collection-fill fs-2 text-danger"></i>
                <span className={"fs-4 fw-bold ms-3 text-danger"}>Danh sách sản phẩm</span>
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
                            <div className={"d-flex justify-content-center alert alert-warning mt-4 w-100"} role="alert">
                                Không có sản phẩm nào
                            </div>
                        ) : null
                    }
                </div>
            }
        </div>
    )
}

export default ListBook;