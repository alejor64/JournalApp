import Swal from "sweetalert2"
import { db } from "../firebase/firebaseConfig"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc =  await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(activeNote(doc.id, newNote))
        dispatch(addNewNote(doc.id, newNote))
    }
}

export const activeNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}

export const addNewNote = (id, note) => {
    return {
        type: types.notesAddNew,
        payload: {
            id, 
            ...note
        }
    }
}

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid

        if(!note.url){
            delete note.url
        }
        const noteToFireStore = {...note}
        delete noteToFireStore.id

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore)
        dispatch(refeshNote(note.id, note))
        Swal.fire('Saved', note.title, 'success')
    }
}

export const refeshNote = (id, note) => {
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note
        }
    }
}

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const {active: activeNote} = getState().notes
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        const fileURL = await fileUpload(file)
        activeNote.url = fileURL
        dispatch(startSaveNote(activeNote))
        Swal.close()
    }
}

export const startDeleteNote = (id) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth
        await db.doc(`${uid}/journal/notes/${id}`).delete()

        dispatch(delteNote(id))
    }
}

export const delteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id
    }
}

export const noteLogout = () => {
    return {
        type: types.notesLogoutCleaning
    }
}