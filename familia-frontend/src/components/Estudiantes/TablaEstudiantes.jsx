import React, { useEffect,useMemo } from "react";
import { obtenerListaTodosEstudiantes } from "../../funciones/funciones";

export const TablaEstudiantes=({listaTodosEstudiantes,setListaTodosEstudiantes,selectGrado})=>{

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

    return(
        <div className="mt-3 mb-3 row row-cols-1 row-cols-md-1 g-4">
            <div>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Doc</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Grado</th>
                        <th scope="col">Id_padres</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estudiantesFiltrados.map((lista,id)=>(
                        <tr key={id}>
                                <td>{lista.id}</td>
                                <td>{lista.apellidos}</td>
                                <td>{lista.nombres}</td>
                                <td>{lista.grado}</td>
                                <td>{lista.id_padres}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}