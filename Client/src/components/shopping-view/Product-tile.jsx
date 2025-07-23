import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button'
import { brandOptionsMap, categoryOptionsMap } from '@/config'

export default function ShoppingProductTile({product, handleGetProductDetails, handleAddToCart}) {
  return (
    <Card className='w-full max-w-sm mx-auto'>
        <div onClick={()=>handleGetProductDetails(product?._id)}>
            <div className='relative '>
                <img 
                src={product?.image} 
                alt={product.title}
                className='w-full h-[300px] object-cover rounded-t-xl mt-[-24px]'
                />
                {
                    product?.totalStock === 0 ?  
                    <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>Out of stock</Badge> :

                    product?.totalStock < 10 ? 
                    <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>{`Only ${product.totalStock} items left`}</Badge> :

                    product?.salePrice > 0 ?
                    <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>Sale</Badge> : null
                }
            </div>
            <CardContent className='p-4'>
                <h2 className='text-xl font-bold mb-2'>{product.title}</h2>

                <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm'>
                        {
                           categoryOptionsMap[product?.category]
                        }
                    </span>

                    <span className='text-sm'>
                        {
                           brandOptionsMap [product?.brand]
                        }
                    </span>
                </div>


                <div className='flex justify-between items-center mb-2'>
                    <span className={`text-lg font-semibold ${product.salePrice > 0 ? `line-through` : ''}`}>
                        ${
                            product?.price
                        }
                    </span>

                    {
                        product?.salePrice > 0 ?
                        <span className='text-lg font-semibold'>
                            ${
                                product?.salePrice
                            }
                        </span> : null
                    }
                    
                </div>

            </CardContent>

            
        </div>

        <CardFooter>
            {
                product.totalStock === 0? 
                <Button className='w-full bg-black text-white hover:cursor-not-allowed opacity-60 '>
                    Out of stock
                </Button> :

                <Button onClick={()=>handleAddToCart(product?._id, product?.totalStock)} className='w-full bg-black text-white hover:cursor-pointer'>
                    Add to cart
                </Button>
            }
        </CardFooter>

    </Card>
  )
}
