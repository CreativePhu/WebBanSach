import axios from 'axios';
import BookInf from "../../data_type/Product/BookInf";

const GetBooksByPage = async (size: number, page: number):Promise<BookInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/books?sort=bookID,desc&size=${size}&page=${page}`);
    return response.data._embedded.books;
}

export default GetBooksByPage;