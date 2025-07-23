import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop/order-slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function PaypalReturnPage() {

    const dispatch = useDispatch()
    const location  = useLocation()
    const params = new URLSearchParams(location.search)

    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')

    

    useEffect(()=>{

        if(payerId && payerId){
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))

            console.log(orderId, 'order id at paypla return ')

            dispatch(capturePayment({paymentId, payerId, orderId})).then(data=>{
                if(data?.payload?.success){
                    sessionStorage.removeItem('currentOrderId')
                    window.location.href = '/shop/payment-success'
                }
            })
        }

    }, [payerId, payerId, dispatch])

  return (
    <Card>
        <CardHeader>
            <CardTitle>Processing Payment... Please Wait</CardTitle>
        </CardHeader>
    </Card>
  )
}
