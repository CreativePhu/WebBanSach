import axios from "axios";
import BookInf from "../../data_type/Product/BookInf";

const FindBookByBookTitle = async (bookTitle: string | null, page: number, pagesize: number):Promise<BookInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const books: BookInf[] = [];
    const response = await axios.get(`${HOST}/books/search/findByBookTitleIsContainingIgnoreCase?bookTitle=${bookTitle}&page=${page}&size=${pagesize}`);
    const data:BookInf[] = response.data._embedded.books;

    data.forEach((book: BookInf) => {
        books.push({
            bookID: book.bookID,
            bookTitle: book.bookTitle,
            bookPrice: book.bookPrice,
            bookDescription: book.bookDescription,
            bookISBN: book.bookISBN,
        });
    });

    return books;
};

export default FindBookByBookTitle;