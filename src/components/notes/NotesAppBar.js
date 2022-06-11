import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

const NotesAppBar = () => {

    const { active } = useSelector( state => state.notes );

    const noteDate = moment(active.date)

    return (
        <div className='notes__appbar'>

            <span>{ noteDate.format('MMMM Do YYYY, h:mm:ss a') }</span>

            <div>
                <button className='btn'>
                    Picture
                </button>
                <button className='btn'>
                    Save
                </button>
            </div>
            
        </div>
    )
}

export default NotesAppBar
