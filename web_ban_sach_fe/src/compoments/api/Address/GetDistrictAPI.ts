import axios from "axios";
import DistrictInf from "../../data_type/Address/DistrictInf";

export const GetDistrictAPI = async (provinceID: number): Promise<DistrictInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/provinces/${provinceID}/districts`)
    return response.data._embedded.districts
}