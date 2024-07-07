import axios from "axios";

export const GenerateOTPAPI = async (email: string) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/generate-otp`, {email});
    return response.data;
};