import React, { Fragment, useContext, useEffect, useState } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import clienteAxios from '../../config/axios';

const ListadoTareas = () => {
    
    // Obtener e state del formulario
    const proyectoC = useContext(proyectoContext)
    const { proyecto, 
        eliminarProyecto,
        mostrarFormularioBusquedaTarea,
        ocultarFormularioBusquedaTarea,
        formularioBusquedaTarea
    } = proyectoC

    // obtner las tareas
    const tareasContext = useContext(TareaContext)
    const { tareasProyecto } = tareasContext
    
    const [tareaBusqueda, guardarTareaBusqueda] = useState({
        name: ''
    })
    
    const { name } = tareaBusqueda

    useEffect(() => {
        guardarTarea(tareasProyecto)
    }, [tareasProyecto])

    const [tareas, guardarTarea] = useState(tareasProyecto)
    const [ordenarNombre, guardarOrdenarNombre] = useState(false)
    const [ordenarEstado, guardarOrdenarEstado] = useState(false)


    useEffect(() => {
    }, [tareas])
    

    // si no hay proyectos
    if (!proyecto) {
        return <h2>Selecciona un proyecto</h2>
    }
    
    // array destructuring
    const [proyectoActual] = proyecto

    // eliminar un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id)
    }
    

    // lee los inputs
    const onTareaBusqueda = e => {
        guardarTareaBusqueda({
            ...tareaBusqueda,
            name: e.target.value
        })
        if ((e.target.value).length>2) {
            obtenerBusquedaTarea({
                name: e.target.value
            })
        }
    }
    
    const obtenerBusquedaTarea = async (tarea) => {
        const resultado = await clienteAxios.post(`/api/getSearchTask/${proyectoActual.id}`, tarea)
        guardarTarea(
            resultado.data.task
        )
    }
    
    // Mostrar formulario
    const onClickFormularioBusqueda = () => {
        if (formularioBusquedaTarea) {
            ocultarFormularioBusquedaTarea()
            guardarTarea(tareasProyecto)
            guardarTareaBusqueda({
                name: ''
            })
        }else {
            mostrarFormularioBusquedaTarea()
        }
    }

    const orden = (dato) => {
        if (ordenarNombre) {
            // de z hacia la a
            tareas.sort((a,b) => (a[dato] > b[dato]) ? 1 : ((b[dato] > a[dato]) ? -1 : 0))
        }
        else {
            // de a hacia la z
            tareas.sort((a,b) => (a[dato] < b[dato]) ? 1 : ((b[dato] < a[dato]) ? -1 : 0))

        }
        if (dato = 'name') {
            guardarOrdenarNombre(!ordenarNombre)
        }
        if (dato = 'state') {
            guardarOrdenarEstado(!ordenarEstado)
        }
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.name}</h2>
            
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={onClickFormularioBusqueda}
            >
                { formularioBusquedaTarea ? "Finalizar Busqueda" : "Buscar Tarea" }
            </button>
            {
                formularioBusquedaTarea
                ?
                    <form
                        className='formulario-nuevo-proyecto'
                    >
                        <input
                            type='text'
                            className='input-text'
                            placeholder='Busca tu Tarea'
                            autocomplete="off"
                            name='name'
                            value={name}
                            onChange={onTareaBusqueda}
                        />

                    </form>
                : 
                    null
            }

            <ul className='listado-tareas'>

                {
                    tareas.length === 0
                    ? <li className='tarea'><p>No hay tareas</p></li>
                    : 
                    <>
                        <li className="tarea sombra formulario-nuevo-proyecto">
                            <button
                                className='btn btn-secundario mt-o'
                                onClick={() => orden('name')}
                            >
                                Nombre
                            </button>
                            <div className='estado estado-titulo'>
                                <button
                                    className='btn btn-secundario mt-o'
                                    onClick={() => orden('state')}
                                >
                                    Estatus
                                </button>

                            </div>
                        </li>
                        <TransitionGroup>
                            {tareas.map(
                                tarea => (
                                    <CSSTransition
                                        key={tarea.id}
                                        timeout={200}
                                        classNames="tarea"
                                    >
                                        <Tarea
                                            tarea={tarea}
                                        />
                                    </CSSTransition>
                                )
                            )}
                        </TransitionGroup>
                    </>
                }

            </ul>
            
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={() => onClickEliminar()}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;