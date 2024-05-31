import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Content from "./layout/Content";

function App() {
    return (
        <div className={"myApp"}>
            <Navbar/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default App;
