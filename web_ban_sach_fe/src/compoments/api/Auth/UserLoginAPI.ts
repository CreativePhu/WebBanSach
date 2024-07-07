import axios from "axios";
import UserLoginInf from "../../data_type/Auth/UserLoginInf";
import ResponseLogin from "../../data_type/Auth/ResponseLogin";

export const UserLoginAPI = async (body: UserLoginInf):Promise<ResponseLogin> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/login`, body);
    return response.data;
};