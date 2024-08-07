import axios from "axios";
import BookInf from "../../data_type/Product/BookInf";

export const GetTop10BookNewAPI = async ():Promise<BookInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/books?sort=bookID,desc&size=10`);
    return response.data._embedded.books;
}