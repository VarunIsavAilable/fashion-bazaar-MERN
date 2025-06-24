import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


// In Redux, a thunk is a middleware-powered function that lets you write async logic (like API calls) inside action creators.


const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
}


// async thunk
export const registerUser = createAsyncThunk('/auth/register',
    async(FormData) => {
        const response = await axios.post('http://localhost:5000/api/auth/register', FormData, 
            { withCredentials: true } // ✅ pass config
        )

        return response.data
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action)=>{

        }
    }
})


export const {setUser} = authSlice.actions

export default authSlice.reducer