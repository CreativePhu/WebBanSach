import axios from "axios";
import BookImageInf from "../../data_type/Product/BookImageInf";

export const GetBookImageByIdAPI = async (bookId: number):Promise<BookImageInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/books/${bookId}/bookImages`);
    return response.data._embedded.bookImages;
}