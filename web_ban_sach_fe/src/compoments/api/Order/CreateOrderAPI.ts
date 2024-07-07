import axios from "axios";
import PaymentRequest from "../../data_type/Payment/PaymentRequest";

export const CreateOrderAPI = async (body: PaymentRequest) => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const response = await axios.post(`${HOST}/order-book`, body);
    return response.data;
}