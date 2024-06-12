import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./compoments/items/layout/Navbar";
import Footer from "./compoments/items/layout/Footer";
import Content from "./compoments/items/layout/Content";
import {Route, Routes} from "react-router";
import LoginPage from "./compoments/items/page/LoginPage";
import SearchPage from "./compoments/items/page/SearchPage";
import BookDetailPage from "./compoments/items/page/BookDetailPage";
import RegisterPage from "./compoments/items/page/RegisterPage";
import ActiveOTPPage from "./compoments/items/page/ActiveOTPPage";
import withAuthCheck from "./compoments/HOC_compoment/WithAuthCheck";
import CartPage from "./compoments/items/page/CartPage";

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
                <Route path={"/active-otp/*"} element={<ActiveOTPPage />}/>
                <Route path={"/cart"} element={<CartPage />}/>
                <Route path={"*"} element={<h1>404 Not Found</h1>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

const AuthenticatedApp = withAuthCheck(App);
export default AuthenticatedApp
