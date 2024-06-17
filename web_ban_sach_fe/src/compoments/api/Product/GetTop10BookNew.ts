import axios from "axios";
import BookInf from "../../data_type/Product/BookInf";

const GetTop10BookNew = async ():Promise<BookInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/books?sort=bookID,desc&size=10`);
    const data:BookInf[] = response.data._embedded.books;
    return data;
}

export default GetTop10BookNew;