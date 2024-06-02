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
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("https://organizando-que-es-gerundio.onrender.com/api/userDetails/" + userId, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt-token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("LA DATAAAAAAAAAAAAAAAAAAAAAAAAAA ESSSS :" + data);
          console.log(data.username);
          data.startTime = data.startTime.split(':').slice(0, 2).join(':')
          data.endTime = data.endTime.split(':').slice(0, 2).join(':')
          setUser(data);
          console.log(user);
          console.log(user.username);
        } else {
          console.error("Error en la respuesta");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const horasDelDia = [];
  for (let hora = 0; hora <= 23; hora++) {
    const horaStr = hora.toString().padStart(2, "0");
    horasDelDia.push(`${horaStr}:00`);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch("https://organizando-que-es-gerundio.onrender.com/api/users/" + userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt-token"),
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
          startTime: user.startTime + ":00",
          endTime: user.endTime + ":00",
        }),
      });
      if (response.ok) {
        console.log(response.json());
        window.location.href = "/profile";
      } else {
        window.alert("No se pudo registrar. Inténtelo de nuevo más tarde.");
      }
    } catch (error) {
      window.alert("Error en la solicitud:", error);
    }
  };

  return (
    <div class="myprofile">
      <h1>Mi Perfil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="username" defaultValue={user.username} onChange={handleChange} />
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" name="email" defaultValue={user.email} onChange={handleChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" defaultValue={user.password} onChange={handleChange} />
        </div>
        <div>
          <label>Hora de inicio:</label>
          <select name="startTime" defaultValue={user.startTime} onChange={handleChange}>
            {horasDelDia.map((hora, index) => (
              <option key={index} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hora de fin:</label>
          <select name="endTime" defaultValue={user.endTime} onChange={handleChange}>
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
