import Order from '../../models/Order.js'
import ProductReview from '../../models/Review.js'
import Product from '../../models/Product.js'

const addProductReview = async(req, res)=>{
    try {

       const {productId, userId, username, reviewMessage, reviewValue} = req.body

       //Only the user that have bought the product should review

       const order = await Order.findOne({
        userId,
        "cartItems.productId" : productId,
        orderStatus : 'Delivered'
       })

       if(!order){
            return res.status(403).json({
                success: false,
                message: 'You need to purchace product to review it.'
            })
       }

       const checkExistingReview = await ProductReview.findOne({productId, userId})

       if(checkExistingReview){
        return res.status(400).json({
            success: false,
            message: 'Already reviewed.'
        })
       }

       const newReview = new ProductReview({
        productId, userId, username, reviewMessage, reviewValue
       })

       await newReview.save()

       const reviews = await ProductReview.find({
        productId
       })

       const totalReviewsLength = reviews.length

       const averageReview = reviews.reduce((sum, reviewItem)=>
            sum + reviewItem.reviewValue, 0) / totalReviewsLength

    await Product.findByIdAndUpdate(productId, {averageReview})

    res.status(201).json({
        success: true, data: newReview
    })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'error'
        })
    }
}


const getProductReviews = async(req, res)=>{
    try {

        const {productId} = req.params

        const reviews = await ProductReview.find({productId})


        res.status(200).json({
        success: true, data: reviews
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'error'
        })
    }
}


export {addProductReview, getProductReviews}