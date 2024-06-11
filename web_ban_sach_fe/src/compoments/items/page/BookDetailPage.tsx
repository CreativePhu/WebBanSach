import React from "react";
import BookImageInf from "../../data_type/BookImageInf";
import BookInf from "../../data_type/BookInf";
import {useSearchParams} from "react-router-dom";
import GetBookById from "../../api/GetBookById";
import GetBookImageById from "../../api/GetBookImageById";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AuthorInf from "../../data_type/AuthorInf";
import GetAuthorByBookId from "../../api/GetAuthorByBookId";
import CategoryInf from "../../data_type/CategoryInf";
import GetCategoryByBookID from "../../api/GetCategoryByBookID";
import PublisherInf from "../../data_type/PublisherInf";
import GetPublisherByBookID from "../../api/GetPublisherByBookID";

const BookDetailPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const bookId = searchParams.get('bookId');

    const [bookImages, setBookImages] = React.useState<BookImageInf[]>([]);
    const [bookDetail, setBookDetail] = React.useState<BookInf | null>(null);
    const [bookAuthor, setBookAuthor] = React.useState<AuthorInf[]>([]);
    const [bookCategory, setBookCategory] = React.useState<CategoryInf[]>([]);
    const [bookCount, setBookCount] = React.useState<number>(1);
    const [bookPublisher, setBookPublisher] = React.useState<PublisherInf | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);


    const fetchBookImages = async () => {
        if (bookId) {
            try {
                setLoading(true)
                const book = await GetBookById(bookId);
                const images = await GetBookImageById(Number(bookId));
                const authors = await GetAuthorByBookId(Number(bookId));
                const categories = await GetCategoryByBookID(Number(bookId));
                const publisher = await GetPublisherByBookID(Number(bookId));
                setBookDetail(book);
                setBookImages(images);
                setBookAuthor(authors);
                setBookCategory(categories);
                setBookPublisher(publisher);
                setLoading(false)
            } catch (e: any) {
                setLoading(false)
                setError("Sách không tồn tại !")
            }
        }
    }

    React.useEffect(() => {
        fetchBookImages()
    }, [])

    // chuyen so tien sang dang tien te VND
    function formatCurrencyVND(amount: number): string {
        return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    }

    // tang so luong sach
    const addBookCount = (e: any) => {
        setBookCount(bookCount + 1)
    }

    // giam so luong sach
    const subBookCount = (e: any) => {
        if (bookCount > 1) {
            setBookCount(bookCount - 1)
        }
    }

    if (loading) {
        return (
            <div className={"container"}>
                <div className={"d-flex justify-content-center align-items-center"} style={{height: "100vh"}}>
                    <div className={"spinner-border"} role={"status"}>
                        <span className={"visually-hidden"}>Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={"container"}>
                <div className={"d-flex justify-content-center align-items-center"} style={{height: "100vh"}}>
                    <p className={"fs-3 text-danger"}>{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={"container-fluid bg-light py-4"}>
            <div className={"container rounded bg-white"}>
                <div className={"row py-4 px-4"}>
                    <div className={"col-12 col-lg-4 col-sm-12 border"}>
                        <Carousel>
                            {bookImages.map((bookImage: BookImageInf) => (
                                <div key={bookImage.bookImageID}>
                                    <img src={bookImage.bookImage} alt={"anh san pham"}/>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className={"col-12 ps-5 mt-sm-3 col-sm-12 col-lg-8"}>
                        <p className={"fs-4"}>{bookDetail?.bookTitle}</p>
                        <div className={"row mt-3"}>
                            <div className={"col-12 col-lg-6"}>
                                <span className={"fs-5 fw-bold"}>Nhà xuất bản: </span>
                                <span className={"fs-6"}>{bookPublisher?.publisherName}</span>
                                <span
                                    className={"fs-5 d-block text-danger fw-bold fs-3"}>Giá: {formatCurrencyVND(bookDetail?.bookPrice ? bookDetail.bookPrice : 1000)}</span>
                                <span className={"fs-5 d-block fw-bold"}>Số lượng:</span>
                                <div className={"d-flex mt-2"}>
                                    <button onClick={subBookCount} className={"btn btn-light fw-bold fs-4 px-4"}>-
                                    </button>
                                    <input type={"number"} className={"form-control w-25 fs-5 text-center"}
                                           value={bookCount}
                                           onChange={(e) => setBookCount(Number(e.target.value))}/>
                                    <button onClick={addBookCount} className={"btn btn-light fw-bold fs-4 px-4"}>+
                                    </button>
                                </div>
                            </div>
                            <div className={"col-6"}>
                                <span className={"fs-5 fw-bold"}>Tác giả:</span>
                                <ul>
                                    {bookAuthor.map((author: AuthorInf) => (
                                        <li key={author.authorID}>{author.authorName}</li>
                                    ))}
                                </ul>
                                <span className={"fs-5 fw-bold"}>Thể loại:</span>
                                <ul>
                                    {bookCategory.map((category: CategoryInf) => (
                                        <li key={category.categoryID}>{category.categoryName}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={"col-12 mt-3"}>
                                <span className={"fs-5 fw-bold"}>Mô tả sách:</span>
                                <p className={"fs-6"}>{bookDetail?.bookDescription}</p>
                            </div>
                            <div className={"col-12 d-flex justify-content-start d-sm-block justify-sm-content-start"}>
                                <button className={"btn btn-primary fw-bold fs-4 px-4"}>Thêm vào giỏ hàng</button>
                                <button className={"btn btn-danger fw-bold fs-4 px-4 ms-3"}>Mua ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetailPage;