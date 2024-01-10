import React,{useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const BuscarNotas=({ selectFecha,selectGrado})=>{

    const [datos, setDatos] = useState([]);


    const handleBotonBuscar=async(e)=>{
        e.preventDefault();

        try {
            Swal.showLoading();// aquí muestra el mensaje y la ventana
            const peticionConsulta=await axios.get('http://localhost:4000/consulta',{
                params: {grado:selectGrado,fecha:selectFecha}
            });
            Swal.close();
            setDatos(peticionConsulta.data.rows);  
        } catch (error) {
            console.error('Error al llamar a la API', error);
            Swal.close();
        }
 
    }



    return(
        <div className='containerBuscarNotas'>
            <div className="mt-3 mb-3 row row-cols-1 row-cols-md-1 g-4" >
                    <button className="btn btn-primary" type="submit"
                    onClick={handleBotonBuscar}
                    >Buscar</button>
            </div>
            <div className="mt-3 mb-3 row row-cols-1 row-cols-md-1 g-4">
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Doc</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Grado</th>
                            <th scope="col">Nota</th>
                            <th scope="col">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((dato,index)=>(
                            <tr key={index}>
                                <td>{dato.id_estudiante}</td>
                                <td>{dato.apellidos_estudiante}</td>
                                <td>{dato.nombres_estudiante}</td>
                                <td>{dato.grado}</td>
                                <td>{dato.nota_taller}</td>
                                <td>{dato.fecha_taller}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}