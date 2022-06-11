import React, { useEffect, useRef } from 'react'
import NotesAppBar from './NotesAppBar'
import {useSelector} from 'react-redux'
import useForm from '../../hooks/useForm';
import { setNotes } from '../../actions/notes';


const NoteScreen = () => {

    const { active:note } = useSelector( state => state.notes );

    //Modificar el estado de la nota
    const [formValues, handleInputChange,reset] = useForm({
        title: note.title,
        body: note.body,
    });

    const { title, body } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {

        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }

    }, [note,reset]);

    setNotes(note)

    return (
        <div className="notes__main-context">
            
            <NotesAppBar />


            <div className="notes__content">

                    <input type="text" placeholder="Some awesome title" className='notes__title-input' autoComplete='off'  value={ title } onChange={ handleInputChange } name="title"/>

                    <textarea placeholder="What happened today?" className='notes__textarea' autoComplete='off'  value={ body } onChange={ handleInputChange } name="body" />

                    {
                        note.url &&
                        <div className="notes__image">
                            <img src="https://www.cryptocompare.com/media/37746251/btc.png" alt="bitcoin" />
                        </div>
                    }
            </div>
        </div>
    )
}

export default NoteScreen
