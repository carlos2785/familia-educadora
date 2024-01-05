import React,{ useState,useEffect } from "react";
import axios from 'axios';
import {obtenerListaTodosEstudiantes} from "./funciones";

export const VentanaModal = ({close,open,student,setListaTodosEstudiantes,listaTodosEstudiantes})=>{
    const [listaEstudiantes, setListaEstudiantes] = useState([]);
    const [nuevosDatos,setNuevosDatos]=useState({
        apellidos: student.apellidos,
        nombres: student.nombres,
        grado: student.grado,
        id_padres: student.id_padres,
    });

    useEffect(() => {
        if (open) {
            obtenerListaTodosEstudiantes(setListaEstudiantes);
        }
    }, [open]);
    //esta función toma el valor del input y le actualiza a lo que el usuario necesita
    //el name de cada input lo alamcena y luego con la función setNuevosDatos se actualizan todos 
    const handleInputChange=(e)=>{
        const { name, value } = e.target;
        setNuevosDatos({
            ...nuevosDatos,
            [name]: value
          });
    }
   
    const handleGuardarCambios=async(e)=>{
        e.preventDefault();

        try {
            await axios.put(`http://localhost:4000/estudiantes/${student.id}`, nuevosDatos);
            close(); // cerrar la ventana modal
            obtenerListaTodosEstudiantes(setListaTodosEstudiantes);
        } catch (error) {
            console.error('Error al llamar a la API', error);
        }
    };
    
    return (
        <div className={`modal ${open ? 'show' : ''}`} tabIndex="-1" style={{ display: open ? 'block' : 'none' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Editar Estudiante</h5>
                    <button type="button" className="btn-close" onClick={close} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {/* Aquí muestras los campos editables del estudiante */}
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos" name="apellidos" 
                        value={nuevosDatos.apellidos} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombres">Nombres</label>
                        <input type="text" className="form-control" id="nombres" name="nombres" 
                        value={nuevosDatos.nombres} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="grado">Nombres</label>
                        <input type="text" className="form-control" id="grado" name="grado" 
                        value={nuevosDatos.grado} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="id_padres">Nombres</label>
                        <input type="text" className="form-control" id="id_padres" name="id_padres" 
                        value={nuevosDatos.id_padres} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={close}>Cerrar</button>
                    <button type="button" className="btn btn-success" onClick={handleGuardarCambios}>Guardar cambios</button>
                </div>
                </div>
            </div>
        </div>
    );
};