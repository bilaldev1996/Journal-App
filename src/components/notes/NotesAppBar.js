import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { startSaveNote, startUploading } from '../../actions/notes';
import swal from "sweetalert";


const NotesAppBar = () => {

    const { active } = useSelector( state => state.notes );

    const dispatch = useDispatch();

    const noteDate = moment(active.date)

    const handleSave = () => {
        
        dispatch(startSaveNote(active))
        swal('SAVED','','success')
    }

    const handleImage = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if(file) {
            dispatch(startUploading(file))
        }
    }


    return (
        <div className='notes__appbar'>

            <input 
                type="file"
                id="imageInput"
                style={{display: 'none'}}
                onChange={ handleFileChange }
            />

            <span>{ noteDate.format('MMMM Do YYYY, h:mm:ss a') }</span>

            <div>
                <button className='btn' onClick={ handleImage }>
                    Picture
                </button>
                <button className='btn' onClick={ handleSave } >
                    Save
                </button>
            </div>
            
        </div>
    )
}

export default NotesAppBar
