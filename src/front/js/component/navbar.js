import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../img/logo.png";
import Login from "./login";
import Popup from "./pop-up/pop-up";
import Register from "./register";
import NewTask from "./newTask";

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
          <div className="d-flex align-items-center">
            <img src={logo} alt="Logo" onClick={() => scrollToSection("inicio")} style={{ marginRight: "10px", width: "50px", height: "auto" }} />
            <p>Organizando que es gerundio</p>
          </div>

          <div className="ml-auto">
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
      </nav>
    );
  else {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <div className="d-flex align-items-center">
            <img src={logo} alt="Logo" onClick={() => scrollToSection("inicio")} style={{ marginRight: "10px", width: "50px", height: "auto" }} />
            <p>Organizando que es gerundio</p>
          </div>
          <div className="d-flex align-items-center ml-auto">
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
          <div className="ml-auto">
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
      </nav>
    );
  }
};
