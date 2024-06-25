import React from "react";
import BookCartInf from "../../data_type/Product/BookCartInf";
import formatCurrencyVND from "../function/FormatCurrencyVND";
import {setCounter} from "../../redux/slice/CounterSlice";
import {useAppDispatch} from "../../redux/Hooks";
import {Link, useNavigate} from "react-router-dom";
import {ListBookPayment} from "../../data_type/Payment/ListBookPayment";
import book from "../Book";

const CartPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [products, setProducts] = React.useState<BookCartInf[]>([])
    const [listBookChecked, setListBookChecked] = React.useState<BookCartInf[]>([])
    const [checkAll, setCheckAll] = React.useState<boolean>(false)
    const totalPrice = listBookChecked.reduce((total, product) => total + product.bookPrice * product.quantity, 0);

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

    const payProduct = () => {
        if(listBookChecked.length === 0) return;
        const listBookPayment: ListBookPayment[] = listBookChecked.map((book) => { return {bookID: book.bookID, quantity: book.quantity}})
        sessionStorage.setItem("listBookPayment", JSON.stringify(listBookPayment));
        navigate("/payment");
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
        if(checkAll) setListBookChecked(products);
    }, [products, dispatch, checkAll])


    React.useEffect(() => {
        if(listBookChecked.length === products.length) setCheckAll(true);
        else setCheckAll(false);
    }, [listBookChecked, products])


    if(products.length === 0) {
        return (
            <div className={"container-fluid bg-light rounded py-4 shadow-sm"}>
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
                    <div className={"col-12 col-lg-8 bg-white shadow-sm p-3 rounded"}>
                        <div className={"row px-3 py-3"}>
                            <div className={"col-1"}>
                                <input type="checkbox" checked={checkAll} onChange={() => {
                                    setCheckAll(!checkAll);
                                    if (!checkAll) {
                                        setListBookChecked(products);
                                    } else {
                                        setListBookChecked([]);
                                    }
                                }}/>
                            </div>
                            <div className={"col-12 col-lg-5"}>
                                <span className={"fw-semibold fs-"}>Chon tất cả ({products.length} sản phẩm)</span>
                            </div>
                            <div className={"col-2 d-none d-lg-block"}>
                                <span className={"fw-semibold"}>SỐ LƯỢNG</span>
                            </div>
                            <div className={"col-3 d-none d-lg-block"}>
                                <span className={"fw-semibold"}>THÀNH TIỀN</span>
                            </div>
                        </div>
                        <hr className={"my-3"}/>
                        {
                            products.map((product: BookCartInf, index) => {
                                return (
                                    <div key={product.bookID} className={"row px-3 py-3"}>
                                        <div className={"col-1"}>
                                            <input type={"checkbox"} checked={listBookChecked.includes(product)}
                                                   onChange={() => {
                                                       if (listBookChecked.includes(product)) {
                                                           setListBookChecked(listBookChecked.filter((book) => book.bookID !== product.bookID));
                                                       } else {
                                                           setListBookChecked([...listBookChecked, product]);
                                                       }
                                                   }}/>
                                        </div>
                                        <div className={"col-12 col-lg-5"}>
                                            <div className={"row"}>
                                                <div className={"col-6"}>
                                                    <Link to={`/book-detail?bookId=${product.bookID}`}>
                                                        <img src={product.bookImage} alt={product.bookTitle}
                                                             className={"w-100"}/>
                                                    </Link>
                                                </div>
                                                <div className={"col-6 d-none d-lg-block"}>
                                                    <Link className={"text-decoration-none fw-semibold text-dark"} to={`/book-detail?bookId=${product.bookID}`}>
                                                        <span>{product.bookTitle}</span>
                                                    </Link>
                                                    <p className={"fw-semibold text-danger"}>{formatCurrencyVND(product.bookPrice)}</p>
                                                </div>
                                                <div className={"col-6 d-lg-none"}>
                                                    <span>{product.bookTitle}</span>
                                                    <p className={"fw-semibold text-danger"}>{formatCurrencyVND(product.bookPrice)}</p>
                                                    <div className={"col-12"}>
                                                        <div
                                                            className={"d-flex justify-content-start"}>
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
                                                        <div className={"col-12 mt-4"}>
                                                            <button onClick={() => removeProduct(product.bookID)}
                                                                    className={"btn btn-danger"}><i
                                                                className="bi bi-trash3"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"col-2 d-none d-lg-block"}>
                                            <div className={"w-100 d-flex justify-content-center"}>
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
                                        <div className={"col-2 d-none d-lg-block"}>
                                            <span
                                                className={"fw-semibold"}>{formatCurrencyVND(product.bookPrice * product.quantity)}</span>
                                        </div>
                                        <div className={"col-2 d-none d-lg-block"}>
                                            <button onClick={() => removeProduct(product.bookID)}
                                                    className={"btn btn-danger"}><i className="bi bi-trash3"></i>
                                            </button>
                                        </div>
                                        {
                                            index < products.length - 1 && <hr className={"my-3"}/>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={"col-12 col-lg-4 p-0 px-lg-2 mt-4 mt-lg-0"}>
                        <div className={"row position-sticky top-0"}>
                            <div className={"col-12"}>
                                <div className={"bg-white px-3 py-3 shadow-sm rounded"}>
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
                                        <button onClick={() => {payProduct()}} className={"btn btn-danger w-100"}>THANH TOÁN</button>
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