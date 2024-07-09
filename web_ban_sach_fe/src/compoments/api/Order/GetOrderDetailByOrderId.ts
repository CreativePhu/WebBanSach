import axios from "axios";

export interface OrderDetailInfResponse {
    oderDetailID: number,
    unitPrice: number,
    quantity: number,
}

export const GetOrderDetailByOrderId = async (orderId: number): Promise<OrderDetailInfResponse[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/orders/${orderId}/orderDetails`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data._embedded.orderDetails;
}