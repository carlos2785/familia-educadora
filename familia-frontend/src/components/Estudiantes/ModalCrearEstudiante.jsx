import React,{useEffect,useState} from "react";
import axios from 'axios';
import { obtenerListaTodosEstudiantes } from "./funciones";

export const CrearEstudiante=({open1,close1,listaTodosEstudiantes,setListaTodosEstudiantes})=>{

    const [datosEstudiante,setDatosEstudiante]=useState([]);

    const handleObtenerDatosEstudiante=(e)=>{
        const { name, value } = e.target;//desestructuración de los elementos name y value de los inputs del obejto target del evento (e) onChange
        setDatosEstudiante({
            ...datosEstudiante,//copia las propiedades del datosEstudiantes
            [name]: value //actualiza todas las propiedades de datosEstudiantes:id, nombres, apellidos, grado,etc
          });
    }

    const handleCrearEstudiante=async(e)=>{
        e.preventDefault();

        try {
            await axios.post(`http://localhost:4000/estudiantes`, datosEstudiante);
            close1(); // cerrar la ventana modal
            obtenerListaTodosEstudiantes(setListaTodosEstudiantes);
        } catch (error) {
            console.error('Error al llamar a la API', error);
        }
    };

    return(
        <div className={`modal ${open1 ? 'show' : ''}`} tabIndex="-1" style={{ display: open1 ? 'block' : 'none' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Crear Estudiante</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={close1}></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="id">Documento</label>
                        <input type="number" className="form-control" id="id" name="id" 
                        onChange={handleObtenerDatosEstudiante}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos" name="apellidos" 
                        onChange={handleObtenerDatosEstudiante}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombres">Nombres</label>
                        <input type="text" className="form-control" id="nombres" name="nombres" 
                        onChange={handleObtenerDatosEstudiante}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="grado">Grado</label>
                        <input type="text" className="form-control" id="grado" name="grado" 
                        onChange={handleObtenerDatosEstudiante}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="id_padres">Id_Padres</label>
                        <input type="number" className="form-control" id="id_padres" name="id_padres" 
                        onChange={handleObtenerDatosEstudiante}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={close1}>Cerrar</button>
                    <button type="button" className="btn btn-success" onClick={handleCrearEstudiante}>Crear</button>
                </div>
                </div>
            </div>
        </div>
    );
}