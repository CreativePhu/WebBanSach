import axios from "axios";

export interface DistrictInf {
    districtID: number;
    districtName: string;
}

export const GetDistrictByShippingAddressIdAPI = async (shippingAddressId: number): Promise<DistrictInf> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/shipping-addresses/${shippingAddressId}/district`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data;
}