import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon, Footprints, Codepen, Codesandbox, Dribbble, Figma, Slack, Framer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '@/store/shop/products-slice'
import ShoppingProductTile from '@/components/shopping-view/Product-tile'
import fetchProductDetails from '@/store/shop/products-slice'
import { addToCart } from '@/store/shop/cart-slice'
import { fetchCartItems } from '@/store/shop/cart-slice'

import bannerOne from '../../assets/1.jpg'
import bannerTwo from '../../assets/2.jpg'
import bannerThree from '../../assets/3.jpg'
import bannerFour from '../../assets/4.jpg'
import bannerFive from '../../assets/5.jpg'
import bannerSix from '../../assets/6.jpg'
import bannerSeven from '../../assets/7.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"


export default function ShoppinHome() {

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: Footprints },
  ];

  

  const brandsWithIcon =  [
    { id: "nike", label: "Nike", icon: Codepen },
    { id: "adidas", label: "Adidas", icon: Codesandbox },
    { id: "puma", label: "Puma", icon: Dribbble },
    { id: "lv", label: "LV", icon: Figma },
    { id: "zara", label: "Zara", icon: Slack },
    { id: "h&m", label: "H&M", icon: Framer },
  ]

  const navigate = useNavigate()

  const {user} = useSelector(state=>state.auth)

  function handleNavigateToListingPage(getCurrentItem, section){
    sessionStorage.removeItem('filters')
    const currentFilter = {
      [section] : [getCurrentItem.id]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }


  const [currennSlide, setCurrentSlide] = useState(0)

  const slides = [bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix, bannerSeven]

  const dispatch = useDispatch()

  const {productList} = useSelector(state=>state.shopProducts)



  function handleAddToCart(getCurrentProductId){
    console.log(getCurrentProductId, "Product id")
      dispatch(addToCart({userId: user?.id, productId: getCurrentProductId, quantity: 1}))
      .then((data)=>{
        if(data?.payload?.success){
          dispatch(fetchCartItems(user?.id))
          toast("Product is added to cart.")
        }
      })
    }



  useEffect(()=>{

    const timer = setInterval(()=>{
      setCurrentSlide(prevSlide=>(prevSlide+1)%slides.length)
    }, 4000)

    return ()=> clearInterval(timer)

  }, [])

  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filterParams: {}, sortParams: 'price-lowtohigh'}))
  }, [dispatch])

  console.log(productList)


  return (
    
    <div className='flex flex-col min-h-screen w-screen'>
      <div className='relative  w-screen h-[650px] aspect-[16/9] overflow-hidden'>
        {
          slides.map((slide, index)=>
            <img 
              src={slide}
              key={index}
              className={`${index ===currennSlide ?  `opacity-100` : `opacity-0`} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />
          )
        }

        <Button onClick={()=>setCurrentSlide(prevSlide=> (prevSlide-1 + slides.length) % slides.length)} variant='outline' size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2 !bg-white'>
          <ChevronLeftIcon className='w-4 h-4 text-black'/>
        </Button>

        <Button onClick={()=>setCurrentSlide(prevSlide=> (prevSlide+1) % slides.length)} variant='outline' size='icon' className='absolute top-1/2 right-8 transform -translate-y-1/2 !bg-white/80'>
          <ChevronRightIcon className='w-4 h-4 text-black'/>
        </Button>
      </div>

        <section className='py-12 bg-gray-50 flex items-center justify-center'>
          <div className='container max-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {
                categoriesWithIcon.map(categoryItem=>
                  <Card onClick={()=>handleNavigateToListingPage(categoryItem, 'category')} className='cursor-pointer hover:shadow-lg transition-shadow'>
                    <CardContent className='flex flex-col items-center justify-center p-6'>
                      <categoryItem.icon className='w-12 h-12 mb-4'/>
                      <span className='font-bold'>{categoryItem.label}</span>
                    </CardContent>
                  </Card>
                )
              }
            </div>
          </div>
        </section>

        <section className='py-12 bg-gray-50 flex items-center justify-center'>
          <div className='container max-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {
                brandsWithIcon.map(brandItem=>
                  <Card onClick={()=>handleNavigateToListingPage(brandItem, 'brand')} className='cursor-pointer hover:shadow-lg transition-shadow'>
                    <CardContent className='flex flex-col items-center justify-center p-6'>
                      <brandItem.icon className='w-12 h-12 mb-4'/>
                      <span className='font-bold'>{brandItem.label}</span>
                    </CardContent>
                  </Card>
                )
              }
            </div>
          </div>
        </section>

        <section className='py-12 flex items-center justify-center'>
            <div className='container max-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 md:frid-cols-3 lg:grid-cols-4 gap-6'>
                {
                  productList && productList.length > 0 ? 
                  productList.map(productItem=>
                    <ShoppingProductTile 
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}/>
                  )
                  : null
                }
              </div>
            </div>
        </section>

    </div>
  )
}
