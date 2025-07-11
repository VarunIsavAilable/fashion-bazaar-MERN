import React from 'react'
import image from '../../assets/Article-Header_Ecommerce_Website.webp'
import Address from '@/components/shopping-view/address'
import { useSelector } from 'react-redux'
import UserCartItemContent from '@/components/shopping-view/cart-items-content'

export default function ShoppingCheckout() {
  const { cartItems } = useSelector(state=>state.shopCart)

  
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] overflow-hidden'>
        <img src={image}
        className='h-full w-full object-cover object-center' />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
        <Address/>
      </div>

      <div className='flex flex-col gap-4'>
        {
          cartItems && cartItems.items && cartItems.length > 0 && cartItems.items.length > 0 ?
          cartItems.items.map((item)=>{
            <UserCartItemContent cartItems={item}/>
            console.log(item)
          }
          ) : null
        }
      </div>
    </div>
  )
}
