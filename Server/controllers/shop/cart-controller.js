import Cart from "../../models/cart.js"
import Product from "../../models/Product.js"



const addToCart = async(req, res)=>{
    try {

    const {userId, productId, quantity} = req.body

    if(!userId || !productId || quantity <= 0){
        return res.status(400).json({
            success: false,
            message: 'Invalid data provided!'
        })
    }

    const product = await Product.findById(productId)

    if(!product){
        return res.status(404).json({
            success: false,
            message: 'Product not found!'
        })
    }

    let cart = await Cart.findOne({userId})

    if(!cart){
        cart = new Cart({userId, items : []})
    }



    const findCurrentProductIndex = cart.items.findIndex(item=> item.productId.toString() === productId)

    if(findCurrentProductIndex === -1){
        cart.items.push({productId, quantity})
    }else{
        cart.items[findCurrentProductIndex].quantity += quantity
    }

    await cart.save()

    return res.status(200).json({
        success: true,
        data: cart
    })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}


const fetchCartItems = async(req, res)=>{
    try {

        const {userId} = req.params

        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'UserId required!'
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path: 'items.productId',
            select: "image title price salePrice"
        })

        if(!cart){
            return res.status(404).json({
            success: false,
            message: 'Cart Not Found!'
            })
        }

        //VVM
        //What if admin has removed the product
        const validItems = cart.items.filter(producttItem=> producttItem.productId)

        if(validItems.length < cart.items.length){
            cart.items = validItems
            await cart.save()
        }


        const populateCartItems = validItems.map(item=> ({
            productId: item.productId.id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
        }))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items : populateCartItems
            }
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}


const updateCartItemQuantity = async(req, res)=>{
    try {

        const {userId, productId, quantity} = req.body

        if(!userId || !productId || quantity <= 0){
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided!'
            })
        }

        const cart = await Cart.findOne({userId})

        if(!cart){
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found!'
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(item=> item.productId.toString() === productId)

        if(findCurrentProductIndex === -1){
            return res.status(404).json({
                success: false,
                message: 'Item not found!'
            })
        }


        cart.items[findCurrentProductIndex].quantity = quantity

        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })


        const populateCartItems = cart.items.map(item=> ({
            productId: item.productId ? item.productId.id : null ,
            image: item.productId ? item.productId.image : null ,
            title: item.productId ? item.productId.title : 'Product not found!' ,
            price: item.productId ? item.productId.price : null ,
            salePrice: item.productId ? item.productId.salePrice : null ,
            quantity: item.quantity
        }))

        
        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items : populateCartItems
            }
        })
        
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}


const deleteCartItem = async(req, res)=>{
    try {

        const {userId, productId} = req.params

        if(!userId || !productId){
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided!'
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        if(!cart){
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found!'
            })
        }

        cart.items = cart.items.filter(item=> item.productId._id.toString() !== productId)

        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })


        const populateCartItems = cart.items.map(item=> ({
            productId: item.productId ? item.productId.id : null ,
            image: item.productId ? item.productId.image : null ,
            title: item.productId ? item.productId.title : 'Product not found!' ,
            price: item.productId ? item.productId.price : null ,
            salePrice: item.productId ? item.productId.salePrice : null ,
            quantity: item.quantity
        }))

        
        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items : populateCartItems
            }
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}


export {addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem}
