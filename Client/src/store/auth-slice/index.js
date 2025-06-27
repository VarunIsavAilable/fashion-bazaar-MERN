import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


// In Redux, a thunk is a middleware-powered function that lets you write async logic (like API calls) inside action creators.


const initialState = {
    isAuthenticated: false,
    isLoading: true,
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


export const loginUser = createAsyncThunk('/auth/login',
    async(FormData) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', FormData, 
            { withCredentials: true } // ✅ pass config
        )

        return response.data
    }
)


export const checkAuth = createAsyncThunk('/auth/check-auth',
    async() => {
        const response = await axios.get('http://localhost:5000/api/auth/check-auth',
            {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    Expires: '0' 
                }
            }
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
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action)=> {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false //we will check user in db
        })
        .addCase(registerUser.rejected, (state, action)=> {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false //we will check user in db
        })



        .addCase(loginUser.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, action)=> {
            console.log(action.payload)
            state.isLoading = false
            state.user =  action.payload.user 
            state.isAuthenticated = true //we will check user in db
        })
        .addCase(loginUser.rejected, (state, action)=> {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false //we will check user in db
        })



        .addCase(checkAuth.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(checkAuth.fulfilled, (state, action)=> {
            console.log(action.payload)
            state.isLoading = false
            state.user = action.payload.user
            state.isAuthenticated = true //we will check user in db
        })
        .addCase(checkAuth.rejected, (state, action)=> {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false //we will check user in db
        })
    }
})


export const {setUser} = authSlice.actions

export default authSlice.reducer