import React from 'react'
import { startLogout } from '../../actions/auth'
import JournalEntries from './JournalEntries'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote,startLogoutCleaning,startAddNewNote } from '../../actions/notes'


const Sidebar = () => {

    const dispatch = useDispatch()

    const { name } = useSelector( state => state.auth );

    const handleLogout = () => {
        dispatch(startLogout())
        dispatch(startLogoutCleaning())
    }

    //Boton para crear nuevas entradas en firebase
    const handleAddNewEntry = async() => {
        const newNote = await dispatch(startNewNote())
        dispatch(startAddNewNote(newNote))
    }
    return (
        <aside className="journal__sidebar">
            
            <div className="journal_sidebar-navbar">

                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> { name }</span>
                </h3>

                <button className="btn" onClick={ handleLogout }>Logout</button>

            </div>

            <div className="journal__new-entry"
                onClick={ handleAddNewEntry }
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
}

export default Sidebar
