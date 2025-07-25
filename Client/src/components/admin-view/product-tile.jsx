import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

export default function AdminProductTile({setCurrentEditedId, setOpenCreateProductsDialogue, setFormData, product, handleDelete}) {
  return (
    <Card className='w-full max-w-sm mx-auto bg-white'>
        <div>
            <div className='relative mt-[-25px] '>
                <img 
                src={product?.image}
                alt={product?.title}
                className='w-full h-[300px] object-cover rounded-t-lg' />
            </div>

            <CardContent>
                <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                <div className='flex justify-between items-center mb-2'>


                    <span className={`text-lg font-semibold ${product?.salePrice > 0 ? 'line-through' : ''}`}>

                    ${product.price}

                    </span >

                    {
                        product?.salePrice > 0 ? 

                        <span className='text-lg font-bold'>
                        
                        ${product.salePrice}
                        
                        </span>

                        : 

                        null

                    }

                    


                </div>
            </CardContent>

            <CardFooter className='flex justify-between items-center'>
                <Button className='bg-black text-white hover:cursor-pointer' onClick={()=>
                    {
                        setOpenCreateProductsDialogue(true)
                        setCurrentEditedId(product?._id)
                        setFormData(product)
                    }
                }>Edit</Button>


                <Button className='bg-black text-white hover:cursor-pointer' onClick={()=>handleDelete(product?._id)}>Delete</Button>
            </CardFooter>
        </div>
    </Card>
  )
}
