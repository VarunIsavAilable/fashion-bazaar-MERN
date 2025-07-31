import ShoppingProductTile from '@/components/shopping-view/Product-tile'
import { Input } from '@/components/ui/input'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchProductDetails } from '@/store/shop/products-slice'
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import ProductDetailsDialogue from '@/components/shopping-view/Product-details'
import { toast } from 'sonner'

export default function Search() {
    const [keyword, setKeyword] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [openDetailsDialogue, setOpenDetailsDialogue] = useState(false)
    const {searchResults} = useSelector(state=>state.shopSearch)
    const {productDetails} = useSelector(state=>state.shopProducts)
    const {cartItems} = useSelector(state=>state.shopCart)
    const {user} = useSelector(state=>state.auth)
    const dispath = useDispatch()

    useEffect(()=>{

        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3){
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`keyword=${keyword}`))

                dispath(getSearchResults(keyword))
            }, 1000);
        }else{
            setSearchParams(new URLSearchParams(`keyword=${keyword}`))
            dispath(resetSearchResults())
        }

    }, [keyword])

    useEffect(()=>{
        if(productDetails !== null){
          setOpenDetailsDialogue(true)
        }
      }, [productDetails])

    function handleGetProductDetails(getCurrentProductId){
        dispath(fetchProductDetails(getCurrentProductId))
    }

    function handleAddToCart(getCurrentProductId, getTotalStock){
    //let's not let the user to add items more that the availibility
    // let getCartItems = cartItems

    
    // console.log(getCurrentProductId, 'getCurrentProductId')
    // console.log(getTotalStock, 'getTotalStock')

    let getCartItems = cartItems.items || []

    // console.log(getCartItems, 'Cart items')

    if(getCartItems.length){
      const indexOfCurrentItem = getCartItems.findIndex(item=> item.productId === getCurrentProductId)

      if(indexOfCurrentItem > -1){
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if(getQuantity + 1 > getTotalStock){
          toast(`Only ${getTotalStock} can be added for this item`)
          return
        }
      }
    }

    dispath(addToCart({userId: user?.id, productId:              
      getCurrentProductId, quantity: 1})).then((data)=>{
      if(data?.payload?.success){
        dispath(fetchCartItems(user?.id))
        // console.log(cartItems, 'Cart items after fetch')
        toast("Product is added to cart.")
      }
    }) 
  }

  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
        <div className='flex justify-center mb-8'>
            <div className='w-full flex items-center'>
                <Input 
                    className='py-6'
                    placeholder = "Sarch Products"
                    value = {keyword}
                    name = "keyword"
                    onChange = {(event)=>setKeyword(event.target.value)}
                />
            </div>
        </div>
        {
            !searchResults.length ? <h1 className='text-5xl font-extrabold text-center'>No result found</h1>: null
        }
        <div className='grid grid-cols-1 sm:grid-cols-2 mdgrid-cols-3 lg:grid-cols-4 gap-5'>
            {
                searchResults.map(item=> 
                    <ShoppingProductTile 
                    handleAddToCart={handleAddToCart} 
                    product={item}
                    handleGetProductDetails={handleGetProductDetails}/> 
                )
            }
        </div>
        <ProductDetailsDialogue open={openDetailsDialogue} setOpen={setOpenDetailsDialogue} productDetails={productDetails}/>
    </div>
  )
}
