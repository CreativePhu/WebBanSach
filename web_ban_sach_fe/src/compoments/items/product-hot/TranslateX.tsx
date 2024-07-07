import React from "react";
import BookProduct from "../Book";
import BookInf from "../../data_type/Product/BookInf";
import {GetTop10BookNewAPI} from "../../api/Product";

const TranslateX: React.FC = () => {

    const [listBook, setListBook] = React.useState<BookInf[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>("");

    // tinh so trang
    const page = listBook.length % 5 !== 0 ? Math.floor(listBook.length / 5) + 1 : listBook.length / 5;

    // trang hien tai
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    // tham chieu den div chua san pham hot
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = React.useState<number>(0);

    // fetch list book
    const fetchListBook = async () => {
        try {
            const response: BookInf[] = await GetTop10BookNewAPI();
            setListBook(response)
            setLoading(false)
        } catch (e: any) {
            setLoading(false)
            setError(e.message)
        }
    }

    React.useEffect(() => {
        fetchListBook()
            .then(() => {
                return
            })
            .catch((e) => setError(e.message))
    }, [])

    // xu ly su kien click scroll san pham hot sang trai
    const handleRightButtonClick = () => {
        if (scrollContainerRef.current) {
            setScrollPosition(scrollPosition + (scrollContainerRef.current.offsetWidth + 10));
            if (currentPage < page) {
                setCurrentPage(currentPage + 1);
            }
        }
    }

    // xu ly su kien click scroll san pham hot sang phai
    const handleLeftButtonClick = () => {
        if (scrollContainerRef.current) {
            setScrollPosition(scrollPosition - (scrollContainerRef.current.offsetWidth + 10));
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    }

    return (
        <div className={"container mt-4 p-0 position-relative"}>
            <div className={"overflow-x-scroll hidden-scrollbar"}>
                <div ref={scrollContainerRef}
                     className={"d-flex flex-row transition-product-hot"}
                     style={{transform: `translateX(-${scrollPosition}px)`}}>
                    {
                        loading ? (
                            <div className={"mt-4 w-100 d-flex justify-content-center"}>
                                <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : error ? (
                            <div className={"alert alert-danger mt-4 w-100 d-flex justify-content-center"} role="alert">
                                {error}
                            </div>
                        ) : listBook.length === 0 ? (
                            <div className={"alert alert-warning mt-4 w-100 d-flex justify-content-center"}
                                 role="alert">
                                Không có sản phẩm nào
                            </div>
                        ) : (
                            listBook.map((book, index) => (
                                <BookProduct key={index} book={book} width={"250px"}/>
                            ))
                        )
                    }
                </div>
            </div>
            {
                !loading && !error && listBook.length > 5 && (
                    <>
                        <div
                            onClick={handleRightButtonClick}
                            className={"rounded-circle " +
                                "bg-white " +
                                "position-absolute top-50 start-100 " +
                                "translate-middle " +
                                "d-none d-xxl-flex justify-content-center align-items-center " +
                                "cussor-pointer " +
                                "shadow p-3 mb-5 bg-body-tertiary " +
                                "rounded " +
                                `${currentPage === page ? "d-xxl-none" : ""}`
                            }
                            style={{width: "40px", height: "40px"}}>
                            <i className="bi bi-chevron-right fs-5"></i>
                        </div>

                        {/*nut scroll sang phai*/}
                        <div
                            onClick={handleLeftButtonClick}
                            className={"rounded-circle " +
                                "bg-white " +
                                "position-absolute top-50 start-0 translate-middle " +
                                "translate-middle " +
                                "d-none d-xxl-flex justify-content-center " +
                                "align-items-center " +
                                "cussor-pointer " +
                                "shadow p-3 mb-5 bg-body-tertiary " +
                                "rounded " +
                                `${currentPage === 1 ? "d-xxl-none" : ""}`
                            }
                            style={{width: "40px", height: "40px"}}>
                            <i className="bi bi-chevron-left"></i>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default TranslateX;