import Swal from 'sweetalert2'
import { types } from "../types/types"

export const setError = (err) => {
    return {
        type: types.uiSetError,
        payload: err,
        swal: Swal.fire('Fail', err, 'error')
    }
}

export const removeError = () => {
    return {
        type: types.uiRemoveError
    }
}

export const startLoading = () => {
    return {
        type: types.uiStartLoading
    }
}

export const finishLoading = () => {
    return {
        type: types.uiFinishLoading
    }
}