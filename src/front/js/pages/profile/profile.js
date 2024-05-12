import React, { useState } from "react";
import "../../../styles/index.scss";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/es";
import "react-datepicker/dist/react-datepicker.css";
export const Profile = () => {
	  // Estado para almacenar los valores de los campos
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const horasDelDia = [];
  for (let hora = 0; hora <= 23; hora++) {
    const horaStr = hora.toString().padStart(2, '0'); // Asegura que la hora tenga dos dígitos (por ejemplo, '08' en lugar de '8')
    horasDelDia.push(`${horaStr}:00`);
  }

  // Funciones para manejar cambios en los campos
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };

  const handleContraseñaChange = (event) => {
    setContraseña(event.target.value);
  };

  const handleHoraInicioChange = (event) => {
    setHoraInicio(event.target.value);
  };

  const handleHoraFinChange = (event) => {
    setHoraFin(event.target.value);
  };

  // Manejar envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías enviar los datos a tu servidor o hacer lo que necesites con ellos
    console.log('Datos del formulario:', { nombre, correo, contraseña, horaInicio, horaFin });
  };

  return (
    <div class="myprofile">
      <h1>Mi Perfil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} />
        </div>
        <div>
          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" value={correo} onChange={handleCorreoChange} />
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input type="password" id="contraseña" value={contraseña} onChange={handleContraseñaChange} />
        </div>
        <div>
          <label htmlFor="horaInicio">Hora de inicio:</label>
          <select id="horaInicio" value={horaInicio} onChange={handleHoraInicioChange}>
            {horasDelDia.map((hora, index) => (
              <option key={index} value={hora}>{hora}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="horaFin">Hora de fin:</label>
          <select id="horaFin" value={horaFin} onChange={handleHoraFinChange}>
            {horasDelDia.map((hora, index) => (
              <option key={index} value={hora}>{hora}</option>
            ))}
          </select>
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );

};
