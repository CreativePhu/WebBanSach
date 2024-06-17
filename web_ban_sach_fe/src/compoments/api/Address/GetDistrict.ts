import axios from "axios";
import DistrictInf from "../../data_type/Address/DistrictInf";
import districtInf from "../../data_type/Address/DistrictInf";

const GetDistrict = async (provinceID: number): Promise<DistrictInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/provinces/${provinceID}/districts`)
    const data: districtInf[] = response.data._embedded.districts
    return data;
}

export default GetDistrict;