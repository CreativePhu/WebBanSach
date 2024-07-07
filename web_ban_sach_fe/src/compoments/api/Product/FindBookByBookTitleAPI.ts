import axios from "axios";
import BookInf from "../../data_type/Product/BookInf";

export const FindBookByBookTitleAPI = async (bookTitle: string | null, page: number, pagesize: number):Promise<BookInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/books/search/findByBookTitleIsContainingIgnoreCase?bookTitle=${bookTitle}&page=${page}&size=${pagesize}`);
    return response.data._embedded.books;
}