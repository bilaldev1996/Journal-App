import React, { useEffect, useRef } from 'react'
import NotesAppBar from './NotesAppBar'
import {useSelector , useDispatch} from 'react-redux'
import useForm from '../../hooks/useForm';
import { activeNote, startDeleteNote } from '../../actions/notes';


const NoteScreen = () => {

    const { active:note } = useSelector( state => state.notes );

    //Modificar el estado de la nota
    const [formValues, handleInputChange,reset] = useForm({
        title: note.title,
        body: note.body,
    });

    const dispatch = useDispatch()

    const { title, body } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {

        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }


    }, [note,reset]);


    useEffect(() => {
        
        dispatch(activeNote(note.id,formValues));


    } , [formValues,dispatch,note.id]);

    const handleDelete = () => {
        dispatch(startDeleteNote(note.id));
    }

    return (
        <div className="notes__main-context animate__animated animate__fadeIn">
            
            <NotesAppBar />


            <div className="notes__content">

                    <input type="text" placeholder="Some awesome title" className='notes__title-input' autoComplete='off'  value={ title } onChange={ handleInputChange } name="title"/>

                    <textarea placeholder="What happened today?" className='notes__textarea' autoComplete='off'  value={ body } onChange={ handleInputChange } name="body" />

                    {
                        note.url &&
                        <div className="notes__image">
                            <img src={ note.url } alt={ note.title } />
                        </div>
                    }
            </div>

            <button className="btn btn-danger" onClick={ handleDelete }>
                Delete note
            </button>
        </div>
    )
}

export default NoteScreen
