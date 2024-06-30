import axios from "axios";

interface GenerateOTPInf {
    userName: string;
    email: string;
}

export const GenerateOTP = async (token: string, body: GenerateOTPInf) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/users/generate-otp`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};