import axios from "axios";

export interface GetOrderByUserAPIResponseInf {
    orderID: number,
    orderDate: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    total: number,
    orderStatus: string,
    paymentMethod: string,
    paymentStatus: string,
}

export const GetOrderByUserAPI = async (userName: string, size: number, page: number):Promise<GetOrderByUserAPIResponseInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/orders/search/findOrdersByUser_UserName?userName=${userName}&sort=createdAt&desc&size=${size}&page=${page}`)
    return response.data._embedded.orders;
}