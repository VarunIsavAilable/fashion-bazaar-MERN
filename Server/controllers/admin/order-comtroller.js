import Order from "../../models/Order.js"


const getAllOrdersOfAllUsers = async(req, res)=>{

    try {
        const orders = await Order.find()

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

const getOrderDetailsForAdmin = async(req, res)=>{

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

const updateOrderStatus = async(req, res)=>{
    try {

        const {id} = req.params
        const {orderStatus} = req.body

        const order = await Order.findById(id)

        if(!order){
            return res.status(404).json({
                success:false,
                message:'order not found'
            })
        }

        await Order.findByIdAndUpdate(id, {orderStatus})

        res.status(200).json({
            success: true,
            message: 'Order status has been updated!'
        })
        
    } catch (error) {
        console.log(error)
        res.sta
    }
}

export {getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus}