import React, { useState } from "react";

const Register = ({ onRegistrationSuccess }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://organizando-que-es-gerundio.onrender.com/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("jwt-token", data.token);
                localStorage.setItem("userId", data.userId);
                onRegistrationSuccess();
            } else {
                // La solicitud falló, mostramos un mensaje de error
                console.error("No se pudo registrar. Inténtelo de nuevo más tarde.");
            }
        } catch (error) {
            // Error en la solicitud
            console.error("Error en la solicitud:", error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;
