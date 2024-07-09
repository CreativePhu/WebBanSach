import axios from "axios";

export interface OrderInfResponse {
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

export const GetOrderByOrderIdAPI = async (orderId: number): Promise<OrderInfResponse> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/orders/${orderId}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    return response.data;
}