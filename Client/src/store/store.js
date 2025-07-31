// It will hold all the application states.

import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index' 
import adminProductsSlice from './admin/products-slice'
import adminOrderSlice from './admin/order-slice'
import ShoppingProductSlice from './shop/products-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'
import shopOrderSlice from './shop/order-slice'
import searchSlice from './shop/search-slice'
import shopReviewSlice from './shop/review-slice'



const store = configureStore({
    reducer: {
        auth: authReducer,

        adminProducts: adminProductsSlice,
        adminOrder: adminOrderSlice,
        
        shopProducts: ShoppingProductSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        shopSearch: searchSlice,
        shopReview: shopReviewSlice,
    }
})


export default store