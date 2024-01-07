import React, { useEffect,useMemo,useState } from "react";
import { obtenerListaTodosEstudiantes } from "./funciones";
import './estudiantes.css'
import { VentanaModal } from "./VentanaModal";
import { CrearEstudiante } from "./ModalCrearEstudiante";

export const TablaEstudiantes=({listaTodosEstudiantes,setListaTodosEstudiantes,selectGrado})=>{

    const [mostrarModal, setMostrarModal]=useState(false);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
    const [modalCrear,setModalCrear]=useState(false);

    useEffect(()=>{
        obtenerListaTodosEstudiantes(setListaTodosEstudiantes);
    },[setListaTodosEstudiantes]); 

    //console.log("Datos de listaTodosEstudiantes:", listaTodosEstudiantes);    
    const estudiantesFiltrados = useMemo(() => {
        if (!selectGrado || selectGrado === 'Grado') {
            return listaTodosEstudiantes;
        } else {
            return listaTodosEstudiantes.filter((lista) => lista.grado === selectGrado);
        }
    }, [listaTodosEstudiantes, selectGrado]);

    const handleMostrarModal=(estudiante)=>{
        setEstudianteSeleccionado(estudiante);
        setMostrarModal(true);
    }
    //console.log(estudianteSeleccionado,mostrarModal);
    const handleCerrarModal=()=>{
        setEstudianteSeleccionado(null);
        setMostrarModal(false);
    }
    
    const handleBotonCrearEstudiante=()=>{
        setModalCrear(true);
    }
    const handleCerrarModalCrear=()=>{
        setModalCrear(false);
    };

    return(
        <>
            <div>
                <button type="button" className="CrearBoton"
                onClick={handleBotonCrearEstudiante}
                >Crear</button>
            </div>
            <div className="mt-3 mb-3 row row-cols-1 row-cols-md-1 g-4">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Doc</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Grado</th>
                            <th scope="col">Id_padres</th>
                            <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantesFiltrados.map((estudiante,id)=>(
                            <tr key={id}>
                                    <td>{estudiante.id}</td>
                                    <td>{estudiante.apellidos}</td>
                                    <td>{estudiante.nombres}</td>
                                    <td>{estudiante.grado}</td>
                                    <td>{estudiante.id_padres}</td>
                                    <td>
                                        <button type="button" className="btn btn-warning"
                                        onClick={()=>handleMostrarModal(estudiante)}
                                        >Actualizar</button>
                                        <button type="button" className="btn btn-danger">Eliminar</button>
                                    </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    {mostrarModal && estudianteSeleccionado && (
                    <VentanaModal
                    student={estudianteSeleccionado}
                    close={handleCerrarModal}
                    open={mostrarModal}
                    listaTodosEstudiantes={listaTodosEstudiantes}
                    setListaTodosEstudiantes={setListaTodosEstudiantes}
                    />  
                    )}
                    {modalCrear && (
                    <CrearEstudiante
                    open1={modalCrear}
                    close1={handleCerrarModalCrear}
                    listaTodosEstudiantes={listaTodosEstudiantes}
                    setListaTodosEstudiantes={setListaTodosEstudiantes}
                    />  
                    )}
                </div>
            </div>
        </>
    );
}