import {GetShippingAddressByOrderIdAPI} from "../../api/Order/GetShippingAddressByOrderIdAPI";
import {GetWardByShippingAddressIdAPI} from "../../api/Order/GetWardByShippingAddressIdAPI";
import {GetProvinceByShippingAddressIdAPI} from "../../api/Order/GetProvinceByShippingAddressIdAPI";
import {GetDistrictByShippingAddressIdAPI} from "../../api/Order/GetDistrictByShippingAddressIdAPI";

export const GetAddressToStringByShippingAddressId = async (orderId: number): Promise<string> => {
    return GetShippingAddressByOrderIdAPI(orderId).then((shippingAddress) => {
        return Promise.all([
            GetWardByShippingAddressIdAPI(shippingAddress.shippingAddressID),
            GetProvinceByShippingAddressIdAPI(shippingAddress.shippingAddressID),
            GetDistrictByShippingAddressIdAPI(shippingAddress.shippingAddressID),
            Promise.resolve(shippingAddress)
        ]).then(([ward, province, district, shippingAddress]) => {
            return `${shippingAddress.shippingAddress}, ${ward.wardName}, ${district.districtName}, ${province.provinceName}`;
        });
    }).catch((err) => {
        throw err;
    });
}