import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, registrarUsuario } = authContext

    // en caso de que ya este registrado
    useEffect( () => {
        if (autenticado) {
            props.history.push('/proyectos')
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
            return;
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // State para iniciar session
    const [ usuario, guardarUsuario ] = useState ({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const { name, email, password, password_confirmation } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }

    // cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        // validar que no haya campos vacios
        if (name.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            password_confirmation.trim() === '') {
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
                return;
        }
        
        // Password minimo 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error')
            return;
        }

        // ambos password tienen que ser iguales
        if (password !== password_confirmation) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error')
            return;
        }

        // pasarlo al action
        registrarUsuario({
            name,
            email, 
            password,
            password_confirmation
        })
        
    }

    return ( 
        <div className='form-usuario'>
            { alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            <div className='contenedor-form sombra-dark'>
                <h1>Crear una cuenta</h1>
            
                <form
                    onSubmit={onSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor='name'>name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Tu name'
                            value={name}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Tu Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Tu Password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='password_confirmation'>Confirmar Password</label>
                        <input
                            type='password'
                            id='password_confirmation'
                            name='password_confirmation'
                            value={password_confirmation}
                            placeholder='Repite tu Password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-from'>
                        <input
                            type='submit'
                            className='btn btn-primary btn-block'
                            value='Registrarme'
                        />
                    </div>

                </form>

                <Link to={`/`} className=''>
                    Iniciar Sesion
                </Link>
                
            </div>


        </div>
     );
}
 
export default NuevaCuenta;