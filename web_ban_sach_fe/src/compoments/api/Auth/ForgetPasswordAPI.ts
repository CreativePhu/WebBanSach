import axios from "axios";

export const ForgetPasswordAPI = async (email: string, newPassword: String) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/forget-password`, {email, newPassword});
    return response.data;
};