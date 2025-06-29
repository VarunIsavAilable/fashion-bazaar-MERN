import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct', async (FormData)=> {
    const result = await axios.post('http://localhost:5000/api/admin/products/add', FormData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return result?.data
})

export const fetchAllNewProduct = createAsyncThunk('/products/addnewproduct', async ()=> {

    const result = await axios.get('http://localhost:5000/api/admin/products/fetchAllProducts')

    return result?.data
})



export const editProduct = createAsyncThunk('/products/addnewproduct', async ({id, FormData})=> {
    const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, FormData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return result?.data
})



export const deleteProduct = createAsyncThunk('/products/addnewproduct', async (id)=> {
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)

    return result?.data
})


const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllNewProduct.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllNewProduct.fulfilled, (state, action)=>{
            console.log(action.payload)

            state.isLoading = false,
            state.productList = action.payload.data
        })
        .addCase(fetchAllNewProduct.rejected, (state, action)=>{
            console.log(action.payload)
            
            state.isLoading = false,
            state.productList = []
        })
    }

})

export default adminProductsSlice.reducer