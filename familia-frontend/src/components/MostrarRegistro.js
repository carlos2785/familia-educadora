import React,{useState,useEffect} from 'react';
import { BuscarNotas } from './BuscarNotas';
import { obtenerFecha, obtenerGrado } from '../funciones/funciones';


export const MostrarRegistro=()=>{

    const [selectFecha, setSelectFecha] = useState();//variable de estado para guardar la fecha seleccionada
    const [selectGrado, setSelectGrado] = useState();//variable de estado para guardar el grado seleccionado
    const [fechas, setFechas] = useState([]);//variable de estado para guardar las fechas
    const [grados, setGrados] = useState([]);//variable de estado para guardar los grados
    

    useEffect(()=>{
        obtenerFecha(setFechas);
        //obtenerGrado(setGrados);
    },[])
    useEffect(()=>{
        //obtenerFecha(setFechas);
        obtenerGrado(setGrados);
    },[])

    //función que va dentro del onClick
    const handleSetSelectFecha=(e)=>{
        const SelectFecha=e.target.value;//si selecciona una lista dentro del select, toma ese valor y lo guarda en la variable de estado
        setSelectFecha(SelectFecha);
        //console.log(selectFecha);
    }
    const handleSetSelectGrado=(e)=>{
        const SelectGrado=e.target.value;//si selecciona una lista dentro del select, toma ese valor y lo guarda en la variable de estado
        setSelectGrado(SelectGrado);
    }

    return(
        <div className='container'>
            <div className='container'>
                <div className="mt-2 mb-2 row row-cols-1 row-cols-md-2 g-4">
                    <div>
                        <label>
                            Fecha del taller:
                            <select className="form-select" aria-label="Default select example"
                            value={selectFecha} //aquí se guarda la fecha seleccionada
                            onChange={handleSetSelectFecha}//el evento onChange permite manejar el evento de 
                            //seleccionar la fecha
                            >
                                <option >Fecha</option>
                                {fechas.map((fecha, index) => (
                                    <option key={index} value={fecha.fecha}>{fecha.fecha}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Selecciona el grado:
                            <select className="form-select" aria-label="Default select example"
                            value={selectGrado} //aquí se guarda la fecha seleccionada
                            onChange={handleSetSelectGrado}
                            >
                                <option >Grado</option>
                                {grados.map((grado, index)=>(
                                    <option key={index} value={grado.grado}>{grado.grado}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
            </div>
            <div>
            <BuscarNotas
                selectFecha={selectFecha}
                setSelectFecha={setSelectFecha}
                selectGrado={selectGrado}
                setSelectGrado={setSelectGrado}
            />
            </div>
        </div> 
    );
}