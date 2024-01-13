import React,{useEffect,useState} from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import {obtenerListaTodosPadres} from './funciones';

export const CrearPadre=({open1,close1,todosPadres,setTodosPadres})=>{
    const [datosPadres,setDatosPadres]=useState([]);
    const [formData, setFormData] = useState({ // variable de estado para datos vacios del formulario
        id: '',
        apellidos: '',
        nombres: ''
      });
    
      const [errores, setErrores] = useState({//variable de estado para el manejo de errores en campos vacios del formulario
        id: '',
        apellidos: '',
        nombres: ''
      });
    const handleObtenerDatosPadres=(e)=>{
        const { name, value } = e.target;
        setDatosPadres({
            ...datosPadres,//copia las propiedades del datosEstudiantes
            [name]: value //actualiza todas las propiedades de datosEstudiantes:id, nombres, apellidos, grado,etc
          });
          setFormData({ // se actualizan los datos del form, para despues saber si están o no vacios
            ...formData,
            [name]: value,
          });
    }

    const handleCrearPadre=async (e)=>{
        e.preventDefault();
        // Validación
        const nuevosErrores = {};
        //pregunta por cada input si está o no vacio
        if (!formData.id.trim()) { //.trim() es un método de JavaScript que elimina los espacios en blanco al principio y al final de una cadena.
            nuevosErrores.id = '  El ID es requerido';
        }
        if (!formData.apellidos.trim()) {
            nuevosErrores.apellidos = '   Los apellidos son requeridos';
        }
        if (!formData.nombres.trim()) {
            nuevosErrores.nombres = '   Los nombres son requeridos';
        }
        // Actualizar estado de errores
        setErrores(nuevosErrores);
        if (Object.keys(nuevosErrores).length === 0) {//Object.keys() es una función en JavaScript que toma un objeto como argumento y devuelve un array con las claves (nombres de las propiedades) de ese objeto.
            try {
                Swal.showLoading();// aquí muestra el mensaje y la ventana
                await axios.post('http://localhost:4000/padres',datosPadres);
                Swal.close();
                close1(); // cerrar la ventana modal
                obtenerListaTodosPadres(setTodosPadres);
            } catch (error) {
                console.error('Error al crear el usuario',error);
                Swal.close();
            }
        }
    };

    //console.log(datosPadres);
    return (
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
                        {errores.id && <span className="error-span">{errores.id}</span>} {/*mostrar error campos vacios*/}
                        <input type="number" className="form-control" id="id" name="id"
                        onChange={handleObtenerDatosPadres}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        {errores.apellidos && <span className="error-span">{errores.apellidos}</span>}
                        <input type="text" className="form-control" id="apellidos" name="apellidos"
                        onChange={handleObtenerDatosPadres}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombres">Nombres</label>
                        {errores.nombres && <span className="error-span">{errores.nombres}</span>}
                        <input type="text" className="form-control" id="nombres" name="nombres" 
                        onChange={handleObtenerDatosPadres}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={close1}>Cerrar</button>
                    <button type="button" className="btn btn-success" onClick={handleCrearPadre}>Crear</button>
                </div>
                </div>
            </div>
        </div>
    )
}