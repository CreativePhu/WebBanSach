import axios from "axios";
import ProvinceInf from "../../data_type/Address/ProvinceInf";

const GetProvince = async (): Promise<ProvinceInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const listProvinces: ProvinceInf[] = [];
    const response = await axios.get(`${HOST}/provinces`)
    const data = response.data._embedded.provinces

    data.forEach((province: ProvinceInf) => {
        listProvinces.push({
            provinceID: province.provinceID,
            provinceName: province.provinceName,
        });
    });

    return listProvinces;
}

export default GetProvince;