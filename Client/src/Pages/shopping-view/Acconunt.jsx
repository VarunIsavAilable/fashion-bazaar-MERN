import React from 'react'
import accountImage from '../../assets/Article-Header_Ecommerce_Website.webp'
import { Tabs } from '@/components/ui/tabs'
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

import Address from '@/components/shopping-view/address'
import ShoppingOrders from '@/components/shopping-view/orderes'

export default function ShoppingAccount() {
  return (
    <div className='felx flex-col'>
      <div className='relative h-[350px] w-full overflow-hidden'>
        <img 
        src={accountImage} 
        className='h-full w-full object-fill object-center' />
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg p-6 shadow-sm'>
          <Tabs defaultValue='orders'>
            <TabsList >
              <TabsTrigger value='orders' className='bg-black rounded-lg text-white w-1/3 h-10 hover:cursor-pointer'>
                Orders
              </TabsTrigger>

              <TabsTrigger className='bg-black
               rounded-lg text-white w-1/3 h-10 hover:cursor-pointer ml-1' value='address'>
                address
              </TabsTrigger>
            </TabsList>

            <TabsContent value='orders'>
              <ShoppingOrders/>
            </TabsContent>

            <TabsContent value='address'>
              <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
