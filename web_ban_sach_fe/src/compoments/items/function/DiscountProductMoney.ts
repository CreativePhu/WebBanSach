export const DiscountProductMoney = (price: number, discount: number): number => {
    const discountPrice = price - (price * discount / 100);
    return discountPrice
}