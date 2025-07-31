import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: []
}

export const addReview = createAsyncThunk('/products/addReview', async (formData) => {
    const result = await axios.post(`http://localhost:5000/api/shop/review/add`, formData)
    return result?.data
})




export const getReviews = createAsyncThunk('/products/getReviews', async (id)=> {

    const result = await axios.get(`http://localhost:5000/api/shop/review/${id}`)

    return result?.data
})


const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getReviews.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getReviews.fulfilled, (state, action)=>{
            state.isLoading = false
            state.reviews = action.payload?.data
        })
        .addCase(getReviews.rejected, (state)=>{
            state.isLoading = false
            state.reviews = []
        })


        //No need to do aything for addReview, as the add revies is called get reviews will be dispatched... So Wakanda forever.
    }
})

export default reviewSlice.reducer