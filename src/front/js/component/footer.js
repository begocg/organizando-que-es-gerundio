import React from "react";
import '../../styles/index.scss';

export const Footer = () => (
    <footer className="footer mt-auto pt-5 text-center">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-auto">
                    {/* Símbolo de Facebook */}
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-square fa-2x"></i>
                    </a>
                </div>
                <div className="col-12 col-md-auto">
                    {/* Símbolo de Twitter */}
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter-square fa-2x"></i>
                    </a>
                </div>
                <div className="col-12 col-md-auto">
                    {/* Símbolo de Instagram */}
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram-square fa-2x"></i>
                    </a>
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col">
                    {/* Disclaimer de todos los derechos reservados */}
                    <p>Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    </footer>
);
