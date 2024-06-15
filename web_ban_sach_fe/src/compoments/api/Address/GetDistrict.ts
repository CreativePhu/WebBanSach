import axios from "axios";
import DistrictInf from "../../data_type/Address/DistrictInf";

const GetDistrict = async (provinceID: number): Promise<DistrictInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const listDistrict: DistrictInf[] = [];
    const response = await axios.get(`${HOST}/provinces/${provinceID}/districts`)
    const data = response.data._embedded.districts
    data.forEach((district: DistrictInf) => {
        listDistrict.push({
            districtID: district.districtID,
            districtName: district.districtName,
        });
    });

    return listDistrict;
}

export default GetDistrict;