import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";



//Añadir nueva nota
export const startNewNote = () => {
    return async (dispatch,getState) => {

        const uid = getState().auth.uid; //Tenemos acceso a todos los datos del state

        const newNote = {
            title: '',
            body: '',
            date: new Date().toJSON()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add(newNote)

        dispatch(activeNote(doc.id,newNote))

        return newNote;

    }
}

export const activeNote = ( id, note ) =>({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})


//Recargar las notas
export const startLoadingNotes = ( uid ) => {
    return async(dispatch) => {

        const notes = await loadNotes( uid )
        dispatch(setNotes( notes ))

    }
}



export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})


//actualizar o guardar en la BBDD
export const startSaveNote = ( note ) => {
    return async(dispatch,getState) => {

            if( !note.url ) {
                delete note.url
            }

            const uid = getState().auth.uid;


            const noteToFirestore = { ...note }
            delete noteToFirestore.id;
    
            await db.doc(`${ uid }/journal/notes/${ note.id }`).update(noteToFirestore)

            //dispatch(startLoadingNotes(uid)) Manera no recomendable de hacerla porque ya tenemos la info de manera local
            dispatch(refreshNote(note.id,noteToFirestore))
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note : {
            id,
            ...note
        }
    }
})


//Actualizar el estado de la nota activa
export const startUploading = ( file ) => {
    return async(dispatch,getState) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Loading...',
            text: 'Please wait',
            showConfirmButton: false,
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading()
            }
        })

        const fileUrl = await fileUpload(file)
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote))

        Swal.close()

    }
}



//Eliminar nota
export const startDeleteNote = ( id ) => {

    return async(dispatch,getState) => {

        const uid = getState().auth.uid;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete()

        dispatch(deleteNote(id))

        Swal.fire({
            title: 'Deleted!',
            text: 'Your note has been deleted',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
})


//Vaciar las notas cuando haccemos logout
export const startLogoutCleaning = () => {
    return (dispatch) => {
        dispatch(logoutCleaning())
    }
}

export const logoutCleaning = () => ({
    type: types.notesLogoutCleaning
})

//Al añadir una nueva nota, se refleja directamete en la vista
export const startAddNewNote = ( note ) => ({
    type: types.notesAddNew,
    payload: {
        ...note,
        id: note.id ? note.id : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        
    }
    
})