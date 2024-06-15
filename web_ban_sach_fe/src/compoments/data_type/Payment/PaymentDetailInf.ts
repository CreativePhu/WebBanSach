import ProvinceInf from "../Address/ProvinceInf";
import DistrictInf from "../Address/DistrictInf";
import WardInf from "../Address/WardInf";

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