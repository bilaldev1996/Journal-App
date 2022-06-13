import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from '../../actions/ui';
import { firebaseRegister } from '../../actions/auth';



const RegisterScren = () => {


    const dispatch = useDispatch();

    //Recuperar datos del state
    const { msgError } = useSelector(state => state.ui);


    const [ formValues,handleInputChange ] =useForm({
        name : 'Ramia',
        email : 'Ramia@gmail.com',
        password : '1234567',
        password2 : '1234567'
    })

    const { name, email, password, password2 } = formValues

    const handleRegister = (e) =>{
        e.preventDefault()
        if (isFormValid()){
            //Enviar datos a firebase para registrar nuevo usuario
            dispatch(firebaseRegister(name,email,password))
            console.log('Formulario valido');
        }        
    }

    const isFormValid = () =>{

        if( name.trim().length === 0 ){
            dispatch(setError('Name is required'));
            return false
        } else if( !validator.isEmail(email) ){
            dispatch(setError('Email is invalid'));
            return false
        } else if( password !== password2 ){
            dispatch(setError('Passwords must be equal'));
            return false
        } else if( password.length < 6 ){
            dispatch(setError('Password must be at least 6 characters'));
            return false
        }
        
        dispatch(removeError());
        return true
    }
    return (
        <>
            <h3 className="auth__title mb-5">Register</h3>

            <form onSubmit={ handleRegister } className="animate__animated animate__fadeIn">

                { msgError && <div className="auth__alert-error">{ msgError }</div> }
                
                <input type="text" placeholder="Name" name="name" className="auth__input" onChange={ handleInputChange } value={ name } autoComplete="off" />   

                <input type="text" placeholder="Email" name="email" className="auth__input" onChange={ handleInputChange } value={ email } autoComplete="off" />   
                <input type="password" placeholder="Password" name="password" className="auth__input" onChange={ handleInputChange } value={ password }  />   
                <input type="password" placeholder="Confirm password" name="password2" className="auth__input" onChange={ handleInputChange } value={ password2 } />   

                <button type="submit" className="btn btn-primary btn-block mb-5">Register and Login</button>

                <Link to="/auth/login" className="link">Already registered?</Link>
            </form>
        </>
    )
}

export default RegisterScren
