import { Dialog, DialogContent } from "@/components/ui/dialog"
import React from 'react'
import { Button } from "../ui/button"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Star, StarIcon } from "lucide-react"
import { Input } from "../ui/input"

export default function ProductDetailsDialogue({open, setOpen, productDetails}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>

            <div className='relative overflow-hidden rounded-lg'>
                <img 
                src={productDetails?.image} 
                alt={productDetails?.title}
                width={600}
                height={600}
                className='aspect-square w-full object-cover' />
            </div>

            <div >
                <div>
                    <h1 className='text-3xl font-extrabolds'>{productDetails?.title}</h1>

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
                    <Button className='w-full'>
                        Add to Cart
                    </Button>
                </div>

                <Separator/>
                <div className="max-h-[300px] overflow-auto-auto">
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                    <div className="grid gap-6">
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border rounded-2xl flex items-center justify-center ">
                                <AvatarFallback>
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
                        <Button>
                            Submit
                        </Button>

                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
