import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./compoments/layout/Navbar";
import Footer from "./compoments/layout/Footer";
import Content from "./compoments/layout/Content";
import {Route, Routes} from "react-router";
import LoginPage from "./compoments/page/LoginPage";
import SearchPage from "./compoments/page/SearchPage";
import BookDetailPage from "./compoments/page/BookDetailPage";
import RegisterPage from "./compoments/page/RegisterPage";
import ActiveOTPPage from "./compoments/page/ActiveOTPPage";

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
                <Route path={"*"} element={<h1>404 Not Found</h1>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
