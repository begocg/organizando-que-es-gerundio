import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/index.scss";
import "reactjs-popup/dist/index.css";
import homePage from "../../../img/homePage.png";
import Card from "../../component/card";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <div className="h1-container">
        <h1>Descubre por qué necesitas Organizando que es gerundio en tu día a día</h1>
        <img src={homePage} style={{ width: "1000px", height: "auto" }} />
      </div>
      <h2 id="caracteristicas">Características</h2>
      <div className="card-container row justify-content-center text-center">
        <div className="col-md-6 mb-4">
          <Card
            title="Con horario laboral"
            content="Organiza tus tareas en función de un horario laboral y los descansos o eventos que configures."
            className="fixed-height-card"
          />
        </div>
        <div className="col-md-6 mb-4">
          <Card
            title="Tareas prioritarias"
            content="Dales la categoría de prioritarias a aquellas que sean inamovibles y la aplicación nos las distribuirá."
            className="fixed-height-card"
          />
        </div>
        <div className="col-md-6 mb-4">
          <Card
            title="Deja que lo haga por ti"
            content="La aplicación distribuirá tus tareas de manera automática en todas tus horas disponibles y te dirá si puedes o no llegar al plazo. Si registras el proyecto por palabras, le tendrás que indicar una cantidad aproximada por hora para poder trabajar con ello."
            className="fixed-height-card"
          />
        </div>
        <div className="col-md-6 mb-4">
          <Card
            title="1 proyecto = Varias minitareas"
            content="Si tu proyecto dura 50 horas o son 50 000 palabras, la aplicación lo dividirá en minitareas a lo largo de las semanas. Si eliminas una de esas minitareas por un imprevisto, se reorganizará solo."
            className="fixed-height-card"
          />
        </div>
      </div>
      <h2 id="planes">Planes</h2>
      <div class="container-pricingcards flex">
        <div class="flex_content flex2">
          <h2>Estudiante</h2>
          <h4>Gratis</h4>
          <span>Solo estudiantes</span>
          <ul>
            <li>Sin función de correo</li>
            <li>Proyectos ilimitados</li>
            <li>Almacenamiento por 1 año</li>
          </ul>
          <button className="btn btn-primary">Empieza ya</button>
        </div>
        <div class="flex_content">
          <h2>Profesional</h2>
          <h4>5 euros al mes</h4>
          <span>Para el resto de usuarios</span>
          <ul>
            <li>Proyectos ilimitados</li>
            <li>15 días gratis</li>
            <li>Almacenamiento por 3 años</li>
          </ul>
          <button className="btn btn-primary">Pruébalo</button>
        </div>
      </div>
      <h2 id="asistencia">Asistencia</h2>
      <div className="contact-form">
        <p className="contact-text-left">Si necesitas asistencia o tienes cualquier duda, ¡te esperamos al otro lado!</p>
        <form>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo electrónico" />
          <textarea placeholder="Mensaje"></textarea>
          <button className="btn btn-primary" type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};
