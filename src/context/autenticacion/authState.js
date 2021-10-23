import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_TAREA,
    CERRAR_SESION
} from "../../types"

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registrarUsuario = async datos => {
        try {
            
            const respuesta = await clienteAxios.post('/api/register', datos)

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            // obtener el usuario
            usuarioAutenticado(datos)
            
        } catch (error) {
            // console.log('Hubo un error al registrar')
            const alerta = {
                msg: 'Error al iniciar sesion',
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            // funcione para enviar el token por header
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get('/api/profile')
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.user
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // cuando el usuario inicia sesion
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/login', datos)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data 
            })

            // obtener el usuario
            usuarioAutenticado()
        } catch (error) {
            // console.log(error.response.data.msg)
            const alerta = {
                msg: 'Error al iniciar sesion',
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // cierra la sesion del usuarioAutenticado
    const cerrarSesion = async() => {
        await clienteAxios.post('/api/logout')
        dispatch({
            type: CERRAR_SESION
        })
        dispatch({
            type: CERRAR_TAREA
        })

    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    )

}
export default AuthState
