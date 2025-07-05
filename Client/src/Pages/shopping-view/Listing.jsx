import ProductFilter from '@/components/shopping-view/Filter'
import ProductDetailsDialogue from '@/components/shopping-view/Product-details'
import ShoppingProductTile from '@/components/shopping-view/Product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useSearchParams } from 'react-router-dom'





function createSearchParamsHelper(filtersParams){
  const queryParams = []

  for(const [key, value] of Object.entries(filtersParams)){
    if(Array.isArray(value) && value.length > 0 ){
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }

  return queryParams.join('&')
}



export default function ShoppingListing() {

  const dispatch = useDispatch()

  //todo Get data from store
  const {productList, productDetails} = useSelector(state=> state.shopProducts)

  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)

  const [searchPrams, setSearchParams] = useSearchParams()

  const [openDetailsDialogue, setOpenDetailsDialogue] = useState(false)
  

  function handleSort(value){
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption){

    
    let copyFilters = {...filters}
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId)

    //chack whether the brand and cat present or not.
    if(indexOfCurrentSection === -1){
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption]
      }
    }

    else{
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption)

      if(indexOfCurrentOption === -1){
        copyFilters[getSectionId].push(getCurrentOption)
      }

      else{
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }


    setFilters(copyFilters)

    sessionStorage.setItem('filters', JSON.stringify(copyFilters))

    console.log(copyFilters)
  }



  function handleGetProductDetails(getCurrentProductId){
    // console.log(getCurrentProductId)

    dispatch(fetchProductDetails(getCurrentProductId))
  }




  //On page load extract the content of filters and sort
  useEffect(()=>{
      setSort('price-lowtohigh')
      setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])


  useEffect(()=>{
    if(filters && Object.keys(filters).length > 0){
      const createQueryString = createSearchParamsHelper(filters)
      console.log(filters)
      console.log(createQueryString)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])

  
  console.log(productDetails)


  //fetch list of products - This will go to the asyncThunk to make server req for product rendering then see we are use UseSelector to fetch items from store...

  useEffect(() => {
    if(filters !==null && sort !== null)
    dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}));
  }, [dispatch, sort, filters]);



  useEffect(()=>{
    if(productDetails !== null){
      setOpenDetailsDialogue(true)
    }
  }, [productDetails])



  return (
    <>
    <div className='grid grid-cols-2 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>

      <ProductFilter filters={filters} handleFilter={handleFilter} />


      <div className=' rounded-lg shadow-sm lg:ml-[-100px] md:ml-[-100px] sm:ml-[-100px] '>
        <div className='p-4 border-b flex items-center justify-between '>
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className='flex items-center gap-2'>
            <span>{productList?.length} Products</span>
          </div>
          <DropdownMenu >
            <DropdownMenuTrigger asChild >
              <Button variant='outline' size='sm' className='flex items-center gap-1'>
                <ArrowUpDownIcon className='h-4 w-4 text-white '/>
                <span className='text-white'>Sort by</span>
              </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className='w-[200px] z-[9999]' modal={false}>


              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} 
              
              className='bg-pink-300 text-white rounded-2xl sticky z-70'>
                {
                  sortOptions.map(sortItem=>
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id} className='hover:bg-white hover:text-black'>
                      {
                        sortItem.label
                      }
                    </DropdownMenuRadioItem>
                  )
                }
              </DropdownMenuRadioGroup>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='grid grid-cols-1 sm:grid-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-2'>
          {
            productList && productList.length > 0 ?
            productList.map(productItem=> 
              <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} product={productItem}/>
            ) : null
          }
      </div>
      </div>

      <ProductDetailsDialogue open={openDetailsDialogue} setOpen={setOpenDetailsDialogue} productDetails={productDetails}/>

    </div>

    

    </>
    
  )
}
