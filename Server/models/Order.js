import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            quantity: String,
        }
    ],
    addressInfo: {
        addressId: String,
        assdree: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymetId: String,
    payerId: String,
})

export default mongoose.model('Order', OrderSchema)