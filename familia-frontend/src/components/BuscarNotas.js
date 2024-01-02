import React,{useState,useEffect} from 'react';


export const BuscarNotas=({ selectFecha, setSelectFecha, selectGrado, setSelectGrado})=>{

    useEffect(() => {
        console.log('selectFecha en BuscarNotas:', selectFecha,selectGrado);
    }, [selectFecha,selectGrado]);  
    /* useEffect(() => {
        console.log('selectGrado en BuscarNotas:', selectGrado);
    }, [selectGrado]);  */ 

    return(
        <div className='containerBuscarNotas'>
            <div className="mt-3 mb-3 row row-cols-1 row-cols-md-1 g-4" >
                    <button className="btn btn-primary" type="submit">Buscar</button>
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
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>601</td>
                            <td>5</td>
                            <td>2023-10-8</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}