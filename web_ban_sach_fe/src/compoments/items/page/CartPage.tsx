import React from "react";
import BookCartInf from "../../data_type/Product/BookCartInf";
import formatCurrencyVND from "../function/FormatCurrencyVND";
import {setCounter} from "../../redux/CounterSlice";
import {useAppDispatch} from "../../redux/Hooks";
import {Link} from "react-router-dom";

const CartPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const [products, setProducts] = React.useState<BookCartInf[]>([])

    const totalPrice = products.reduce((total, product) => total + product.bookPrice * product.quantity, 0);

    const increaseQuantity = (bookID: number) => {
        const newProducts = products.map((product) => {
            if (product.bookID === bookID) {
                if(product.quantity === 10) return product;
                return {
                    ...product,
                    quantity: product.quantity + 1,
                }
            }
            return product;
        });
        setProducts(newProducts);
    }

    const decreaseQuantity = (bookID: number) => {
        const newProducts = products.map((product) => {
            if (product.bookID === bookID) {
                if(product.quantity === 1) return product;
                return {
                    ...product,
                    quantity: product.quantity - 1,
                }
            }
            return product;
        });
        setProducts(newProducts);
    }

    const changeQuantity = (bookID: number, quantity: number) => {
        const newProducts = products.map((product) => {
            if (product.bookID === bookID) {
                return {
                    ...product,
                    quantity: quantity,
                }
            }
            return product;
        });
        setProducts(newProducts);
    }

    const removeProduct = (bookID: number) => {
        const newProducts = products.filter((product) => product.bookID !== bookID);
        setProducts(newProducts);
    }

    React.useEffect(() => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            const listBook: BookCartInf[] = JSON.parse(cart);
            setProducts(listBook);
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(products));
        dispatch(setCounter(products.length))
    }, [products, dispatch])

    if(products.length === 0) {
        return (
            <div className={"container-fluid bg-light rounded py-4"}>
                <div className={"container rounded bg-white d-flex flex-column justify-content-center align-items-center shadow-sm"} style={{minHeight: "500px"}}>
                    <img
                        src="/images/cart/cart-empty.png"
                        alt={"empty cart"} style={{width: "150px", height: "150px"}}/>
                    <span className={"mt-3 fs-6 fw-semibold"}>Không có sản phẩm nào trong giỏ hàng</span>
                    <Link className={"btn btn-danger mt-3"} to={"/"}>Mua sắm ngay</Link>
                </div>
            </div>
        )
    }

    return (
        <div className={"container-fluid bg-light rounded py-4"}>
            <div className={"container"}>
                <p className={"fw-semibold fs-5"}>GIỎ HÀNG ({products.length} sản phẩm)</p>
                <div className={"row d-flex justify-content-between"}>
                    <div className={"col-8 bg-white shadow p-3 rounded"}>
                        <div className={"row px-3 py-3"}>
                            <div className={"col-1"}>
                                <input type={"checkbox"}/>
                            </div>
                            <div className={"col-5"}>
                                <span className={"fw-semibold"}>Chon tất cả ({products.length} sản phẩm)</span>
                            </div>
                            <div className={"col-2"}>
                                <span className={"fw-semibold"}>SỐ LƯỢNG</span>
                            </div>
                            <div className={"col-3"}>
                                <span className={"fw-semibold"}>THÀNH TIỀN</span>
                            </div>
                        </div>
                        {
                            products.map((product: BookCartInf) => {
                                return (
                                    <div key={product.bookID} className={"row px-3 py-3"}>
                                        <div className={"col-1"}>
                                            <input type={"checkbox"}/>
                                        </div>
                                        <div className={"col-5"}>
                                            <div className={"row"}>
                                                <div className={"col-6"}>
                                                    <img src={product.bookImage} alt={product.bookTitle}
                                                         className={"w-100"}/>
                                                </div>
                                                <div className={"col-6"}>
                                                    <span>{product.bookTitle}</span>
                                                    <p className={"fw-semibold text-danger"}>{formatCurrencyVND(product.bookPrice)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"col-2"}>
                                            <div className={"shadow-sm rounded d-flex justify-content-between"}>
                                                <button onClick={() => decreaseQuantity(product.bookID)}
                                                        className={"btn btn-light"}>-
                                                </button>
                                                <input
                                                    type={"number"}
                                                    value={product.quantity}
                                                    disabled={true}
                                                    onChange={(e) => {
                                                        changeQuantity(product.bookID, parseInt(e.target.value))
                                                    }}
                                                    className={"w-50 text-center border-0 rounded"}
                                                />
                                                <button onClick={() => increaseQuantity(product.bookID)}
                                                        className={"btn btn-light"}>+
                                                </button>
                                            </div>
                                        </div>
                                        <div className={"col-2"}>
                                            <span className={"fw-semibold"}>{formatCurrencyVND(product.bookPrice * product.quantity)}</span>
                                        </div>
                                        <div className={"col-2"}>
                                            <button onClick={() => removeProduct(product.bookID)}
                                                    className={"btn btn-danger"}><i className="bi bi-trash3"></i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={"col-4"}>
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <div className={"bg-white px-3 py-3 shadow bg-body-tertiary rounded"}>
                                    <div className={"d-flex justify-content-between align-items-center"}>
                                        <p className={"fw-semibold"}>Thành tiền</p>
                                        <p className={"fw-semibold"}>{formatCurrencyVND(totalPrice)}</p>
                                    </div>
                                    <hr className={"m-0"}/>
                                    <div className={"d-flex justify-content-between align-items-center mt-2"}>
                                        <p className={"fw-semibold fs-5"}>Tổng số tiền (gồm VAT)</p>
                                        <p className={"fw-bold text-danger fs-3"}>{formatCurrencyVND(totalPrice)}</p>
                                    </div>
                                    <div className={"d-flex justify-content-between align-items-center"}>
                                        <button className={"btn btn-danger w-100"}>THANH TOÁN</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage