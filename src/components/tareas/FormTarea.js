import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Extraer proyectos
    const proyectoC = useContext(proyectoContext)
    const { proyecto } = proyectoC

    // obtner la funcion del context
    const tareasContext = useContext(TareaContext)
    const { 
        tareaseleccionada, 
        errortarea, 
        agregarTareas, 
        validarTareas, 
        obtenerTareas,
        actualizarTarea,
        limpiarTarea
    } = tareasContext

    // detecta si hay una tarea
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                name: ''
            })
        }
    }, [tareaseleccionada])

    // satate del formulario
    const [tarea, guardarTarea] = useState({
        name: ''
    })

    // Extraer el name
    const {name} = tarea
    
    // si no hay proyecto seleccionado
    if (!proyecto) {
        return null        
    }
    
    // Array destructuring para extrar el proyecto actual
    const [proyectoActual] = proyecto

    // leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if (name.trim() === '') {
            validarTareas()
            return;
        }

        // revisar si es edicion o es tarea
        if (tareaseleccionada === null) {
            // agregar nueva tarea
            // tarea.id_project = proyectoActual.id
            agregarTareas(tarea, proyectoActual.id)
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea)

            // limpiar
            limpiarTarea()
        }

        // filtrar las tareas del proyecto
        obtenerTareas(proyectoActual.id)

        // reiniciar form
        guardarTarea({
            name: ''
        })
    }

    return ( 
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className='contenedor-input'>
                    <input
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea" }
                    />
                </div>
            </form>

            { errortarea ? <p className='mensaje error'>El nombre es obligatorio</p> : null }
        </div>
     );
}
 
export default FormTarea;