import axios from "axios";
import {UpdateUserInf} from "../../data_type/Profile/UpdateUserInf";

export const UpdateUser = async (token: string, body: UpdateUserInf) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    return await axios.patch(`${HOST}/users/update`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}