import axios from "axios";

export const CheckIsVerifyOTP = async (email: string) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${HOST}/users/check-is-verified/${email}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
};