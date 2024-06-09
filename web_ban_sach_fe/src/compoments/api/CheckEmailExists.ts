import axios from "axios";

export const checkEmailExists = async (email: string) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/users/search/existsByEmail?email=${email}`);
    return response.data;
};