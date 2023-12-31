import React from "react";
import { Header } from './components/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { MostrarRegistro } from "./components/MostrarRegistro";

const App = () => {
    return (
        <Router>
            
            <Header />
            <Switch>
            {/*component es palabra propia y no tiene que ver con la carpeta components */}
            <Route exact path='/' component={MostrarRegistro} />
      </Switch>
        </Router>
    );
};

export { App };