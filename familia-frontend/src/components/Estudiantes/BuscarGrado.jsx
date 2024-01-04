import React from 'react';


export const BuscarGrado=({selectGrado,setSelectGrado,grados})=>{

    const handleSetSelectGrado=(e)=>{
        const SelectGrado=e.target.value;//si selecciona una lista dentro del select, toma ese valor y lo guarda en la variable de estado
        setSelectGrado(SelectGrado);
    }
    
    return(
        <>
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
        </>
        
    );
}