import React from 'react'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
    return (
        <>
            <h3 className="auth__title mb-5">Login</h3>

            <form>
                <input type="text" placeholder="Email" name="email" className="auth__input" autoComplete="off"  />   
                <input type="password" placeholder="Password" name="password" className="auth__input" autoComplete="off"  />   
                <button type="submit" className="btn btn-primary btn-block">Login</button>

                <div className="auth__social-networks">
                    <p className="mb-1 auth__parrafe">Login with Social Network</p>
                    <div className="google-btn mt-5">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div> {/* Button Google */}

                <Link to="/auth/register" className="link">Create a new account</Link>
            </form>
        </>
    )
}

export default LoginScreen
