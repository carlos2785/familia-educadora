import React from "react";
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { NotasPorGrados } from "./components/Notas/NotasPorGrados";
import { ListarEstudiantes } from "./components/Estudiantes/ListarEstudiantes";
import {ListarPadres} from './components/Padres/ListarPadres';
import {Registro} from './components/Registro/Registro';
import {Login} from './components/Login/Login';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route path='/'>
                    <Header />
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