import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routes/auth/auth-routes.js'; 

import adminProductsRouter from './routes/admin/products-route.js'

import shopProductRouter from './routes/shop-view/products-routes.js'

import shopCartRouter from './routes/shop-view/cart-routes.js'

import shopAddressRouter from './routes/shop-view/address-routes.js'

import shopOrderRouter from './routes/shop-view/order-routes.js'

import adminOrderRouter from './routes/admin/order-routes.js'

import searchRouter from './routes/shop-view/search-routes.js'

import shopReviewRouter  from './routes/shop-view/review-routes.js'


const app = express()
const PORT = process.env.PORT || 5000


// database config
mongoose.connect('mongodb://127.0.0.1:27017/Ecommerse')
.then(()=>console.log("MongoDB connected."))
.catch(error=>console.log(error))


//cors config
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pregma'
        ],
        credentials: true //for login and credentials part
    })
)

app.use(cookieParser())
app.use(express.json())


app.use('/api/auth', authRouter) 

app.use('/api/admin/products', adminProductsRouter)

app.use('/api/admin/orders', adminOrderRouter)

app.use('/api/shop/products', shopProductRouter)

app.use('/api/shop/cart', shopCartRouter)

app.use('/api/shop/address', shopAddressRouter)

app.use('/api/shop/order', shopOrderRouter)

app.use('/api/shop/search', searchRouter)

app.use('/api/shop/review', shopReviewRouter)



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))