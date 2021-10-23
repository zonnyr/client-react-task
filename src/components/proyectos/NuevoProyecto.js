import React, { Fragment, useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
    
    // Obtener e state del formulario
    const proyectoC = useContext(proyectoContext)
    const { formulario,
            errorformulario,
            mostrarFormulario, 
            agregarProyecto,
            mostrarError
        } = proyectoC

    // State para proyecto
    const [proyecto, guardarProyecto] = useState({
        name: ''
    })

    // Extraer name de proyecto
    const { name } = proyecto

    // lee los inputs
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    // cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault()

        // validar proyecto
        if (name === '') {
            mostrarError()
            return
        }

        // aregar el state
        agregarProyecto(proyecto)

        // reiniciar el form
        guardarProyecto({
            name: ''
        })
    }

    // Mostrar formulario
    const onClickFormulario = () => {
        mostrarFormulario()
    }

    return ( 
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </button>

            {
                formulario
                ?
                    <form
                        onSubmit={onSubmitProyecto}
                        className='formulario-nuevo-proyecto'
                    >
                        <input
                            type='text'
                            className='input-text'
                            placeholder='Nombre Proyecto'
                            name='name'
                            value={name}
                            onChange={onChangeProyecto}
                        />

                        <input
                            type='submit'
                            className='btn btn-block btn-primario'
                            value='Agregar Proyecto'
                        />

                    </form>
                :
                    null
            }

            { errorformulario ? <p className="mensaje error">El nombre es oligatorio</p> : null}

        </Fragment>
     );
}
 
export default NuevoProyecto;