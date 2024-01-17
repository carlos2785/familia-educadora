import React, { useState } from 'react';
import './login.css';
import logoImage from '../Header/colegio.png'; // Reemplaza con el nombre de tu archivo de imagen


export const Login = () => {
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
    console.log(datosLogin);
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