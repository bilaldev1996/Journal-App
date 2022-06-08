import React from 'react'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
    return (
        <div className="notes__main-context">
            
            <NotesAppBar />

            <div className="notes__content">

                    <input type="text" placeholder="Some awesome title" className='notes__title-input' autoComplete='off' />

                    <textarea placeholder="What happened today?" className='notes__textarea' autoComplete='off' />

                    <div className="notes__image">
                        {/* poner imagen de bitcoin */}
                        <img src="https://www.cryptocompare.com/media/37746251/btc.png" alt="bitcoin" />
                    </div>
            </div>
        </div>
    )
}

export default NoteScreen
