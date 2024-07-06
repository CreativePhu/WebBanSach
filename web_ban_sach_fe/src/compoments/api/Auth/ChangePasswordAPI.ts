import axios from "axios";

interface ChangePasswordInf {
    password: string;
    newPassword: string;
}

export const ChangePasswordAPI = async (token: string, body: ChangePasswordInf) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/change-password`, body,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};