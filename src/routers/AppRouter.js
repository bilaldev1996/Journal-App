import React, { useEffect, useState } from 'react'
import { Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import JournalScreen from '../components/journal/JournalScreen'
import AuthRouter from './AuthRouter'
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { startLoadingNotes } from '../actions/notes'

const AppRouter = () => {
    

    //Mostrar el state initial y mantenerlo actualizado
    const dispatch = useDispatch()

    //Estado inicial de la app
    const [checking, setChecking] = useState(true)

    //Saber si el usuario esta logueado o no
    const [isLoggedIn, setisLoggedIn] = useState(false)


    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) => {
            
            if( user?.uid ) {
                dispatch( login( user.uid,user.displayName))
                setisLoggedIn(true)
                dispatch( startLoadingNotes( user.uid ))
            }else {
                setisLoggedIn(false)
            }

            setChecking(false)

        })
    }, [dispatch,setChecking,setisLoggedIn])

    if(checking) {
        return <h1>Wait...</h1>
    }

    return (
            <Router>
                <div>
                    <Switch>
                        {
                            isLoggedIn ? (
                                <Route path="/">
                                    <Redirect  to="/" />
                                    <JournalScreen />
                                </Route>
                            ) : (
                                <AuthRouter />
                            )
                        }
                        {/* <Route path="/auth" component={ AuthRouter } />
                        <Route exact path="/" component={ JournalScreen } /> */}
                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
            </Router>
    )
}

export default AppRouter
