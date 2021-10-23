import React, { useReducer } from "react"
import alertaReducer from "./alertaReducer"
import AlertaContext from "./alertaContext"

import { MOSTAR_ALERTA, OCULTAR_ALERTA } from "../../types"

const AlertaState = props => {
    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState)

    // funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        })

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    }



    return(
        <AlertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </AlertaContext.Provider>
    )

}

export default AlertaState