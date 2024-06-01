import React, { useEffect, useState } from "react";
import "../../../styles/index.scss";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/es";
import "react-datepicker/dist/react-datepicker.css";
export const Profile = ({}) => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://organizando-que-es-gerundio.onrender.com/api/userDetails/" + userId, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("LA DATAAAAAAAAAAAAAAAAAAAAAAAAAA ESSSS :"+data)
          console.log(data.username)
          setUser(data);
          console.log(user)
          console.log(user.username)
        } else {
          console.error("Error en la respuesta");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchEvents();
  }, [userId]);

  const horasDelDia = [];
  for (let hora = 0; hora <= 23; hora++) {
    const horaStr = hora.toString().padStart(2, "0"); // Asegura que la hora tenga dos dígitos (por ejemplo, '08' en lugar de '8')
    horasDelDia.push(`${horaStr}:00`);
  }

  // Funciones para manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Datos del formulario:", { nombre, correo, contraseña, horaInicio, horaFin });
  };

  return (
    <div class="myprofile">
      <h1>Mi Perfil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="username"defaultValue={user.username}  onChange={handleChange}/>
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" name="email"onChange={handleChange}/>
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password"onChange={handleChange}/>
        </div>
        <div>
          <label>Hora de inicio:</label>
          <select name="startTime" onChange={handleChange}>
            {horasDelDia.map((hora, index) => (
              <option key={index} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hora de fin:</label>
          <select name="endTime" onChange={handleChange}>
            {horasDelDia.map((hora, index) => (
              <option key={index} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};
