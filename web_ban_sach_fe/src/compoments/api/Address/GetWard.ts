import axios from "axios";
import WardInf from "../../data_type/Address/WardInf";

const GetWard = async (districtId: number): Promise<WardInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const listWard: WardInf[] = [];
    const response = await axios.get(`${HOST}/districts/${districtId}/ward`)
    const data = response.data._embedded.wards
    data.forEach((ward: WardInf) => {
        listWard.push({
            wardID: ward.wardID,
            wardName: ward.wardName,
        });
    });

    return listWard;
}

export default GetWard;