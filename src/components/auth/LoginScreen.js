import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  googleLogin, startLoginEmailPassword } from "../../actions/auth";
import useForm from "../../hooks/useForm";

const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: "ramia@gmail.com",
        password: "1234567",
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(email, password);
        //dispatch(login(123456,'Bilal'))
        dispatch(startLoginEmailPassword(email, password));
    };

    const handleGoogleLogin = () =>{
        dispatch(googleLogin());
    }



    return (
        <>
            <h3 className="auth__title mb-5">Login</h3>

            <form onSubmit={ handleLogin } className="animate__animated animate__fadeIn">
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={password}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>
                <div className="auth__social-networks">
                    <p className="mb-1 auth__parrafe">Login with Social Network</p>
                    <div className="google-btn mt-5" onClick={ handleGoogleLogin }>
                    <div className="google-icon-wrapper">
                        <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="google button"
                        />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                    </div>
                </div> {/* Button Google */}
                <Link to="/auth/register" className="link">
                    Create a new account
                </Link>
            </form>
        </>
    );
};

export default LoginScreen;
