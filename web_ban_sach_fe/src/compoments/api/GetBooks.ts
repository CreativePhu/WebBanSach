import axios from 'axios';
import BookInf from "../../data_type/BookInf";

const GetBooks = async ():Promise<BookInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const books:BookInf[] = [];
    const response = await axios.get(`${HOST}/books`);
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

export default GetBooks;