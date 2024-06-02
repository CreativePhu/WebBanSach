import React from "react";
import BookProduct from "../Book";
import Book from "../../data_type/Book";

interface TranslateXProps {
    listBook: Book[];
}

const TranslateX:React.FC<TranslateXProps> = ({listBook}) => {

    // tinh so trang
    const page = listBook.length%5 !== 0 ? Math.floor(listBook.length/5) + 1 : listBook.length/5;

    // trang hien tai
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    // tham chieu den div chua san pham hot
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = React.useState<number>(0);

    // xu ly su kien click scroll san pham hot sang trai
    const handleRightButtonClick = () => {
        if (scrollContainerRef.current) {
            setScrollPosition(scrollPosition + scrollContainerRef.current.offsetWidth);
            if (currentPage < page) {
                setCurrentPage(currentPage + 1);
            }
        }
    }

    // xu ly su kien click scroll san pham hot sang phai
    const handleLeftButtonClick = () => {
        if (scrollContainerRef.current) {
            setScrollPosition(scrollPosition - scrollContainerRef.current.offsetWidth);
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    }

    return (
        <div className={"container mt-4 p-0 position-relative"}>
            <div className={"overflow-hidden"}>
                <div ref={scrollContainerRef} className={"d-flex flex-row transition-product-hot"}
                     style={{transform: `translateX(-${scrollPosition > 0 ? scrollPosition + 13 : scrollPosition}px)`}}>
                    {
                        listBook.map((book, index) => {
                            return (
                                <BookProduct key={index} book={book}/>
                            )
                        })
                    }
                </div>
            </div>

            {/*nut scroll sang trai*/}
            <div
                onClick={handleRightButtonClick}
                className={"rounded-circle " +
                    "bg-white " +
                    "position-absolute top-50 start-100 " +
                    "translate-middle " +
                    "d-flex justify-content-center align-items-center " +
                    "cussor-pointer " +
                    "shadow p-3 mb-5 bg-body-tertiary " +
                    "rounded " +
                    `${currentPage === page ? "d-none" : ""}`
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
                    "d-flex justify-content-center " +
                    "align-items-center " +
                    "cussor-pointer " +
                    "shadow p-3 mb-5 bg-body-tertiary " +
                    "rounded " +
                    `${currentPage === 1 ? "d-none" : ""}`
                }
                style={{width: "40px", height: "40px"}}>
                <i className="bi bi-chevron-left"></i>
            </div>
        </div>
    )
}

export default TranslateX;