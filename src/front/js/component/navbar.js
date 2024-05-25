import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../img/logo.png";
import Login from "./login";
import Popup from "./pop-up/pop-up";
import Register from "./register";
import NewTask from "./newTask";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRegistrationSuccess = () => {
    window.location.href = "/calendar";
  };

  const handleLoginSuccess = () => {
    window.location.href = "/calendar";
  };

  const handleMyProfile = () => {
    window.location.href = "/profile";
  };

  const handleNewTask = () => {};

  const handleLogoutSuccess = () => {
    window.location.href = "/home";
    localStorage.clear();
  };
  const token = localStorage.getItem("jwt-token");

  console.log("EYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY EL TOKE ES:" + token);
  if (token)
    return (
      <nav className="navbar navbar-light">
        <div className="container">
        <div className="d-flex flex-column align-items-center w-100">
            <div className="d-flex align-items-center justify-content-center mb-3">
          <Link to="/calendar">
            <img src={logo} alt="Logo" onClick={() => scrollToSection("inicio")} style={{ marginRight: "10px", width: "50px", height: "auto" }} />
            </Link>
            <p>Organizando que es gerundio</p>
          </div>

          <div className="ml-auto d-flex justify-content-center mb-3">
            <Popup
              trigger={
                <button
                  className="btn btn-primary rounded-circle"
                  style={{ backgroundColor: "primary", border: "none", width: "40px", height: "40px", justifyContent: "center", marginRight: "10px" }}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
                </button>
              }
            >
              <NewTask/>
            </Popup>
            <button onClick={handleMyProfile} className="btn btn-primary" style={{ marginRight: "10px" }}>
              Mi perfil
            </button>

            <button onClick={handleLogoutSuccess} className="btn btn-primary">
              Logout
            </button>
            </div>
          </div>
        </div>
      </nav>
    );
  else {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <div className="d-flex flex-column align-items-center w-100">
          <div className="d-flex align-items-center justify-content-center mb-3">
          <Link to="/home">
            <img src={logo} alt="Logo" onClick={() => scrollToSection("inicio")} style={{ marginRight: "10px", width: "50px", height: "auto" }} />
            </Link>
            <p>Organizando que es gerundio</p>
          </div>
          <div className="d-flex flex-column align-items-center w-100 mb-3 ml auto">
            <span className="nav-link" onClick={() => scrollToSection("caracteristicas")}>
              Características
            </span>
            <span className="nav-link" onClick={() => scrollToSection("planes")}>
              Planes
            </span>
            <span className="nav-link" onClick={() => scrollToSection("asistencia")}>
              Asistencia
            </span>
          </div>
          <div className="ml-auto d-flex justify-content-center">
            <Popup
              trigger={
                <button className="btn btn-primary" style={{ marginRight: "10px" }}>
                  Iniciar sesión
                </button>
              }
            >
              <Login onLoginSuccess={handleLoginSuccess} />
            </Popup>
            <Popup trigger={<button className="btn btn-primary">Registrarse</button>}>
              <Register onRegistrationSuccess={handleRegistrationSuccess} />{" "}
            </Popup>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};
