import React,{useState, useEffect} from "react";
import {TablaPadres} from './TablaPadres';
import './padres.css'

export const ListarPadres=()=>{
    //const [listaTodosPadres, setListaTodosPadres] = useState({rows:[]}); // Inicializar como un array vacío
    //const [selectPadre,setSelectPadre]=useState([]);
    //const [id, setId] = useState('');

    /* useEffect(()=>{
        obtenerListaTodosPadres(setListaTodosPadres);
    },[setListaTodosPadres]); */

   /*  useEffect(()=>{
        setSelectPadre();
    },[setSelectPadre]); */

    return(
        <div className='container'>
            <div>
                <TablaPadres/>
            </div>
        </div>
    )
};