import { 
        FORMULARIO_PROYECTO, 
        FORMULARIO_PROYECTO_BUSQUEDA, 
        OCULTAR_BUSQUEDA, 
        FORMULARIO_TAREA_BUSQUEDA, 
        OCULTAR_BUSQUEDA_TAREA, 
        OBTENER_PROYECTOS, 
        AGREGAR_PROYECTO,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
    } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formularioBusqueda: false,
                formulario: true 
            }
        case FORMULARIO_PROYECTO_BUSQUEDA:
            return {
                ...state,
                formularioBusqueda: true,
                formulario: false 
            }
        case OCULTAR_BUSQUEDA:
            return {
                ...state,
                formularioBusqueda: false,
            }
        case FORMULARIO_TAREA_BUSQUEDA:
            return {
                ...state,
                formularioBusquedaTarea: true
            }
        case OCULTAR_BUSQUEDA_TAREA:
            return {
                ...state,
                formularioBusquedaTarea: false,
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload 
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(
                    proyecto => proyecto.id === action.payload
                )
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(
                    proyecto => proyecto.id !== action.payload
                ),
                proyecto: null
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}