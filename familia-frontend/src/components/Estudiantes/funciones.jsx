import axios from 'axios';
import Swal from 'sweetalert2';

export const obtenerFecha=async (setFechas)=>{
    try {
        //const peticionFecha = await axios.get('https://familia-educadora.vercel.app/fechas');
        const peticionFecha = await axios.get('http://localhost:4000/fechas');

        setFechas(peticionFecha.data.rows);
        //console.log(peticionFecha.data.rows);
    } catch (error) {
        console.error('Error al obtener fechas:', error);
    }
};
export const obtenerGrado = async (setGrados) => {
    try {
        const peticionGrado = await axios.get('http://localhost:4000/grados');
        setGrados(peticionGrado.data.rows);
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
export const obtenerListaTodosEstudiantes=async(setListaTodosEstudiantes)=>{
    try {
        Swal.showLoading();// aquí muestra el mensaje y la ventana
        const peticionListaTodosEstudiantes=await axios.get('http://localhost:4000/estudiantes');
        Swal.close();
        setListaTodosEstudiantes(peticionListaTodosEstudiantes.data);
    } catch (error) {
        console.error("Error al obtener los grados:", error);
        Swal.close();
    }
};