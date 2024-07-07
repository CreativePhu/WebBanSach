import axios from "axios";
import VerifyOTPInf from "../../data_type/Auth/VerifyOTPInf";

export const VerifyOTPAPI = async (body: VerifyOTPInf) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/verify`, body);
    return response.data;
};