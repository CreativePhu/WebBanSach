import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./compoments/items/layout/Navbar";
import Footer from "./compoments/items/layout/Footer";
import Content from "./compoments/items/layout/Content";
import {Route, Routes} from "react-router";
import LoginPage from "./compoments/items/page/auth/LoginPage";
import SearchPage from "./compoments/items/page/book/SearchPage";
import BookDetailPage from "./compoments/items/page/book/BookDetailPage";
import RegisterPage from "./compoments/items/page/auth/RegisterPage";
import ActiveOTPPage from "./compoments/items/page/auth/ActiveOTPPage";
import withAuthCheck from "./compoments/HOC_compoment/WithAuthCheck";
import CartPage from "./compoments/items/page/payment/CartPage";
import {Bounce, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {PaymentPage, ProfilePage} from "./compoments/items/page";
import {NotFoundPage} from "./compoments/items/page/Error/NotFoundPage";
import {IsNotVerifyPage} from "./compoments/items/page/auth/IsNotVerifyPage";
import ForgetPassword from "./compoments/items/page/auth/ForgotPassword";

function App() {

    return (
        <div className={"myApp"}>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<Content/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/search/*"} element={<SearchPage/>}/>
                <Route path={"/book-detail/*"} element={<BookDetailPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route path={"/forget-password"} element={<ForgetPassword/>}/>
                <Route path={"/notVerifyEmail"} element={<IsNotVerifyPage/>}/>
                <Route path={"/active-otp/*"} element={<ActiveOTPPage />}/>
                <Route path={"/cart"} element={<CartPage />}/>
                <Route path={"/payment"} element={<PaymentPage/>}/>
                <Route path={"/profile"} element={<ProfilePage/>}/>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Routes>
            <Footer/>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <ToastContainer />
        </div>
    );
}

const AuthenticatedApp = withAuthCheck(App);
export default AuthenticatedApp
