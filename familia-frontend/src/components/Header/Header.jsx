import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Header.css'

export const Header =({ onLogout })=>{
    const history = useHistory();
      
    return(
        // El siguiente código es un menú de boostrap 
        <nav className="navbar bg-primary border-bottom border-body navbar-expand-lg" data-bs-theme="dark">
            <div className="container-fluid">
                {/* Escudo del colegio al lado izquierdo */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZ_oDoKhO-qm1BUpxtBffOsGsCZ-RIy4je4a49Bit1A&s" alt="Escudo Colegio" className="img-fluid" style={{ marginRight: '15px' }} />
                
                <NavLink className="navbar-brand" to="/">Inicio</NavLink>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact aria-current="page" to="/registro">Registro</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact aria-current="page" to="/notas">Notas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact aria-current="page" to="/estudiantes">Estudiantes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact aria-current="page" to="/padres">Padres</NavLink>
                        </li>
                    </ul>
                    
                    {/* Mover la opción "Cerrar Sesión" a la derecha */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a
                            href="/cerrar-sesion"
                            className="nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                onLogout();
                            }}
                        >
                            Cerrar Sesión
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
