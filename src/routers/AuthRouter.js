import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen'
import RegisterScren from '../components/auth/RegisterScreen'

const AuthRouter = () => {
    return (
        <div className='auth__main'>
            <div className='auth__box-container'>
                <Switch>
                    <Route exact path="/auth/login" component={ LoginScreen } />
                    <Route exact path="/auth/register" component={ RegisterScren } />
                    <Redirect  to="/auth/login" />
                </Switch>
            </div>
        </div>
    )
}

export default AuthRouter
