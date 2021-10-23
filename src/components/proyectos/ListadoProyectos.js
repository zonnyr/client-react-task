import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    // Extraer proyectos
    const proyectoC = useContext(proyectoContext)
    const { mensaje, proyectos, obtenerProyectos } = proyectoC

    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Obtener proyectos cuando carga el componente
    useEffect(() => {

        // si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje])

    // revisar si proyectos tiene datos
    if (proyectos.length === 0) {
        return <p>No hay proyectos</p>
    }

    return ( 
        <ul className='listado-proyectos'>
            { alerta ? <div className={`alerta ${alerta.categoria}`}></div> : null}
            <TransitionGroup>
                {proyectos.map(
                    proyecto => (
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
                    )
                )}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;