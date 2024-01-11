import React,{useState, useEffect} from "react";
import {TablaPadres} from './TablaPadres';

export const ListarPadres=()=>{

    return(
        <div className='container'>
            <div className='mt-2 mb-2 row row-cols-1 row-cols-md-2 g-4'>
                {/*<BuscarGrado
                selectGrado={selectGrado}
                setSelectGrado={setSelectGrado}
                grados={grados}
                setGrados={setGrados}
                />*/}
            </div>
            <div>
                <TablaPadres
                /* listaTodosEstudiantes={listaTodosEstudiantes}
                setListaTodosEstudiantes={setListaTodosEstudiantes}
                selectGrado={selectGrado} */
                />
            </div>
        </div>
    )
};