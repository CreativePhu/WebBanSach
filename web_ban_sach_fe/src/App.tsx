import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function App() {
    return (
        <div className={"myApp"}>
            <Navbar/>
            <Footer/>
        </div>
    );
}

export default App;
