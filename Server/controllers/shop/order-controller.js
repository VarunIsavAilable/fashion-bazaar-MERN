import paypal from '../../helpers/paypal.js'
import Order from '../../models/Order.js'
import Product from '../../models/Product.js'
import Cart from '../../models/cart.js'
// Save order in the database
const createOrder = async(req, res)=>{
    try {

        const {userId, cartId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymetId, payerId} = req.body

        //create payment json
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancle'
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item=>({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount : {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'description'
                }
            ]
        }

        //Initialte the paypal payment instance
        paypal.payment.create(create_payment_json, async(error, paymentInfo)=>{
            if(error){
                console.log(error)

                return res.status(500).json({
                    success: false,
                    message: 'Transaction unsuccessful!'
                })
            }else{
                const newlyCreatedOrder = new Order({
                    userId, cartId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymetId, payerId
                })

                await newlyCreatedOrder.save()

                const approvalUrl = paymentInfo.links.find(link=> link.rel === 'approval_url').href

                res.status(201).json({
                    success:true,
                    approvalUrl, 
                    orderId: newlyCreatedOrder._id
                })
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error~'
        })
    }
}

// check if the payment is successful
const capturePayment = async(req, res)=>{
    try {

        const {paymentId, payerId, orderId} = req.body

        if(!orderId){
            return res.status(500).json({
                success: false,
                message: 'Cart is empty'
            })
        }
        

        const order = await Order.findById(orderId)

        if(!order){
            return res.status(404).json({
                success: false,
                message: 'Order cannot be found!'
            })
        }
        
        order.paymentStatus = 'paid'
        order.orderStatus = 'confirmed'
        order.paymetId = paymentId
        order.payerId = payerId

        for(let item of order.cartItems){
            let product = await Product.findById(item.productId)

            if(!product){
                return res.status(404).json({
                    success: false,
                    message: `Not enough stock for this product ${product.title}`
                })
            }

            product.totalStock -= item.quantity

            await product.save()
        }

        const getCartId = order.cartId

        //After payment is successful delete the items from the cart
        await Cart.findByIdAndDelete(getCartId)

        await order.save()

        res.status(200).json({
            success: true,
            message: 'Order Confirmed',
            data: order
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error~'
        })
    }
}

const getAllOrdersByUser = async(req, res)=>{

    try {

        const {userId} =  req.params

        const orders = await Order.find({userId})

        if(!orders.length){
            return res.status(404).json({
                success:false,
                message:'NO orders found'
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })
        
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Some error"
         })
    }

}

const getOrderDetails = async(req, res)=>{

    try {

        const {id} =  req.params

        const order = await Order.findById(id)

        if(!order){
            return res.status(404).json({
                success:false,
                message:'order not found'
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })
        
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Some error"
         })
    }

}


export {createOrder, capturePayment, getAllOrdersByUser, getOrderDetails}