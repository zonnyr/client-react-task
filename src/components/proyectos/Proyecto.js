import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {
    
    // Obtener e state del formulario
    const proyectoC = useContext(proyectoContext)
    const { proyectoActual } = proyectoC

    // obtner la funcion del context
    const tareasContext = useContext(TareaContext)
    const { obtenerTareas } = tareasContext

    // funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        // fijar un proyecto acutal
        proyectoActual(id)

        // filtrar las tareas
        obtenerTareas(id)

    }

    return ( 
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => seleccionarProyecto(proyecto.id)}
            >
                {proyecto.name}
            </button>
        </li>
     );
}
 
export default Proyecto;