import React, { useState } from "react";
import image from "../../assets/Article-Header_Ecommerce_Website.webp";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import paypalImg from "../../assets/paypal-removebg-preview.png";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";

export default function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [currentSelectedAddress, setCurrentSelctedAddress] = useState(null)

  const [isPaymentStart, setIsPaymentStart] = useState(false)

  const {approvalURL} = useSelector(state=>state.shopOrder)

  const dispatch = useDispatch()

  console.log("current address:",currentSelectedAddress)

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  

  function handleInitialtePaypalPaymant() {

    // console.log(cartItems)


    if(cartItems.length === 0){
      toast("Your cart is empty.")
      return
    }

    if( currentSelectedAddress === null){
      toast("Select an address to proceed.") 
      return
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(singleCartItem=>({
            productId: singleCartItem?.productId,
            title: singleCartItem?.title,
            image: singleCartItem?.image,
            price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
            quantity: singleCartItem?.quantity,
      })),
      addressInfo : {
        addressId: currentSelectedAddress?._id,
        assdree: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymetId: '',
      payerId: ''
    }

    // console.log(orderData)

    dispatch(createNewOrder(orderData))
    .then(data=>{
      // console.log(data)

      if(data?.payload?.success){
        setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false)
      }
    })
      
  }

  if(approvalURL){
    window.location.href = approvalURL
  }

  

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] overflow-hidden">
        <img src={image} className="h-full w-full object-cover object-center" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5 p-5">
        <Address setCurrentSelctedAddress={setCurrentSelctedAddress}/>

        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemContent cartItems={item} />
              ))
            : null}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between ">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button
              onClick={handleInitialtePaypalPaymant}
              className="!bg-gray-200 text-black w-full !border-black"
            >
              Checkout with Paypal
              <img src={paypalImg} className="w-10 h-9" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
