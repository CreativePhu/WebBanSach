import axios from "axios";

export interface ProvinceInf {
    provinceID: number;
    provinceName: string;
}

export const GetProvinceByShippingAddressIdAPI = async (shippingAddressId: number): Promise<ProvinceInf> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/shipping-addresses/${shippingAddressId}/province`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data;
}