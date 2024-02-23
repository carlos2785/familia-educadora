import React from "react";
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { NotasPorGrados } from "./components/Notas/NotasPorGrados";
import { ListarEstudiantes } from "./components/Estudiantes/ListarEstudiantes";
import { ListarPadres } from './components/Padres/ListarPadres';
import { Registro } from './components/Registro/Registro';
import { Login } from './components/Login/Login';

const App = () => {
    const handleLogout = () => {
        // Limpiar el token almacenado
        localStorage.removeItem('token');
        // Redirigir a la página de inicio de sesión (Login)
        window.location.href = '/login';  // Usa window.location.href para una redirección inmediata y evitar problemas de enrutamiento
        console.log('Cerrando sesión...');
    };

    return (
        <Router>
            <Switch>
                <Route path='/login'>
                    {/* Pasa la función handleLogout al componente Login */}
                    <Login onLogin={(token) => console.log('Token recibido:', token)} />
                </Route>
                <Route path='/'>
                    {/*<Header onLogout={(history) => handleLogout(history)} />*/}
                    {/*<Header onLogout={() => handleLogout()} />*/}
                    <Header onLogout={handleLogout} />
                    <Switch>
                        <Route exact path='/' component={Registro} />
                        <Route exact path='/notas' component={NotasPorGrados} />
                        <Route exact path='/estudiantes' component={ListarEstudiantes} />
                        <Route exact path='/padres' component={ListarPadres} />
                        <Route exact path='/registro' component={Registro} />
                        <Redirect to='/' />
                    </Switch>
                </Route>
            </Switch>
        </Router>
    );
};

export { App };