// It will hold all the application states.

import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index' //*CHECK



const store = configureStore({
    reducer: {
        auth: authReducer
    }
})


export default store