import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'

export default function AdminOrderDetailsView() {

    const initialFormData = {
        status: ''
    }
    const [formData, setFormData] = useState(initialFormData)

    function handleUpdateStatus(event){
        event.preventDefault()

    }

  return (
    <DialogContent className='sm:max-w-[600px] bg-white'>
        <div className='grid gap-6'>
            <div className='grid gap-2'>
                <div className='flex mt-6 items-center justify-between'>
                    <p className='font-medium'>Order ID</p>
                    <Label>123456</Label>
                </div>

                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Date</p>
                    <Label>15/10/2025</Label>
                </div>

                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Status</p>
                    <Label>Shipped</Label>
                </div>

                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Price</p>
                    <Label>$9000</Label>
                </div>
            </div>

            <Separator/>

            <div className='grid gap-4 '>
                <div className='grid gap-2 '>
                    <div className='font-bold'>Order Details</div>
                    <ul className='grid gap-3'>
                        <li className='flex items-center justify-between'>
                            <span>Product One</span>
                            <span>$100</span>
                        </li>
                    </ul>
                </div>
            </div>



            <div className='grid gap-4 '>
                <div className='grid gap-2 '>
                    <div className='font-bold'>Shipping Info</div>
                    <div className='grid gap-0.5'>
                        <span>John Doe</span>
                        <span>USA</span>
                        <span>City</span>
                        <span>Pincode</span>
                        <span>Phone</span>
                        <span>Notes</span>
                    </div>
                </div>
            </div>



            <div>
                <CommonForm 
                formControls={[
                    {
                        label: 'Order Status',
                        name: 'status',
                        componentType: 'select',
                        options: [
                            {id: 'pending', label: 'Pending'},
                            {id: 'inProcess', label: 'In Process'},
                            {id: 'inShipping', label: 'In Shipping'},
                            {id: 'rejected', label: 'Rejected'},
                            {id: 'delivered', label: 'Delivered'},
                        ],
                    }
                ]}
                
                formData={formData}
                setFormData={setFormData}
                buttonText={'Update Order Status'}
                onSubmit={handleUpdateStatus}/>
            </div>
        </div>
    </DialogContent>
  )
}
