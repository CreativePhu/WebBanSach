import axios from "axios";

export const checkUserNameExists = async (userName: string) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.get(`${HOST}/users/search/existsByUserName?username=${userName}`);
    return response.data;
};