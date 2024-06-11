import axios from "axios";
import UserRegisterInf from "../../data_type/Auth/UserRegisterInf";

export const UserRegister = async (body: UserRegisterInf):Promise<string> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/register`, body);
    return response.data;
};