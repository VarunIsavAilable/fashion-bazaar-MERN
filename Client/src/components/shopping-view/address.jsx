import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAnAddress, editAnAddress, fetchAllAddress } from '@/store/shop/address-slice'
import AddressCard from './Address-card'
import { toast } from 'sonner'

const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: '',
}

export default function Address() {

    const [formData, setFormData] = useState(initialAddressFormData)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.auth)
    const {addressList} = useSelector(state=>state.shopAddress)

    function handleManageAddress(event){
        event.preventDefault() 

        if(addressList.length > 2 && currentEditedId == null){
            toast("You can add maximum 3 addresses.")
            setFormData(initialAddressFormData)
            return
        }

        currentEditedId !==null ?
        
        dispatch(editAnAddress({userId: user.id, addressId: currentEditedId, formData}))
        .then(data=>{
            if(data.payload.success){
                dispatch(fetchAllAddress(user.id))
                setCurrentEditedId(null)
                setFormData(initialAddressFormData)
            }
        })
        
        :
        
        dispatch(addNewAddress({
            ...formData, userId: user?.id
        })).then(data=>{
            console.log(data)
            if(data.payload.success){
                dispatch(fetchAllAddress(user.id))
                setFormData(initialAddressFormData)
            }
        })
    }

    function handleDeleteAddress(getCurrentAddress){
        dispatch(deleteAnAddress({userId: user.id, addressId: getCurrentAddress._id}))
        .then(data=>{
            if(data.payload.success){
                dispatch(fetchAllAddress(user?.id))
            }
        })
    }

    function handleEditAddress(getCurrentAddress){
        setCurrentEditedId(getCurrentAddress?._id)

        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes
        })


    }

    useEffect(()=>{
        dispatch(fetchAllAddress(user?.id))
    }, [dispatch])


  return (
    <Card>
        <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-1  gap-2'>
            {
                addressList && addressList.length > 0 ? 
                addressList.map(singleAddressItem=>
                    <AddressCard addressInfo={singleAddressItem} handleDeleteAddress={handleDeleteAddress}
                    handleEditAddress={handleEditAddress}/>
                ) : null
            }
        </div>
        <CardHeader>
            <CardTitle>{currentEditedId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
        </CardHeader>
        <CardContent >
            <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            onSubmit={handleManageAddress}
            />
        </CardContent>
    </Card>
  )
}
