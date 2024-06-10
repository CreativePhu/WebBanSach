import axios from "axios";
import UserLoginInf from "../../data_type/UserLoginInf";
import ResponseLogin from "../../data_type/ResponseLogin";

export const UserLogin = async (body: UserLoginInf):Promise<ResponseLogin> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/login`, body);
    return response.data;
};