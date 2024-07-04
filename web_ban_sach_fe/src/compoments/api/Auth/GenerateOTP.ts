import axios from "axios";

export const GenerateOTP = async (token: string) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/users/generate-otp`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};