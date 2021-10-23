import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {
    
    // Extraer proyectos
    const proyectoC = useContext(proyectoContext)
    const { proyecto } = proyectoC

    // obtner la funcion del context
    const tareasContext = useContext(TareaContext)
    const { 
        eliminarTareas, 
        obtenerTareas, 
        actualizarTarea,
        guardaTareaActual 
    } = tareasContext

    // extraer el proyecto
    const [proyectoActual] = proyecto

    // eliminar tarea
    const tareaEliminar = id => {
        eliminarTareas(id)
        obtenerTareas(proyectoActual.id)
    }

    // editar tarea
    const cambiarEstado = tarea => {
        if (tarea.state) {
            tarea.state = 0;
        } else {
            tarea.state = 1
        }
        actualizarTarea(tarea)
    }

    const seleccionarTarea = tarea => {
        guardaTareaActual(tarea)
    }

    return ( 
        <li className='tarea sombra'>
            <p>{tarea.name}</p>

            <div className='estado'>
                {
                    tarea.state === 1
                    ? 
                        <button
                            type='button'
                            className='completo'
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Completo
                        </button>
                    :
                        <button
                            type='button'
                            className='incompleto'
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Incompleto
                        </button>

                }
            </div>

            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => seleccionarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => tareaEliminar(tarea.id)} 
                >
                    Eliminar
                </button>

            </div>
        </li>
    );
}
 
export default Tarea;