import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderDetailsView from './Order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/admin/order-slice'

export default function AdminOrdersView() {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const {orderList, orderDetails} = useSelector(state=>state.adminOrder)

  function totalPrice(cart){
    let sum = ''
    cart.map(item=> sum+=item?.price)
    return sum
  }

  function hendleFetchOrderDetails(getId){
    dispatch(getOrderDetailsForAdmin(getId))
  }

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  useEffect(()=>{

    if(orderDetails !== null){
      setOpenDetailsDialog(true)
    }

  }, [orderDetails])

  return (
    <Card className='bg-white'>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              orderList && orderList.length > 0 ? orderList.map(orderItem=>
              <TableRow>
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                <TableCell className={`${orderItem?.orderStatus == 'confirmed'? `text-green-600` : `text-black`}`}>{orderItem?.orderStatus}</TableCell>
                <TableCell>${totalPrice(orderItem?.cartItems)}</TableCell>
                <TableCell>
                  <Dialog open={openDetailsDialog}
                    onOpenChange={()=>{
                    setOpenDetailsDialog(false)
                    dispatch(resetOrderDetails())
                    }}
                    >
                    <Button 
                    onClick={()=>hendleFetchOrderDetails(orderItem._id)} 
                    className='bg-black text-white hover:cursor-pointer'>View Details</Button>


                    <AdminOrderDetailsView orderDetails={orderDetails}/>


                  </Dialog>
                </TableCell>
            </TableRow>
              ) : null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
