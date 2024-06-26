import axios from "axios";
import AuthorInf from "../../data_type/Product/AuthorInf";

const GetAuthorByBookID = async (bookId: number):Promise<AuthorInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/authors/search/findByBooksBookID?bookID=${bookId}`);
    return response.data._embedded.authors;
};

export default GetAuthorByBookID;