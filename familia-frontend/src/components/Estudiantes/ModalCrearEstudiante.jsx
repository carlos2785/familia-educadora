import React,{useEffect,useState} from "react";
import axios from 'axios';
import { obtenerListaTodosEstudiantes } from "./funciones";
import Swal from 'sweetalert2';

export const CrearEstudiante=({open1,close1,listaTodosEstudiantes,setListaTodosEstudiantes})=>{

    const [datosEstudiante,setDatosEstudiante]=useState([]);
    const [formData, setFormData] = useState({ // variable de estado para datos vacios del formulario
        id: '',
        apellidos: '',
        nombres: '',
        grado:'',
        id_padres:''
      });
    
      const [errores, setErrores] = useState({//variable de estado para el manejo de errores en campos vacios del formulario
        id: '',
        apellidos: '',
        nombres: '',
        grado:'',
        id_padres:''
      });
    

    const handleObtenerDatosEstudiante=(e)=>{
        const { name, value } = e.target;//desestructuración de los elementos name y value de los inputs del obejto target del evento (e) onChange
        setDatosEstudiante({
            ...datosEstudiante,//copia las propiedades del datosEstudiantes
            [name]: value //actualiza todas las propiedades de datosEstudiantes:id, nombres, apellidos, grado,etc
          });
          setFormData({ // se actualizan los datos del form, para despues saber si están o no vacios
            ...formData,
            [name]: value,
          });
    }

    const handleCrearEstudiante=async(e)=>{
        e.preventDefault();
        // Validación
        const nuevosErrores = {};
        //pregunta por cada input si está o no vacio
        if (!formData.id.trim()) {
            nuevosErrores.id = '  El ID es requerido';
        }
        if (!formData.apellidos.trim()) {
            nuevosErrores.apellidos = '   Los apellidos son requeridos';
        }
        if (!formData.nombres.trim()) {
            nuevosErrores.nombres = '   Los nombres son requeridos';
        }
        if (!formData.grado.trim()) {
            nuevosErrores.grado = '   El grado es requerido';
        }
        if (!formData.id_padres.trim()) {
            nuevosErrores.id_padres = '   El Id padres es requerido';
        }

        // Actualizar estado de errores
        setErrores(nuevosErrores);

        // Enviar datos si no hay errores
        if (Object.keys(nuevosErrores).length === 0) {
            // Realizar acción de envío (puede ser una llamada a la API, etc.)
            try {
                Swal.showLoading();// aquí muestra el mensaje y la ventana
                await axios.post(`http://localhost:4000/estudiantes`, datosEstudiante);
                Swal.close();
                close1(); // cerrar la ventana modal
                obtenerListaTodosEstudiantes(setListaTodosEstudiantes);
            } catch (error) {
                console.error('Error al llamar a la API', error);
                Swal.close();
            }
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
                        {errores.id && <span className="error-span">{errores.id}</span>}{/*mostrar error campos vacios*/}
                        <input type="number" className="form-control" id="id" name="id"
                        onChange={handleObtenerDatosEstudiante}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        {errores.apellidos && <span className="error-span">{errores.apellidos}</span>}
                        <input type="text" className="form-control" id="apellidos" name="apellidos"
                        onChange={handleObtenerDatosEstudiante}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombres">Nombres</label>
                        {errores.nombres && <span className="error-span">{errores.nombres}</span>}
                        <input type="text" className="form-control" id="nombres" name="nombres" 
                        onChange={handleObtenerDatosEstudiante}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="grado">Grado</label>
                        {errores.grado && <span className="error-span">{errores.grado}</span>}
                        <input type="text" className="form-control" id="grado" name="grado"
                        onChange={handleObtenerDatosEstudiante}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="id_padres">Id_Padres</label>
                        {errores.id_padres && <span className="error-span">{errores.id_padres}</span>}
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