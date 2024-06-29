import axios from "axios";
import {UpdateProfileInf} from "../../data_type/Profile/UpdateProfileInf";

export const UpdateProfileUser = async (userName: string, token: string, body: UpdateProfileInf) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    return await axios.put(`${HOST}/users/${userName}/update`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}