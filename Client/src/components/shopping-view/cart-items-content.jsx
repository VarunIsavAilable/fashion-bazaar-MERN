import React, { use } from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartQuantity } from '@/store/shop/cart-slice'

import { toast } from "sonner"


export default function UserCartItemContent({cartItems}) {

    const dispatch = useDispatch()

    const {user} = useSelector(state=>state.auth)

    function handleCartItemDelete(getCartItem){
        dispatch(deleteCartItem({userId: user.id, productId: getCartItem.productId}))

        .then((data)=>{
            if(data.payload.success){
                toast(`Cart item "${getCartItem.title}" deleted!`)
            }
        })
    }

    function handleUpdateQuantity(getCartItem, typeOfAction){
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
        src={cartItems?.image} 
        alt={cartItems?.title}  className='w-20 h-20 rounded object-cover'/>

        <div className='flex-1'>
            <h3 className='font-extrabold'>{cartItems?.title}</h3>
            <div className='flex items-center mt-1 gap-2'>
                <Button onClick={()=>handleUpdateQuantity(cartItems, 'minus')} variant='outline' size='icons' className='h-8 w-8 rounded-full ' disabled={cartItems && cartItems.quantity === 1}>
                    <Minus className='w-8 h-8 text-white'/>
                    <span className='sr-only'>Decrease</span>
                </Button>

                <span className='text-black font-semibold'>{cartItems?.quantity}</span>

                <Button onClick={()=>handleUpdateQuantity(cartItems, 'plus')} variant='outline' size='icons' className='h-8 w-8 rounded-full'>
                    <Plus className='w-8 h-8 text-white'/>
                    <span className='sr-only'>Decrease</span>
                </Button>
            </div>
        </div>

        <div className='flex flex-col items-end'>
            <p className='font-semibold'>
                ${((cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems.price)* cartItems.quantity).toFixed(2)}
            </p>

            <Trash onClick={()=>handleCartItemDelete(cartItems)} className='cursor-pointer mt-1' size={20}/>
        </div>
    </div>
  )
}
