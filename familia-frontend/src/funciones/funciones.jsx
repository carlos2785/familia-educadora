import axios from 'axios';

export const obtenerFecha=async (state)=>{
    try {
        //const peticionFecha = await axios.get('https://familia-educadora.vercel.app/fechas');
        const peticionFecha = await axios.get('http://localhost:4000/fechas');

        state(peticionFecha.data.rows);
        //console.log(peticionFecha.data.rows);
    } catch (error) {
        console.error('Error al obtener fechas:', error);
    }
};
export const obtenerGrado = async (state) => {
    try {
        const peticionGrado = await axios.get('http://localhost:4000/grados');
        state(peticionGrado.data.rows);
    } catch (error) {
        // Manejo de errores aquí
        console.error("Error al obtener los grados:", error);
    }
};
/* export const obtenerGrado=async(state)=>{
    const peticionGrado=await axios.get('http://localhost:4000/grados');
    state(peticionGrado.data.rows);
};
 */
export const obtenerListaTodosEstudiantes=async(state)=>{
    const peticionListaTodosEstudiantes=await axios.get('http://localhost:4000/estudiantes');
    state(peticionListaTodosEstudiantes.data);
    //console.log(peticionListaTodosEstudiantes.data);
}
