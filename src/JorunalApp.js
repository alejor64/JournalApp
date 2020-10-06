import React from 'react'
import {Provider} from 'react-redux'
import AppRouter from './routers/AppRouter'
import { store } from './store/store'

const JorunalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

export default JorunalApp
