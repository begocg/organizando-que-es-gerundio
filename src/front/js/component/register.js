import React, { useState } from "react";

const Register = ({ onRegistrationSuccess }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^[a-zA-Z0-9]*$/;
        return re.test(String(password));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError("Ingrese un correo electrónico válido.");
            return;
        }

        // Validar contraseña
        if (!validatePassword(password)) {
            setPasswordError("La contraseña solo puede contener letras y números.");
            return;
        }

        setEmailError("");
        setPasswordError("");

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
                window.alert("No se pudo registrar. Inténtelo de nuevo más tarde.");
            }
        } catch (error) {
            // Error en la solicitud
            window.alert("Error en la solicitud:", error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" required />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;
