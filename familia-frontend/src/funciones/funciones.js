import axios from 'axios';

export const obtenerFecha=async (state)=>{
    try {
        const peticionFecha = await axios.get('https://familia-educadora.vercel.app/fechas');

        // Formatear las fechas antes de establecer el estado
        const fechasFormateadas = peticionFecha.data.rows.map((fecha) => {
            const fechaFormateada = new Date(fecha.fecha);
            const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const fechaString = fechaFormateada.toLocaleDateString(undefined, opcionesFecha);
            
            return {
                ...fecha,
                fecha: fechaString,
            };
        });

        state(fechasFormateadas);
        //console.log(fechasFormateadas);
    } catch (error) {
        console.error('Error al obtener fechas:', error);
    }
};
export const obtenerGrado=async(state)=>{
    const peticionGrado=await axios.get('https://familia-educadora.vercel.app/grados');
    state(peticionGrado.data.rows);
    //console.log(peticionGrado.data.rows);
};
