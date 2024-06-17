import AuthorInf from "./AuthorInf";
import CategoryInf from "./CategoryInf";
import BookImageInf from "./BookImageInf";

interface BookDetailInf {
    bookId: string;
    bookTitle: string;
    bookPrice: number;
    bookDescription: string;
    bookISBN: string;
    bookAuthor: AuthorInf[];
    bookCategory: CategoryInf[];
    bookImage: BookImageInf[];
    bookDiscount: number;
}

export default BookDetailInf;