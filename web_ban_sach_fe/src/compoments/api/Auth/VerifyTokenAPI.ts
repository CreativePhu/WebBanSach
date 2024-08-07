import axios from "axios";
import UserInf from "../../data_type/Auth/UserInf";

export const verifyTokenAPI = async (token: string):Promise<UserInf> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/verify-token`, {token});
    return response.data;
};