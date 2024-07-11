export const ConvertPaymentMethod = (paymentMethod: string) => {
    if (paymentMethod === "CASH_ON_DELIVERY") {
        return "Thanh toán khi nhận hàng"
    } else {
        return "Chuyển khoản ngân hàng"
    }
}