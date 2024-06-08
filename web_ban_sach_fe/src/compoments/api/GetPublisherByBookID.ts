import axios from "axios";
import BookInf from "../../data_type/BookInf";
import AuthorInf from "../../data_type/AuthorInf";
import PublisherInf from "../../data_type/PublisherInf";

const GetAuthorByBookID = async (bookId: number):Promise<PublisherInf> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/publishers/search/findByBooksBookID?bookId=${bookId}`);
    const data:PublisherInf = response.data;
    return data;
};

export default GetAuthorByBookID;