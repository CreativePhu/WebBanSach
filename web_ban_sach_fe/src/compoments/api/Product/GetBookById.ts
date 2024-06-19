import axios from "axios";
import BookInf from "../../data_type/Product/BookInf";

const FindBookByBookTitle = async (bookId: number):Promise<BookInf> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/books/${bookId}`);
    return response.data;
};

export default FindBookByBookTitle;