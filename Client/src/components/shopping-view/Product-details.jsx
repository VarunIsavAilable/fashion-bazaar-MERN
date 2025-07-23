import { Dialog, DialogContent } from "@/components/ui/dialog"
import React from 'react'
import { Button } from "../ui/button"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Star, StarIcon } from "lucide-react"
import { Input } from "../ui/input"
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { setProductDetails } from "@/store/shop/products-slice"


export default function ProductDetailsDialogue({open, setOpen, productDetails}) {

    const dispatch = useDispatch()

    const {user} = useSelector(state=>state.auth)

    const {cartItems} = useSelector(state=>state.shopCart)

    function handleAddToCart(getCurrentProductId, getTotalStock){
        let getCartItems = cartItems.items || []
    
        if(getCartItems.length){
                const indexOfCurrentItem = getCartItems.findIndex(item=> item.productId === getCurrentProductId)

                if(indexOfCurrentItem > -1){
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if(getQuantity + 1 > getTotalStock){
                    toast(`Only ${getTotalStock} can be added for this item`)
                    return
                }
            }
        }

        dispatch(addToCart({userId: user?.id, productId: getCurrentProductId, quantity: 1}))
        .then((data)=>{
        if(data?.payload?.success){
            dispatch(fetchCartItems(user?.id))
            toast("Product is added to cart.")
        }
        })
    }

    function handleDialogueClose(){
        setOpen(false)
        dispatch(setProductDetails())
    }

  return (
    <Dialog open={open} onOpenChange={handleDialogueClose}>
        <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white'>

            <div className='relative overflow-hidden rounded-lg sm:h-[240px] lg:h-full bg-black'>
                <img 
                src={productDetails?.image} 
                alt={productDetails?.title}
                className='aspect-square w-full object-cover' />
            </div>

            <div >
                <div>
                    <h1 className='text-3xl font-extrabolds font-bold'>{productDetails?.title}</h1>

                    <p className="px-1 text-2xl mb-5 mt-4">{productDetails?.description}</p>
                </div>
                
                <div className="flex items-center justify-between">

                    <p className={` text-3xl font-bold ${productDetails?.salePrice > 0 ? `line-through` : ''}`}>${productDetails?.price}</p>

                    {
                    
                    productDetails?.salePrice > 0 ? <p className="text-2xl font-bold">${productDetails?.salePrice}</p> : null

                    }
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <StarIcon className="w-5 h-5 fill-black"/>
                    <StarIcon className="w-5 h-5 fill-black"/>
                    <StarIcon className="w-5 h-5 fill-black"/>
                    <StarIcon className="w-5 h-5 fill-black"/>
                    <StarIcon className="w-5 h-5 fill-black"/>

                    <span >(4.5)</span>
                </div>
                

                <div className="mt-5 mb-5">
                    {
                        productDetails?.totalStock === 0 ? 
                        <Button
                         className='w-full bg-black text-white hover:cursor-not-allowed opacity-60 '>
                            Out of stock
                        </Button> :
        
                        <Button onClick={()=>handleAddToCart(productDetails?._id, productDetails?.totalStock)} className='w-full bg-black text-white hover:cursor-pointer'>
                            Add to cart
                        </Button>
                    }
                </div>

                <Separator/>
                <div className="max-h-[300px] overflow-auto-auto">
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                    <div className="grid gap-6">
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border rounded-2xl flex items-center justify-center  bg-black">
                                <AvatarFallback className="text-white font-bold">
                                    VP
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">Varun Pareek</h3>

                                </div>

                                <div className="flex items-center gap-0.5">
                                    <StarIcon className="w-5 h-5 fill-black"/>
                                    <StarIcon className="w-5 h-5 fill-black"/>
                                    <StarIcon className="w-5 h-5 fill-black"/>
                                    <StarIcon className="w-5 h-5 fill-black"/>
                                    <StarIcon className="w-5 h-5 fill-black"/>

                                </div>

                                <p>Good Product!!! 👍👍</p>

                            </div>

                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <Input
                        placeholder="Write a review..."/>
                        <Button className='bg-black text-white'>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
