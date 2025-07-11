import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

export default function AddressCard({addressInfo, handleDeleteAddress, handleEditAddress}){

  console.log(addressInfo)

  return (
    
    <Card>
        <CardContent className='grid p- gap-4'>
            <Label>Address: {addressInfo?.address || "NIL"}</Label>
            <Label>City: {addressInfo?.city || "NIL"}</Label>
            <Label>Pincode: {addressInfo?.pincode || "NIL"}</Label>
            <Label>Phone: {addressInfo?.phone || "NIL"}</Label>
            <Label>Notes: {addressInfo?.notes || "NIL"}</Label>
        </CardContent>

        <CardFooter className='flex justify-between'>
          <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>

          <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}
