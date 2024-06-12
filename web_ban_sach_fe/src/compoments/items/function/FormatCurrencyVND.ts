function FormatCurrencyVND(amount: number): string {
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

export default FormatCurrencyVND;