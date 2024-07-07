import axios from "axios";
import WardInf from "../../data_type/Address/WardInf";

export const GetWardAPI = async (districtId: number): Promise<WardInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/districts/${districtId}/ward`)
    return response.data._embedded.wards
}