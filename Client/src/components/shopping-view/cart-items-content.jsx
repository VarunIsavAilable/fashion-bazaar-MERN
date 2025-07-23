import React, { use } from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartQuantity } from '@/store/shop/cart-slice'

import { toast } from "sonner"


export default function UserCartItemContent({cartItem}) {

    console.log(cartItem, 'user cart items content')

    const dispatch = useDispatch()

    const {user} = useSelector(state=>state.auth)

    //let's check user can not add more items than available.
    const {cartItems} = useSelector(state=>state.shopCart)
    const {productList} = useSelector(state=>state.shopProducts)

    function handleCartItemDelete(getCartItem){
        dispatch(deleteCartItem({userId: user.id, productId: getCartItem.productId}))

        .then((data)=>{
            if(data.payload.success){
                toast(`Cart item "${getCartItem.title}" deleted!`)
            }
        })
    }

    function handleUpdateQuantity(getCartItem, typeOfAction){
        if(typeOfAction == 'plus'){

            let getCartItems = cartItems.items || []
        
            if(getCartItems.length){
                const indexOfCurrentCartItem = getCartItems.findIndex((item)=> item.productId === getCartItem?.productId);

                const getCurrentProductIndex = productList.findIndex(product=>product._id === getCartItem?.productId)

                const getTotalStock = productList[getCurrentProductIndex].totalStock
        
                if(indexOfCurrentCartItem > -1){
                    
                    const getQuantity = getCartItems[indexOfCurrentCartItem].quantity

                    if(getQuantity + 1 > getTotalStock){
                        toast(`Only ${getTotalStock} can be added for this item`)
                        return
                    }
                }
            }
        }


        dispatch(updateCartQuantity({userId: user.id, productId : getCartItem.productId, quantity:
            
        typeOfAction === 'plus' ? getCartItem.quantity + 1 : getCartItem.quantity - 1}))

        .then((data)=>{
            if(data.payload.success){
                toast('Cart item is updated!')
            }
        })

        
    }

  return (
    <div className='flex items-center space-x-4 '>
        <img 
        src={cartItem?.image} 
        alt={cartItem?.title}  className='w-20 h-20 rounded object-cover'/>

        <div className='flex-1'>
            <h3 className='font-extrabold'>{cartItem?.title}</h3>
            <div className='flex items-center mt-1 gap-2'>
                <Button onClick={()=>handleUpdateQuantity(cartItem, 'minus')} variant='outline' size='icons' className='h-8 w-8 rounded-full' disabled={cartItem && cartItem.quantity === 1}>
                    <Minus className='w-8 h-8'/>
                    <span className='sr-only'>Decrease</span>
                </Button>

                <span className='text-black font-semibold'>{cartItem?.quantity}</span>

                <Button onClick={()=>handleUpdateQuantity(cartItem, 'plus')} variant='outline' size='icons' className='h-8 w-8 rounded-full'>
                    <Plus className='w-8 h-8'/>
                    <span className='sr-only'>Decrease</span>
                </Button>
            </div>
        </div>

        <div className='flex flex-col items-end'>
            <p className='font-semibold'>
                ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price)* cartItem.quantity).toFixed(2)}
            </p>

            <Trash onClick={()=>handleCartItemDelete(cartItem)} className='cursor-pointer mt-1' size={20}/>
        </div>
    </div>
  )
}
