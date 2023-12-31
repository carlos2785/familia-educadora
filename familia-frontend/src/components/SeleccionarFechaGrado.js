import React,{useState,useEffect} from 'react';

export const SeleccionarFechaGrado=()=>{
    const [fechas, setFechas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerFechasDesdeBackend = async () => {
          try {
            const respuesta = await fetch('http://localhost:4000/fechas');
            const datos = await respuesta.json();
            setFechas(datos);
            setLoading(false);
          } catch (error) {
            console.error('Error al obtener fechas desde el backend', error);
          }
        };
        obtenerFechasDesdeBackend();
        console.log(setFechas);
    }, []);


    return(
        <div className='container'>
            <div className="mt-3 mb-3 row row-cols-1 row-cols-md-3 g-4">
                <div>
                    <select className="form-select" aria-label="Default select example">
                        <option value={1}>Fecha</option>
                        <option value="1">2023-08-18</option>
                    </select>
                </div>
                <div>
                    <select className="form-select" aria-label="Default select example">
                        <option value={2}>Grado</option>
                        <option value="2">203</option>
                    </select>
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">Buscar</button>
                </div>
            </div>
        </div>
    )
}