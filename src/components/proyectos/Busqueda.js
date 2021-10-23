import React, { Fragment, useContext, useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import proyectoContext from '../../context/proyectos/proyectoContext';
import Proyecto from './Proyecto';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Busqueda = () => {
    
    // Obtener e state del formulario
    const proyectoC = useContext(proyectoContext)
    const { formularioBusqueda,
            mostrarFormularioBusqueda,
            ocultarFormularioBusqueda,
        } = proyectoC

    // State para proyecto
    const [proyectoBusqueda, guardarProyectoBusqueda] = useState({
        name: ''
    })

    const [proyectos, guardarProyectos] = useState([])

    // Extraer name de proyecto
    const { name } = proyectoBusqueda

    useEffect(() => {
    }, [proyectos])

    // lee los inputs
    const onProyectoBusqueda = e => {
        guardarProyectoBusqueda({
            ...proyectoBusqueda,
            name: e.target.value
        })
        if ((e.target.value).length>2) {
            obtenerBusquedaProyectos({
                name: e.target.value
            })
        }
    }
    
    // obtener los proyectos
    const obtenerBusquedaProyectos = async (proyecto) => {
        const resultado = await clienteAxios.post('/api/getSearchProject', proyecto)
        guardarProyectos(
            resultado.data.project
        )
    }

    // Mostrar formulario
    const onClickFormularioBusqueda = () => {
        if (formularioBusqueda) {
            ocultarFormularioBusqueda()
            guardarProyectos([])
            guardarProyectoBusqueda({
                name: ''
            })
        }else {
            mostrarFormularioBusqueda()
        }
    }

    return ( 
        <Fragment>
            
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={onClickFormularioBusqueda}
            >
                { formularioBusqueda ? "Ocultar Busqueda" : "Buscar Proyecto" }
            </button>

            {
                formularioBusqueda
                ?
                    <form
                        className='formulario-nuevo-proyecto'
                    >
                        <input
                            type='text'
                            className='input-text'
                            placeholder='Busca tu Proyecto'
                            autocomplete="off"
                            name='name'
                            value={name}
                            onChange={onProyectoBusqueda}
                        />

                    </form>
                :
                    null
            }

            {
                formularioBusqueda 
                ? 
                    proyectos.length === 0 
                    ? 
                        <p>No hay resultados</p> 
                    :
                        <ul className='listado-proyectos'>
                            <p>Resultados: </p> 
                            <br/>
                            <TransitionGroup>
                                {proyectos.map(
                                    (proyecto, index) => (
                                        index <= 2 
                                        ?
                                        <CSSTransition
                                            key={proyecto.id}
                                            timeout={200}
                                            classNames="proyecto"
                                        >
                                            <Proyecto
                                                key={proyecto.id}
                                                proyecto={proyecto}
                                            />
                                        </CSSTransition>
                                        : null
                                        
                                    )
                                )}
                            </TransitionGroup>
                        </ul>
                : 
                    null
            }

        </Fragment>
     );
}
 
export default Busqueda;