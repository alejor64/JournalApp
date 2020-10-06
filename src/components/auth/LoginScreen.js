import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'



const LoginScreen = () => {
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.ui)

    const [values, handleInputChange] = useForm({
        email: 'alejoruiz@hotmail.com',
        password: '123456'
    })

    const {email, password} = values

    const handleLogin = (e) => {
        e.preventDefault()
        if(isFormValid()){
            dispatch(startLoginEmailPassword(email, password))
        }
    }

    const isFormValid = () => {
        if(!validator.isEmail(email)){
            dispatch(setError('Email is invalid'))
            return false
        }

        dispatch(removeError())
        return true
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    return (
        <Fragment>
            <h3 className="auth_title">Login</h3>
            <form
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn animate__faster"
            >
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
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>
                
                <div className="auth_social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new account
                </Link>

            </form>
        </Fragment>
    )
}

export default LoginScreen
