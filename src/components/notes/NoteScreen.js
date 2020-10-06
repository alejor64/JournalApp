import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleteNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
    const dispatch = useDispatch()
    const {active: note} = useSelector(state => state.notes)
    const [values, handleInputChange, reset] = useForm(note)
    const { body, title } = values

    const activeId = useRef(note.id)
    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note)
            activeId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(values.id, {...values}))
    }, [values, dispatch])

    const handleDelete = () => {
        dispatch(startDeleteNote(note.id))
    }

    return (
        <div className="notes_main-content">
            <NotesAppBar />

            <div className="notes_content">
                <form>
                    <input 
                        type="text"
                        placeholder="Some Awesome Title"
                        className="notes_title-input"
                        autoComplete="off"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                    />
                </form>

                <textarea
                    placeholder="What happened today?"
                    className="note_textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    note.url &&
                        <div className="notes_image">
                            <img
                                src={note.url}
                                alt="landscape"
                            />
                        </div>
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete Note
            </button>
        </div>
    )
}

export default NoteScreen
