import axios from "axios";
import BookInf from "../../data_type/BookInf";
import bookInf from "../../data_type/BookInf";

const FindBookByBookTitle = async (bookId: string):Promise<BookInf|null> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/books/${bookId}`);
    const data:bookInf = response.data;
    return data;
};

export default FindBookByBookTitle;