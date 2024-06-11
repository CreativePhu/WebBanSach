import axios from "axios";
import BookInf from "../data_type/BookInf";

const GetTop10BookNew = async ():Promise<BookInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const books:BookInf[] = [];
    const response = await axios.get(`${HOST}/books?sort=bookID,desc&size=10`);
    const data:BookInf[] = response.data._embedded.books;

    data.forEach((book:BookInf) => {
        books.push({
            bookID: book.bookID,
            bookTitle: book.bookTitle,
            bookPrice: book.bookPrice,
            bookDescription: book.bookDescription,
            bookISBN: book.bookISBN,
        });
    });

    return books;
}

export default GetTop10BookNew;