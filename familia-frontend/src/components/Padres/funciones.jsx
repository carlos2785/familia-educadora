import axios from 'axios';
import Swal from 'sweetalert2';

export const obtenerListaTodosPadres=async(setListaTodosPadres)=>{

    try {
        Swal.showLoading();
        const peticionListaTodosPadres=await axios.get('http://localhost:4000/padres');
        Swal.close();
        setListaTodosPadres(peticionListaTodosPadres.data);
    } catch (error) {
        console.error('Error al obtener los datos',error);
        Swal.close();
    }
}
