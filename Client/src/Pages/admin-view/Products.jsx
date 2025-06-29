import ProductImageUpload from '@/components/admin-view/Image_upload'
import AdminProductTile from '@/components/admin-view/product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { addNewProduct, deleteProduct, editProduct, fetchAllNewProduct } from '@/store/admin/products-slice'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "sonner"

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category:'',
  brand:'',
  price: "",
  salePrice: "",
  totalStock: '',
}

function AdminProducts() {

  const [openCreateProductsDialogue, setOpenCreateProductsDialogue] = useState(false)

  const [formData, setFormData] = useState(initialFormData)

  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  const [imageLoadingState, setImageLoadingState] = useState(false)

  const [currentEditedId, setCurrentEditedId] = useState(null)

  const {productList} = useSelector(state=>state.adminProducts)

  const dispatch = useDispatch() //For asyncThunk to send data to backend

  


  function handleDelete(getCurrentProductId){
      dispatch(deleteProduct(getCurrentProductId))
      .then((data)=>{
        if(data?.payload?.success){
          dispatch(fetchAllNewProduct());
        }
      })
  }

  function isFormValid(){
    return Object.keys(formData)
    .map(key=> formData.key !== '')
    .every(item => item)
  }


  useEffect(()=>{
    dispatch(fetchAllNewProduct())
  }, [dispatch])


  console.log(productList , "productList")


  function onSubmit(event){
    event.preventDefault()

    currentEditedId !== null ?
    dispatch(editProduct({
      id: currentEditedId, FormData: formData
    })).then((data)=>{
      console.log(data)

      if(data?.payload?.success){
        dispatch(fetchAllNewProduct())
        setFormData(initialFormData)
        setOpenCreateProductsDialogue(false)
        setCurrentEditedId(null)
      }
    
    }) : 

    dispatch(addNewProduct({
      ...formData, 
      image: uploadedImageUrl,
    })).then((data)=>{
      console.log(data)
      if(data?.payload.success){
        dispatch(fetchAllNewProduct())
        setOpenCreateProductsDialogue(false)
        setImageFile(null)
        setFormData(initialFormData)
        
        toast("Product added successfully.")
      }
    })
  }

  console.log(formData, uploadedImageUrl)

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end '>
        <Button onClick={()=>setOpenCreateProductsDialogue(true)}>
          Add New Product
        </Button>
      </div>


      {/* Render the products Varun Bhai! */}
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {
            productList && productList.length > 0 ? 
            productList.map((productItem)=> 
            <AdminProductTile 
            key={productItem.id}
            setCurrentEditedId={setCurrentEditedId} setOpenCreateProductsDialogue={setOpenCreateProductsDialogue} setFormData={setFormData} product={productItem}
            handleDelete={handleDelete}/>) : null
          }
      </div>




      <Sheet open={openCreateProductsDialogue} onOpenChange={()=>{      setOpenCreateProductsDialogue(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
      }}>

        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ?
                `Edit Product` : `Add New Products`
              }
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImage={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
            />

          <div className='py-6 px-3'>
            <CommonForm
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            formControls={addProductFormElements}
            isBtnDisabled={!isFormValid()}
            buttonText={
              
                currentEditedId !== null ?
                `Edit Product` : `Add New Products`
              
            }/>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts


