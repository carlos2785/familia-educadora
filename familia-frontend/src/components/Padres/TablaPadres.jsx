import React,{useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {CrearPadre} from './CrearPadre';
import {obtenerListaTodosPadres} from './funciones';
import {ActualizarPadres} from './ActualizarPadres'

export const TablaPadres=()=>{ // el {} se usa para acceder a la propiedades de la variable de estado recibida
    const [selectPadre,setSelectPadre]=useState(0);
    const [padresFiltrados,setPadresFiltrados]=useState({ data: [] });// se inicializa como un array de objetos vacio, para que cuando cargue a pagina no genere error
    const [modalCrear,setModalCrear]=useState(false);
    const [modalActualizar,setModalActualizar]=useState(false);
    const [todosPadres,setTodosPadres]=useState([]);

    useEffect(()=>{
        obtenerListaTodosPadres(setTodosPadres);
    },[setTodosPadres]);

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
            Swal.fire({
                icon: 'error',
                title: 'Documento no encontrado',
                text: 'Por favor, ingrese un Documento válido.',
            });
        }
    };

    const listaPadres=padresFiltrados.data;

    const handleBotonCrearPadres=()=>{
        setModalCrear(true);
    };
    const handleCerrarModalCrearPadres=()=>{
        setModalCrear(false);
    }
    const handleActualizarPadres=(padre)=>{
        setModalActualizar(true);
        setSelectPadre(padre)
    };

    const handleCerrarModalActualizarPadres=()=>{
        setModalActualizar(false);
         // Limpia el padre seleccionado en el resultado de búsqueda
        setSelectPadre(0);
        setPadresFiltrados({ data: [] });
    };
    
    const handleEliminarPadres=async(e,selectPadre)=>{
        e.preventDefault();
        try {
            Swal.showLoading();
            await axios.delete(`http://localhost:4000/padres/${selectPadre}`);
            Swal.close();setSelectPadre(0);
            Swal.fire({
                icon: 'success',
                title: 'Uusario eliminado',
                text: 'El proceso se ha ejecutado correctamente.',
            });
            setPadresFiltrados({ data: [] });
        } catch (error) {
            console.error('Error al eliminar usuario', error);
            Swal.close();
        }
    }
    

    return(
        <div>
            <div>
                <button type="button" className="CrearBoton"
                onClick={handleBotonCrearPadres}
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
                                        onClick={()=>handleActualizarPadres(padre)}
                                        >Actualizar</button>
                                        <button type="button" className="btn btn-danger"
                                         onClick={(e) => handleEliminarPadres(e,padre.id)}// necesita como argumento el evento(e) y retorna el e y el id
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
                    todosPadres={todosPadres}
                    setTodosPadres={setTodosPadres}
                    />
                    )}
                    {modalActualizar&& selectPadre && (//variable de estado para mostrar modal y variable de estado para seleccionar estudiante
                    <ActualizarPadres
                    open={modalActualizar}
                    close={handleCerrarModalActualizarPadres}
                    setSelectPadre={setSelectPadre}
                    selectPadre={selectPadre}
                    todosPadres={todosPadres}
                    setTodosPadres={setTodosPadres}
                    />
                    )}
                </div>
            </div>
        </div>
    )
};