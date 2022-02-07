import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasssword } from '../../actions/auth'

export const RegisterScreen = () => {

    const [{name,email,password,password2},handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const dispatch = useDispatch(); //manda una accion al reducer
    const {msgError} = useSelector(state => state.ui); //lee el state directamente de el redux

    const handleRegister = (e) => {
        e.preventDefault();

        if(isFormValid()){
            dispatch(startRegisterWithEmailPasssword(email,password,name))
        }
    }

    const isFormValid = () => {
        
        if(name.trim().length === 0){
            dispatch(setError('Name required'))
            return false;
        } else if(!validator.isEmail(email)){
            dispatch(setError('Not valid email'))
            return false;
        } else if(password!==password2 || password.length < 5){
            dispatch(setError('Password needs 5 characters and match each other'))
            return false;
        }
        
        dispatch(removeError())

        return true;
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={handleRegister} className='animate__animated animate__fadeIn animate__faster'>

                {
                    msgError &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }

                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Confirm Password'
                    name='password2'
                    className='auth__input'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5'
                >
                    Register
                </button>


                <Link 
                    className='link'
                    to='/auth/login'
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
