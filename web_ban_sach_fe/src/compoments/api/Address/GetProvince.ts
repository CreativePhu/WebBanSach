import axios from "axios";
import ProvinceInf from "../../data_type/Address/ProvinceInf";

const GetProvince = async (): Promise<ProvinceInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/provinces`)
    return response.data._embedded.provinces

}

export default GetProvince;