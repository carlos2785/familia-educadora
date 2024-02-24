import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/Header/Header';
import { NotasPorGrados } from "./components/Notas/NotasPorGrados";
import { ListarEstudiantes } from "./components/Estudiantes/ListarEstudiantes";
import { ListarPadres } from './components/Padres/ListarPadres';
import { Registro } from './components/Registro/Registro';
import { Login } from './components/Login/Login';
import PrivateRoute from './routes/PrivateRoute';

const NotFound = () => {
  return <div>Página no encontrada</div>;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    console.log('Cerrando sesión...');
  };

  return (
    <Router>
      {isAuthenticated && <Header onLogout={handleLogout} />}
      <Switch>
        <Route exact path='/login'>
          {isAuthenticated ? <Redirect to='/registro' /> : <Login onLogin={handleLogin} />}
        </Route>
        {isAuthenticated && (
          <>
            <PrivateRoute exact path='/notas' component={NotasPorGrados} isAuthenticated={isAuthenticated} />
            <PrivateRoute exact path='/estudiantes' component={ListarEstudiantes} isAuthenticated={isAuthenticated} />
            <PrivateRoute exact path='/padres' component={ListarPadres} isAuthenticated={isAuthenticated} />
            <PrivateRoute exact path='/registro' component={Registro} isAuthenticated={isAuthenticated} />
          </>
        )}
        <Route exact path='/404' component={NotFound} />
        <Redirect to={isAuthenticated ? '/404' : '/login'} />
      </Switch>
    </Router>
  );
};

export { App };