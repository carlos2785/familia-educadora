import React,{useState,useEffect,useRef} from 'react';
import './registro.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Registro=()=>{
    const [fechaActual, setFechaActual] = useState('');
    const [docPadre,setDocPadre]=useState(null);
    const [estudiantesHijos,setEstudiantesHijos]=useState([]);
    const inputRef = useRef(null);//Utiliza la referencia para pocicionar el cursor en el input

    useEffect(() => {
        // Obtener la fecha actual y formatearla como 'YYYY-MM-DD'
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const fechaFormato = `${year}-${month}-${day}`;
    
        // Actualizar el estado con la fecha formateada
        setFechaActual(fechaFormato);
        inputRef.current.focus();//pone el cursor en el input del docuemnto del padre
    }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez al montar el componente
    
      
      const handleObtenerDocumentoPadre = async (e) => {
        if (e.key === 'Enter') {//cuando se presione la tecla enter ejecuta el get
          e.preventDefault();
          const nuevoDocPadre = e.target.value;//toma el documento digitado
    
          try {
            Swal.showLoading();
            const peticionRegistro = await axios.get(`http://localhost:4000/estudiantes/${nuevoDocPadre}`);
            setEstudiantesHijos(peticionRegistro.data);
            Swal.close();
            // Actualizar el estado del documento del padre de manera directa
            setDocPadre(nuevoDocPadre);
          } catch (error) {
            console.error('Ha ocurrido un error al obtener los estudiantes', error);
            Swal.close();
          }
        }
      };

      console.log(estudiantesHijos);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group text-center mb-3">
                        <label htmlFor="documentoAcudiente" className="bold-label">Documento Acudiente</label>
                        <input type="text" className="form-control" id="documentoAcudiente" placeholder="Ingrese el documento del acudiente" 
                        onKeyUp={handleObtenerDocumentoPadre}
                        defaultValue={docPadre === null ? '' : docPadre}
                        ref={inputRef}//aquí le indica que a ese input debe ponerle el cursor
                        />
                    </div>

                    <div className="form-group text-center mb-3">
                        <label className="bold-label">Estudiantes</label>
                        {estudiantesHijos.map((hijo,id)=>(
                        <label key={id} className='label-registro'>
                            {hijo.apellidos} {' '}
                            {hijo.nombres} {' '}
                            {hijo.grado}
                        </label>
                        ))}
                    {/* Aquí puedes agregar tu lista de estudiantes, por ejemplo, un componente de lista o cualquier otro elemento */}
                    </div>

                    <div className="form-group text-center mb-3">
                        <label htmlFor="fecha" className="bold-label">Fecha</label>
                        <input type="date" className="form-control" id="fecha" value={fechaActual} readOnly />
                    </div>

                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Registrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}