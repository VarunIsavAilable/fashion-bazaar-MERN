import express from 'express'



import{createOrder} from '../../controllers/shop/order-controller.js'

const router = express.Router()

router.post('/create', createOrder)

export default router