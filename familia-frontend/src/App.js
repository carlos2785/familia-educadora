import React from "react";
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { NotasPorGrados } from "./components/Notas/NotasPorGrados";
import { ListarEstudiantes } from "./components/Estudiantes/ListarEstudiantes";
import {ListarPadres} from './components/Padres/ListarPadres';
import {Registro} from './components/Registro/Registro';

const App = () => {
    return (
        <Router>
            
            <Header />
            <Switch>
            {/*component es palabra propia y no tiene que ver con la carpeta components */}
            <Route exact path='/notas' component={NotasPorGrados} />
            <Route exact path='/estudiantes' component={ListarEstudiantes} />
            <Route exact path='/padres' component={ListarPadres}/>
            <Route exact path='/registro' component={Registro}/>
      </Switch>
        </Router>
    );
};

export { App };