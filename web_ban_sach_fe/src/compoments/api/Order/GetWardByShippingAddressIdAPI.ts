import axios from "axios";
import {WardInf} from "../Address";

export const GetWardByShippingAddressIdAPI = async (shippingAddressId: number): Promise<WardInf> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/shipping-addresses/${shippingAddressId}/ward`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data;
}