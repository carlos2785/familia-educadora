import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/Header/Header';
import { NotasPorGrados } from "./components/Notas/NotasPorGrados";
import { ListarEstudiantes } from "./components/Estudiantes/ListarEstudiantes";
import { ListarPadres } from './components/Padres/ListarPadres';
import { Registro } from './components/Registro/Registro';
import { Login } from './components/Login/Login';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si el usuario tiene un token almacenado
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = (token) => {
    // Almacena el token en el localStorage y actualiza el estado de autenticación
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Limpiar el token almacenado y actualizar el estado de autenticación
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Redirigir a la página de inicio de sesión (Login)
    window.location.href = '/login';
    console.log('Cerrando sesión...');
  };

  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login onLogin={handleLogin} />
        </Route>
        <Route path='/'>
          <Header onLogout={handleLogout} />
          <Switch>
            <PrivateRoute
              path='/notas'
              component={NotasPorGrados}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path='/estudiantes'
              component={ListarEstudiantes}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path='/padres'
              component={ListarPadres}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path='/registro'
              component={Registro}
              isAuthenticated={isAuthenticated}
            />
            <Route exact path='/' component={Registro} />
            <Redirect to='/' />
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
};

export { App };