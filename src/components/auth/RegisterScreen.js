import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegisterEmailPasswordName } from '../../actions/auth'
import { setError, removeError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

const RegisterScreen = () => {

    const dispatch = useDispatch()
    const {msgError} = useSelector(state => state.ui)

    const [values, handleInputChange] = useForm({
        name: 'Alejo',
        email: 'ars@hotmail.com',
        password: '123456',
        password2: '123456'
    })

    const {name, email, password, password2} = values

    const handleRegister = (e) => {
        e.preventDefault()
        if(isFormValid()){
            dispatch(startRegisterEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {
        if(name.trim().length === 0){
            dispatch(setError('Name is required'))
            return false
        }else if(!validator.isEmail(email)){
            dispatch(setError('Email is invalid'))
            return false
        }else if(password !== password2 || password.length < 5){
            dispatch(setError('Password should be at least 6 characters and match each other'))
            return false
        }

        dispatch(removeError())
        return true
    }

    return (
        <Fragment>
            <h3 className="auth_title">Register</h3>
            <form
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError && 
                        <div className="auth_alert-error">
                            {msgError}
                        </div>
                }

                <input
                    type="test"
                    placeholder="Name"
                    name="name"
                    className="auth_input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type="test"
                    placeholder="Email"
                    name="email"
                    className="auth_input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth_input"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth_input"
                    autoComplete="off"
                    value={password2}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>

            </form>
        </Fragment>
    )
}

export default RegisterScreen
