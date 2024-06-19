import axios from "axios";
import CategoryInf from "../../data_type/Product/CategoryInf";

const GetAuthorByBookID = async (bookId: number):Promise<CategoryInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/categories/search/findByBooksBookID?bookID=${bookId}`);
    return response.data._embedded.categories;
};

export default GetAuthorByBookID;