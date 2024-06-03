import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./compoments/layout/Navbar";
import Footer from "./compoments/layout/Footer";
import Content from "./compoments/layout/Content";

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
