import axios from "axios";

export const CheckVerifyOTP = async (otp: string, email: string):Promise<boolean> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/users/search/existsByEmailAndVerificationCode?email=${email}&verificationCode=${otp}`);
    return response.data;
};