import BookDetailInf from "../../data_type/Product/BookDetailInf";
import {
    FindBookByBookIdAPI,
    GetAuthorByBookIdAPI,
    GetBookImageByIdAPI,
    GetCategoryByBookIdAPI
} from "../../api/Product";

export const GetBookDetailById = async (bookID: number): Promise<BookDetailInf> => {
    const book = await FindBookByBookIdAPI(bookID);
    const bookAuthor = await GetAuthorByBookIdAPI(bookID);
    const bookCategory = await GetCategoryByBookIdAPI(bookID);
    const bookImage = await GetBookImageByIdAPI(bookID);
    const bookDiscount = 10;

    return {
        bookId: book.bookID,
        bookTitle: book.bookTitle,
        bookPrice: book.bookPrice,
        bookDescription: book.bookDescription,
        bookISBN: book.bookISBN,
        bookAuthor: bookAuthor,
        bookCategory: bookCategory,
        bookImage: bookImage,
        bookDiscount: bookDiscount
    }
}