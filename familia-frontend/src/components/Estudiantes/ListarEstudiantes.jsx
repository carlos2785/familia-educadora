import React,{useState,useEffect} from 'react';
import { BuscarGrado } from './BuscarGrado';
import { TablaEstudiantes } from './TablaEstudiantes';
import { obtenerGrado } from '../../funciones/funciones';

export const ListarEstudiantes=()=>{
    const [listaTodosEstudiantes,setListaTodosEstudiantes]=useState([]);
    const [selectGrado, setSelectGrado] = useState();//variable de estado para guardar el grado seleccionado
    const [grados, setGrados] = useState([]);//variable de estado para guardar los grados
    
    useEffect(()=>{
        //obtenerFecha(setFechas);
        obtenerGrado(setGrados);
    },[])

    return(
        <div className='container'>
            <div className='mt-2 mb-2 row row-cols-1 row-cols-md-2 g-4'>
                <BuscarGrado
                selectGrado={selectGrado}
                setSelectGrado={setSelectGrado}
                grados={grados}
                setGrados={setGrados}
                />
            </div>
            <div>
                <TablaEstudiantes
                listaTodosEstudiantes={listaTodosEstudiantes}
                setListaTodosEstudiantes={setListaTodosEstudiantes}
                selectGrado={selectGrado}
                />
            </div>
        </div>
    );
}