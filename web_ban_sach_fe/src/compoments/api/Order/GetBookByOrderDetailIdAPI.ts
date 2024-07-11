import axios from "axios";

export interface BookDetailByOrderDetailInfResponse {
    "bookID": number,
    "bookTitle": string,
    "bookPrice": number,
    "bookDescription": string,
    "bookISBN": string,
}

export const GetBookByOrderDetailIdAPI = async (orderDetailId: number): Promise<BookDetailByOrderDetailInfResponse> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/order-details/${orderDetailId}/book`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data;
}