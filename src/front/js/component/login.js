import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://organizando-que-es-gerundio.onrender.com/api/users/" + username + "$" + password, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwt-token", data.token);
        localStorage.setItem("userId", data.userId);
        onLoginSuccess();
      } else {
        window.alert("Credenciales inválidas.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      window.alert("Ocurrió un error en la solicitud.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
