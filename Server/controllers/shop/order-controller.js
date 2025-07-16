import paypal from '../../helpers/paypal.js'
import Order from '../../models/Order.js'

// Save order in the database
const createOrder = async(req, res)=>{
    try {

        const {userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymetId, payesId} = req.body

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
                    userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymetId, payesId
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
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error~'
        })
    }
}


export {createOrder, capturePayment}