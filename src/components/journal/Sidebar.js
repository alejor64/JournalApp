import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'
import JournalEntries from './JournalEntries'

const Sidebar = () => {
    const dispatch = useDispatch()
    const {name} = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
    }

    const handleAddNew = () => {
        dispatch(startNewNote())
    }

    return (
        <aside className="journal_sidebar">
            <div className="journal_sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fas fa-robot"></i>
                    <span> {name}</span>
                </h3>

                <button
                    className="btn"
                    onClick={handleLogout}
                >
                    Longout
                </button>
            </div>

            <div
                className="journal_new-entry"
                onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}

export default Sidebar
