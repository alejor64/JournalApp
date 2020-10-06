import React from 'react'
import { useSelector } from 'react-redux'
import NoteScreen from '../notes/NoteScreen'
import NothingSeleted from './NothingSeleted'
import Sidebar from './Sidebar'

const JournalScreen = () => {
    const {active} = useSelector(state => state.notes)

    return (
        <div
            className="journal_main-content animate__animated animate__fadeIn animate__faster"
        >
            <Sidebar />

            <main>
                {
                    active ? 
                        <NoteScreen />
                    :
                        <NothingSeleted />
                }
            </main>
        </div>
    )
}

export default JournalScreen
