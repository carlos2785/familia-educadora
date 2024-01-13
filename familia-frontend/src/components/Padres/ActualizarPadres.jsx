import React,{useState,useEffect} from 'react';
import { obtenerListaTodosPadres } from './funciones';
import axios from 'axios';
import Swal from 'sweetalert2';

export const ActualizarPadres=({open,close,setSelectPadre,selectPadre,modalActualizar,setModalActualizar,todosPadres,setTodosPadres})=>{
    const [nuevosDatosPadres,setNuevosDatosPadres]=useState({
        apellidos: selectPadre.apellidos, //propiedad name del input
        nombres: selectPadre.nombres,
    });
    
    const [errores, setErrores] = useState({//variable de estado para el manejo de errores en campos vacios del formulario
    apellidos: '',
    nombres: ''
    });

    const handleNuevosDatosPadres=(e)=>{
        const {name, value}=e.target;
        setNuevosDatosPadres({
            ...nuevosDatosPadres,
            [name]: value
        });
    };
    useEffect(() => {
        if (open) {
            obtenerListaTodosPadres(setTodosPadres);//trae los datos del estudiante y los pasa al value del input
        }
    }, [open,setTodosPadres]);
    
    const handleActualizarDatosPadres=async(e)=>{
        e.preventDefault();
        const actualizarErrores = {};
        if(!nuevosDatosPadres.apellidos.trim()){
            actualizarErrores.apellidos='Los apellidos son requeridos';
        };
        if(!nuevosDatosPadres.nombres.trim()){
            actualizarErrores.nombres='Los nombres son requeridos';
        };
        // Actualizar estado de errores
        setErrores(actualizarErrores);
        // Actualizar datos si no hay errores
        if(Object.keys(actualizarErrores).length===0){
            try {
                Swal.showLoading();
                await axios.put(`http://localhost:4000/padres/${selectPadre.id}`,nuevosDatosPadres);
                close();
                obtenerListaTodosPadres(setTodosPadres);
                Swal.close();
            } catch (error) {
                console.error('Error al actualizar los datos',error);
                Swal.close();
            }
        };
    };
    
    return (
        <div className={`modal ${open ? 'show' : ''}`} tabIndex="-1" style={{ display: open ? 'block' : 'none' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Editar Estudiante</h5>
                    <button type="button" className="btn-close" aria-label="Close"
                    onClick={close}
                    ></button>
                </div>
                <div className="modal-body">
                    {/* Aquí muestras los campos editables del padre */}
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        {errores.apellidos && <span className="error-span">{errores.apellidos}</span>}
                        <input type="text" className="form-control" id="apellidos" name="apellidos" 
                        value={nuevosDatosPadres.apellidos}
                        onChange={handleNuevosDatosPadres}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombres">Nombres</label>
                        {errores.nombres && <span className="error-span">{errores.nombres}</span>}
                        <input type="text" className="form-control" id="nombres" name="nombres" 
                        value={nuevosDatosPadres.nombres}
                        onChange={handleNuevosDatosPadres}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={close}>Cerrar</button>
                    <button type="button" className="btn btn-success" onClick={handleActualizarDatosPadres}>Guardar cambios</button>
                </div>
                </div>
            </div>
        </div>
    );
};