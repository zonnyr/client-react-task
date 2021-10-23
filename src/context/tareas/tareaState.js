import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { 
        TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        CERRAR_TAREA,
        LIMPIAR_TAREA
    } from '../../types';

import clienteAxios from '../../config/axios'

const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    // crea state y dispatch
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    // crear las funciones

    // obtener las tareas
    const obtenerTareas = async proyecto => {
        try {
            const respuesta = await clienteAxios.post(`/api/getTask/${proyecto}`)
            dispatch({
                type: TAREAS_PROYECTO,
                payload: respuesta.data.tasks
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    // Agregar una tarea al proyecto
    const agregarTareas = async (tarea, id) => {
        try {
            await clienteAxios.post(`/api/createTask/${id}`, tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Valida y muestra un error
    const validarTareas = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Valida y muestra un error
    const eliminarTareas = async (id) => {
        try {
            const respuesta = await clienteAxios.post(`/api/deleteTask/${id}`)
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    // ELIMINAR LA TAREA SELECCIONADA una tarea
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    const cerrarTarea = () => {
        dispatch({
            type: CERRAR_TAREA
        })
    }

    // editar una tarea
    const actualizarTarea = async tarea => {
        try {
            await clienteAxios.post(`/api/updateTask/${tarea.id}`, tarea)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Extrae una tarea para edicion
    const guardaTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }


    return(
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTareas,
                validarTareas,
                eliminarTareas,
                guardaTareaActual,
                actualizarTarea,
                cerrarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState