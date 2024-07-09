import axios from "axios";

interface ShippingAddressInfResponse {
    shippingAddressID: number,
    shippingAddress: string,
}

export const GetShippingAddressByOrderIdAPI = async (orderId: number): Promise<ShippingAddressInfResponse> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/orders/${orderId}/shippingAddress`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data;
}