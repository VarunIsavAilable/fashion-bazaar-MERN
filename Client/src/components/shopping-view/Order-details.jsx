import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { useSelector } from 'react-redux'

export default function ShoppingOrderDetailsView({orderDetails}) {

    const {user} = useSelector(state=>state.auth)


    function totalPrice(cart){
        if(orderDetails !== null){
            let sum = ''
            cart.map(item=> sum+=item?.price)
            return sum
        }
    }

  return (
    <DialogContent className='sm:max-w-[600px] bg-white'>
        <div className='grid gap-6'>
            <div className='grid gap-2'>
                <div className='flex mt-6 items-center justify-between'>
                    <p className='font-medium'>Order ID</p>
                    <Label>{orderDetails?._id}</Label>
                </div>

                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Date</p>
                    <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                </div>

                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Status</p>
                    <Label>{orderDetails?.orderStatus}</Label>
                </div>

                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Payment Method</p>
                    <Label>{orderDetails?.paymentMethod}</Label>
                </div>
                

                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Price</p>
                    <Label>${totalPrice(orderDetails?.cartItems)}</Label>
                </div>
            </div>

            <Separator/>

            <div className='grid gap-4 '>
                <div className='grid gap-2 '>
                    <div className='font-bold'>Order Details</div>
                    <ul className='grid gap-3'>
                        {   
                            orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                            orderDetails?.cartItems.map(item=>
                                <li className='flex items-center justify-between'>

                                    <span>Title: {item?.title}</span>
                                    <span>Quantity: {item?.quantity}</span>
                                    <span>Price: ${item?.price}</span>
                
                                 </li>
                            ) : null
                        }
                    </ul>
                </div>
            </div>



            <div className='grid gap-4 '>
                <div className='grid gap-2 '>
                    <div className='font-bold'>Shipping Info</div>
                    <div className='grid gap-0.5'>
                        <span>{user?.username}</span>
                        <span>{orderDetails?.addressInfo?.address}</span>
                        <span>{orderDetails?.addressInfo?.city}</span>
                        <span>{orderDetails?.addressInfo?.pincode}</span>
                        <span>{orderDetails?.addressInfo?.phone}</span>
                        <span>{orderDetails?.addressInfo?.notes}</span>
                    </div>
                </div>
            </div>

        </div>
    </DialogContent>
)
}
