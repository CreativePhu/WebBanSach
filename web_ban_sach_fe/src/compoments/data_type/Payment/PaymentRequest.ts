interface PaymentRequest {
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    userID: number,
    paymentMethod: string,
    provinceID: number,
    districtID: number,
    wardID: number,
    address: string,
    listBookOrder: {
        bookID: number,
        quantity: number
    }[]
}

export default PaymentRequest;