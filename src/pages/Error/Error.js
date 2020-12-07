import React from 'react';
import "./Error.css"
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const Error = () => (
    <div className="container p-0">
        <Header />

        <div className="body">
            <div className="container-sm">
                <div className="col-sm-12 text-center">
                    <h1 className="moon-title">4<img className="moon-error" src="/images/moon.png" />4</h1>
                    <h5 className="small-title text-uppercase">Page not found</h5>
                    <h2>Moon was eclipsed</h2>
                </div>
                <div className="col-sm-12 text-center mt-4">
                    <Link to="/" className="nav-item nav-link">Go back to the Moon</Link>
                </div>
            </div>
        </div>

        <Footer />
    </div>
)

export default Error;
