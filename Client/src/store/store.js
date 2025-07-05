// It will hold all the application states.

import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index' //*CHECK
import adminProductsSlice from './admin/products-slice'
import ShoppingProductSlice from './shop/products-slice'



const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: ShoppingProductSlice,
    }
})


export default store