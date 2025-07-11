import React from 'react'
import accountImage from '../../assets/Article-Header_Ecommerce_Website.webp'
import { Tabs } from '@/components/ui/tabs'
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Orders from '@/components/shopping-view/orderes'
import Address from '@/components/shopping-view/address'

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
          <Tabs defaultValue='orderes'>
            <TabsList >
              <TabsTrigger className='!bg-white !border-black' value='orderes'>
                Orderes
              </TabsTrigger>

              <TabsTrigger className='!bg-white !border-black ml-2' value='address'>
                address
              </TabsTrigger>
            </TabsList>

            <TabsContent value='orderes'>
              <Orders/>
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
