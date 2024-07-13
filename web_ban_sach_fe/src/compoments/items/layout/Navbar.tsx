import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/Hooks";
import UserInf from "../../data_type/Auth/UserInf";
import {resetUser} from "../../redux/slice/UserSlice";
import BookCartInf from "../../data_type/Product/BookCartInf";
import formatCurrencyVND from "../function/FormatCurrencyVND";

function Navbar() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const cart = localStorage.getItem("cart")
    const count = useAppSelector(state => state.Count.value)
    const user: UserInf | null = useAppSelector(state => state.User.value)

    const [products, setProducts] = React.useState<BookCartInf[]>([])
    const [searchValue, setSearchValue] = React.useState<string>("")
    const [showUserDropdown, setShowUserDropdown] = React.useState<boolean>(false)
    const [isHover, setIsHover] = React.useState<boolean>(false)
    const [isHoverCart, setIsHoverCart] = React.useState<boolean>(false)
    const [numberCart, setNumberCart] = React.useState<number>(0)
    const [isHoverMenu, setIsHoverMenu] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (user) {
            setShowUserDropdown(true)
        } else {
            setShowUserDropdown(false)
        }
    }, [user])

    React.useEffect(() => {
        setNumberCart(count)
    }, [count])

    React.useEffect(() => {
        if (cart) {
            const listBook: BookCartInf[] = JSON.parse(cart);
            setProducts(listBook);
        }
    }, [cart])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const logout = () => {
        localStorage.removeItem("token")
        dispatch(resetUser())
        navigate("/login")
    }

    const handleSearchSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        navigate(`/search?bookTitle=${searchValue}`)
        setSearchValue("")
    }

    return (
        <div id={"navbar"} className="container-fluid py-2" style={{backgroundColor: "white"}}>
            <div className={"container py-2"}>
                    <div className={"row"}>
                        <div
                            className={"col-12 col-lg-3 d-flex justify-content-center align-items-center justify-content-lg-start p-0 mb-3 mb-lg-0"}>
                            <Link className="navbar-brand" to={"/"}>
                                <img
                                    src={"/images/banner.png"}
                                    alt="Bootstrap" style={{width: "220px", height: "auto"}}/>
                            </Link>
                        </div>
                        <div
                            onMouseEnter={() => setIsHoverMenu(true)}
                            onMouseLeave={() => setIsHoverMenu(false)}
                            className={`col-2 col-md-1 d-lg-none p-0 d-flex justify-content-center align-items-center border rounded cussor-pointer bg-danger ${isHoverMenu ? "opacity-75" : "opacity-100"}`}
                        >
                            <i className={`bi bi-list fs-1 text-white`}></i>
                        </div>
                        <div className={"col-10 col-md-11 col-lg-6 d-flex justify-content-center pe-0"}>
                            <input className="form-control me-2" type="search"
                                   placeholder="Nhập tên sách cần tìm"
                                   aria-label="Search" onChange={handleSearchChange} value={searchValue}/>
                            <button className="btn bg-danger px-4" type="submit" onClick={handleSearchSubmit}>
                                <i className="bi bi-search" style={{color: "white"}}></i>
                            </button>
                        </div>
                        <div
                            className={"d-none d-lg-block col-lg-3 d-flex justify-content-end align-items-center p-0"}>
                            <ul className="nav justify-content-end">
                                <li
                                    onMouseEnter={() => setIsHoverCart(true)}
                                    onMouseLeave={() => setIsHoverCart(false)}
                                    className="nav-item"
                                >
                                    <Link className="nav-link me-3 py-1 pe-0" aria-current="page" to={"/cart"}>
                                        <button type="button"
                                                className={"bg-white border-0 position-relative"}>
                                            <i className="bi bi-cart-fill fs-4 text-danger"></i>
                                            <span className={`${count <= 0 ? "d-none" : ""} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>{numberCart}</span>
                                        </button>
                                    </Link>
                                    <div
                                        className={`${isHoverCart && products.length > 0 ? "d-block" : "d-none"} position-absolute bg-white shadow p-3 mb-5 bg-body-tertiary rounded z-3`}
                                        style={{minWidth: "380px", minHeight: "300px"}}>
                                        <h6 className={"text-danger"}><i className="bi bi-cart"></i> Giỏ hàng</h6>
                                        <hr/>
                                        <div className={"d-flex flex-column"}>
                                            {
                                                products.map((book, index) => {
                                                    return (
                                                        <div key={book.bookID}>
                                                            <div className={"d-flex flex-row"}>
                                                                <Link to={`/book-detail?bookId=${book.bookID}`}>
                                                                    <img src={book.bookImage} alt={book.bookTitle}
                                                                         className={"h-auto"}
                                                                         style={{width: "90px"}}/>
                                                                </Link>
                                                                <div className={"d-flex flex-column ms-2"}>
                                                                    <Link
                                                                        className={"text-decoration-none fw-semibold text-dark"}
                                                                        to={`/book-detail?bookId=${book.bookID}`}>
                                                                        <span>{book.bookTitle}</span>
                                                                    </Link>
                                                                    <span
                                                                        className={"fw-semibold text-danger"}>{formatCurrencyVND(book.bookPrice)}</span>
                                                                    <span
                                                                        className={"fw-semibold fst-italic"}>Số lượng: {book.quantity}</span>
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div>
                                                <div className={"d-flex flex-row justify-content-between"}>
                                                    <span className={"fw-bold"}>Tổng tiền:</span>
                                                    <span
                                                        className={"fw-bold text-danger"}>{formatCurrencyVND(products.reduce((total, book) => total + book.bookPrice * book.quantity, 0))}</span>
                                                </div>
                                                <div className={"mt-3 float-end"}>
                                                    <button className={"btn btn-danger"} onClick={() => {
                                                        navigate("/cart")
                                                        setIsHoverCart(false)
                                                    }}>
                                                        Xem giỏ hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    {
                                        !showUserDropdown ?
                                            <>
                                                <Link id={"user-login"} onMouseEnter={() => setIsHover(true)}
                                                      onMouseLeave={() => setIsHover(false)}
                                                      className="nav-link p-3 py-0 pe-0" aria-current="page"
                                                      to={"/login"}>
                                                    <div
                                                        className={"d-flex flex-column justify-content-center align-items-center py-1 px-3"}>
                                                        <i className="bi bi-person-fill fs-4 text-danger"></i>
                                                    </div>
                                                </Link>
                                                <div
                                                    onMouseEnter={() => setIsHover(true)}
                                                    onMouseLeave={() => setIsHover(false)}
                                                    className={`${isHover ? "d-block" : "d-none"} position-absolute d-flex flex-column bg-white shadow-sm p-3 mb-5 bg-body-tertiary rounded z-1`}
                                                    style={{width: "150px"}}>
                                                    <Link onClick={() => {
                                                        setIsHover(false)
                                                    }} to={"/login"}
                                                          className={"text-decoration-none text-danger"}>
                                                        Đăng nhập
                                                    </Link>
                                                    <hr className={"my-2 text-danger"}/>
                                                    <Link onClick={() => {
                                                        setIsHover(false)
                                                    }} to={"/register"}
                                                          className={"text-decoration-none text-danger"}>
                                                        Đăng ký
                                                    </Link>
                                                </div>
                                            </>
                                            :
                                            <div className="ms-3">
                                                <button className="btn btn-danger dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi bi-person-fill fs-4 text-white"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                            <span className="dropdown-item text-danger fw-bold">{user?.fullName}</span>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider text-danger"/>
                                                    </li>
                                                    <li>
                                                        <Link to={"/profile"} className="dropdown-item">Thông tin tài khoản</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={"/cart"} className="dropdown-item">Giỏ hàng</Link>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item"
                                                                onClick={() => {
                                                                    logout()
                                                                }}>Đăng xuất
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Navbar;