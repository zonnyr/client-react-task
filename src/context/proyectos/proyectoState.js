import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS, 
        AGREGAR_PROYECTO, 
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        FORMULARIO_PROYECTO_BUSQUEDA,
        OCULTAR_BUSQUEDA,
        FORMULARIO_TAREA_BUSQUEDA,
        OCULTAR_BUSQUEDA_TAREA,
        ELIMINAR_PROYECTO
    } from '../../types';

import clienteAxios from '../../config/axios';

const ProyectoState = props => {
    

    const initialState ={
        proyectos: [],
        formulario: false,
        formularioBusqueda: false,
        formularioBusquedaTarea: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    // Dispara para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const mostrarFormularioBusqueda = () => {
        dispatch({
            type: FORMULARIO_PROYECTO_BUSQUEDA
        })
    }

    const mostrarFormularioBusquedaTarea = () => {
        dispatch({
            type: FORMULARIO_TAREA_BUSQUEDA
        })
    }

    const ocultarFormularioBusqueda = () => {
        dispatch({
            type: OCULTAR_BUSQUEDA
        })
    }

    const ocultarFormularioBusquedaTarea = () => {
        dispatch({
            type: OCULTAR_BUSQUEDA_TAREA
        })
    }

    // obtener los proyectos
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/getProject')
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.project
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Agregar nuevo proyeto
    const agregarProyecto = async proyecto => {

        try {
            const resultado = await clienteAxios.post('/api/createProject', proyecto)
            // Insertar el proyecto
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Validar formulario
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // selecciona el proyecto
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // Eliminar un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.post(`/api/deleteProject/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                formularioBusqueda: state.formularioBusqueda,
                formularioBusquedaTarea: state.formularioBusquedaTarea,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                mostrarFormularioBusqueda,
                mostrarFormularioBusquedaTarea,
                ocultarFormularioBusqueda,
                ocultarFormularioBusquedaTarea,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState