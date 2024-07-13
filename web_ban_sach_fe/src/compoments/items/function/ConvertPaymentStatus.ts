export const ConvertPaymentStatus = (status?: string): string => {
    if(status === "PENDING") return "Chưa thanh toán"
    return "Đã thanh toán"
}