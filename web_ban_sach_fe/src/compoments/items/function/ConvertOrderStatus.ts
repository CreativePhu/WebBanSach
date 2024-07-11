export const ConvertOrderStatus = (status: string) => {
    if (status === "PENDING") {
        return "Đang chờ xác nhận"
    } else if (status === "DELIVERED") {
        return "Đã xác nhận"
    }else if (status === "SHIPPING") {
        return "Đang giao hàng"
    }else{
        return "Đã hủy"
    }
}