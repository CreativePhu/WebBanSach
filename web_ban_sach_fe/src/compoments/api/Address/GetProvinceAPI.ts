import axios from "axios";
import {ProvinceInf} from "../Order/GetProvinceByShippingAddressIdAPI";

export const GetProvinceAPI = async (): Promise<ProvinceInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/provinces`)
    return response.data._embedded.provinces

}