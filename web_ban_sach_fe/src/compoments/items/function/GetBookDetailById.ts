import GetBookById from "../../api/Product/GetBookById";
import BookDetailInf from "../../data_type/Product/BookDetailInf";
import GetAuthorByBookId from "../../api/Product/GetAuthorByBookId";
import GetCategoryByBookID from "../../api/Product/GetCategoryByBookID";
import GetBookImageById from "../../api/Product/GetBookImageById";

export const GetBookDetailById = async (bookID: number): Promise<BookDetailInf> => {
    const book = await GetBookById(bookID);
    const bookAuthor = await GetAuthorByBookId(bookID);
    const bookCategory = await GetCategoryByBookID(bookID);
    const bookImage = await GetBookImageById(bookID);
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