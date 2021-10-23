import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {
    
    // extraer la information de autenticacion
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext

    useEffect( () => {
        usuarioAutenticado()
        // eslint-disable-next-line
    }, [])



    return ( 
        <header className='app-header'>
            { usuario 
            ? 
                <p className='nombre-usuario'>
                    <span>
                        {` ${usuario.name}`}
                    </span>
                </p>
            : null}

            <nav className='nav-principal'>
                <button 
                    className='btn btn-secundario mt-o '
                    onClick={() => cerrarSesion()}
                >
                    Cerrar Sesion
                </button>
            </nav>

        </header>
     );
}
 
export default Barra;