import React, { useState } from 'react';
import './login.css';
import axios from 'axios'
import logoImage from '../Header/colegio.png'; // Reemplaza con el nombre de tu archivo de imagen
import { useHistory } from 'react-router-dom';

export const Login = ({ onLogin }) => {
  const history = useHistory(); // manejo del historial de navegación
  const [datosLogin,setDatosLogin]=useState({ // variable de estado para datos vacios del formulario
    username: '',
    password: ''
  });
  
  const handleDatosLogin=(e)=>{
    const {name,value}=e.target;
    setDatosLogin({
      ...datosLogin,
      [name]:value
    });
  };

    
  const handleIngresar=async(e)=>{
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:4000/login', datosLogin);
      if (response.status === 200) {
        const data = response.data;
        // Almacena el token en el localStorage
        localStorage.setItem('token', data.token);
        // Llama a la función onLogin del componente padre (App.js)
        onLogin(data.token);
        // Redirige a la ruta deseada, por ejemplo, '/otra-ruta'
        history.push('/registro'); // Asegúrate de tener 'history' disponible (puedes usar useHistory hook de React Router)
      } else {
        // Manejar errores de autenticación
        console.error('Error al iniciar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };
  
  return (
    <div className="login-container">
        <div className="login-box">
        <div className="logo-container">
            <img src={logoImage} alt="Logo" style={{ width: '130px' }} />
        </div>
        <form className="login-form">
            <label htmlFor="username" style={{ fontWeight: 'bold' }}>Usuario:</label>
            <input type="text" id="username" name="username" 
            onChange={handleDatosLogin}/>

            <label htmlFor="password" style={{ fontWeight: 'bold' }}>Contraseña:</label>
            <input type="password" id="password" name="password" 
            onChange={handleDatosLogin}/>

            <button type="submit"
            onClick={handleIngresar}
            >Ingresar</button>
        </form>
        </div>
    </div>
  );
};