import React,{useEffect,useState} from "react";

export const CrearPadre=({open1,close1})=>{
    const [datosPadres,setDatosPadres]=useState([]);

    const handleObtenerDatosPadres=(e)=>{
        const { name, value } = e.target;
        setDatosPadres({
            ...datosPadres,//copia las propiedades del datosEstudiantes
            [name]: value //actualiza todas las propiedades de datosEstudiantes:id, nombres, apellidos, grado,etc
          });
    }

    console.log(datosPadres);
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
                        {/* {errores.id && <span className="error-span">{errores.id}</span>}mostrar error campos vacios */}
                        <input type="number" className="form-control" id="id" name="id"
                        onChange={handleObtenerDatosPadres}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        {/* {errores.apellidos && <span className="error-span">{errores.apellidos}</span>} */}
                        <input type="text" className="form-control" id="apellidos" name="apellidos"
                        onChange={handleObtenerDatosPadres}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombres">Nombres</label>
                        {/* {errores.nombres && <span className="error-span">{errores.nombres}</span>} */}
                        <input type="text" className="form-control" id="nombres" name="nombres" 
                        onChange={handleObtenerDatosPadres}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={close1}>Cerrar</button>
                    {/* <button type="button" className="btn btn-success" onClick={handleCrearEstudiante}>Crear</button> */}
                </div>
                </div>
            </div>
        </div>
    )
}