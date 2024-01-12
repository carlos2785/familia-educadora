import React,{useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {CrearPadre} from './CrearPadre';

export const TablaPadres=()=>{ // el {} se usa para acceder a la propiedades de la variable de estado recibida
    const [selectPadre,setSelectPadre]=useState(0);
    const [padresFiltrados,setPadresFiltrados]=useState({ data: [] });// se inicializa como un array de objetos vacio, para que cuando cargue a pagina no genere error
    const [modalCrear,setModalCrear]=useState(false);

    const handleObtenerIdPadre=(e)=>{
        setSelectPadre(e.target.value);
    };


    const id=selectPadre;
    const handleBuscarIdPadre=async(e)=>{
        e.preventDefault();

        if (!id) {
            Swal.fire({
                icon: 'error',
                title: 'Campo Vacío',
                text: 'Por favor, ingrese un ID antes de hacer clic en Buscar.',
            });
            return;
        }
        try {
            Swal.showLoading();
            const peticionPadresId=await axios.get(`http://localhost:4000/padres/${id}`);
            Swal.close();
            setPadresFiltrados({ data: peticionPadresId.data || [] });
            //console.log(peticionPadresId.data);
        } catch (error) {
            console.error('Error al obtener los datos',error);
            console.log('Mostrando alerta de documento no encontrado');
            Swal.fire({
                icon: 'error',
                title: 'Documento no encontrado',
                text: 'Por favor, ingrese un Documento válido.',
            });
        }
    };

    const listaPadres=padresFiltrados.data;

    const handleBotonCrearEstudiante=()=>{
        setModalCrear(true);
    };
    const handleCerrarModalCrearPadres=()=>{
        setModalCrear(false);
    }
    
    return(
        <div>
            <div>
                <button type="button" className="CrearBoton"
                onClick={handleBotonCrearEstudiante}
                >Crear</button>
            </div>
            <div className="mt-2 mb-2 row row-cols-1 row-cols-md-2 g-2 align-items-center">
                <div className="col-md-6">
                    <label className="label-input">
                        Digita el documento del acudiente:
                    </label>
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            id="id"
                            name="id"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={handleObtenerIdPadre}
                        />
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={handleBuscarIdPadre}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-2 mb-2 row row-cols-1 row-cols-md-1 g-4">
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
                    {modalCrear && (
                    <CrearPadre
                    open1={modalCrear}
                    close1={handleCerrarModalCrearPadres}
                    />
                    )}
                </div>
            </div>
        </div>
    )
};