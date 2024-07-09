import {WardInf} from "../../api/Address";
import {ProvinceInf} from "../../api/Order/GetProvinceByShippingAddressIdAPI";
import {DistrictInf} from "../../api/Order/GetDistrictByShippingAddressIdAPI";

interface PaymentDetailInf {
    fullName: string;
    email: string;
    phone: string;
    province: ProvinceInf;
    district: DistrictInf;
    ward: WardInf;
    address: string;
    paymentMethod: string;
}

export default PaymentDetailInf;