import React from 'react'
import JournalEntry from './JournalEntry'
import { useSelector } from 'react-redux';

const JournalEntries = () => {

    const { notes } = useSelector( state => state.notes );

    const entries = document.querySelector('.journal_entries')

    if( entries!==null && notes.length>7){
        entries.classList.add('journal__entries--scroll')
    }

    if( entries!==null && notes.length<=7){
        entries.classList.remove('journal__entries--scroll')
    }
    return (
        <div className="journal_entries">
            
            {
                

                notes.map(note => (
                    <JournalEntry 
                        key={note.id}
                        { ...note }
                    />
                ))
            }
        </div>
    )
}

export default JournalEntries
