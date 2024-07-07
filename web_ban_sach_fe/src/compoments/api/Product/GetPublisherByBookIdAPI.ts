import axios from "axios";
import PublisherInf from "../../data_type/Product/PublisherInf";

export const GetPublisherByBookIdAPI = async (bookId: number):Promise<PublisherInf> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/publishers/search/findByBooksBookID?bookId=${bookId}`);
    return response.data;
}