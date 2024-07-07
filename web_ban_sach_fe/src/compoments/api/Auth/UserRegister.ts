import axios from "axios";
import UserRegisterInf from "../../data_type/Auth/UserRegisterInf";

interface UserRegisterResponseInf {
    userID: number;
    userName: string;
    fullName: string;
    phone: string;
    email: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const UserRegister = async (body: UserRegisterInf):Promise<UserRegisterResponseInf> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/register`, body);
    return response.data;
};