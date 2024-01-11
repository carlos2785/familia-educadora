import React,{useState,useEffect} from 'react';
import {obtenerListaTodosPadres} from './funciones';
import Swal from 'sweetalert2';

export const TablaPadres=()=>{
    const [listaTodosPadres,setListaTodosPadres]=useState([]); 

    useEffect(()=>{
        obtenerListaTodosPadres(setListaTodosPadres);
    },[setListaTodosPadres]);

    const listaPadres=listaTodosPadres;

    return(
        <div>
            <div className="mt-3 mb-3 row row-cols-1 row-cols-md-1 g-4">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Doc</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Nombres</th>
                            <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {listaPadres.map((padre,id)=>(
                            <tr key={id}>
                                    <td>{padre.id}</td>
                                    <td>{padre.apellidos}</td>
                                    <td>{padre.nombres}</td>
                                    <td>
                                        <button type="button" className="btn btn-warning"
                                        //onClick={()=>handleMostrarModal(estudiante)}
                                        >Actualizar</button>
                                        <button type="button" className="btn btn-danger"
                                         //onClick={(e) => handleEliminarEstudiante(e,estudiante.id)}// necesita como argumento el evento(e) y retorna el e y el id
                                        >Eliminar</button>
                                    </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};