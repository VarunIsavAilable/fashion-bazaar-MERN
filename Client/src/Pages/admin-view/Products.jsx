import ProductImageUpload from '@/components/admin-view/Image_upload'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { Fragment, useState } from 'react'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category:'',
  brand:'',
  price: "",
  salePrice: '',
  totalStoce: '',
}

function AdminProducts() {

  const [openCreateProductsDialogue, setOpenCreateProductsDialogue] = useState(false)

  const [formData, setFormData] = useState(initialFormData)

  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  const [imageLoadingState, setImageLoadingState] = useState(false)



  function onSubmit(){
    console.log("Or sunao")
  }

  console.log(formData)

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end '>
        <Button onClick={()=>setOpenCreateProductsDialogue(true)}>
          Add New Product
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>

      <Sheet open={openCreateProductsDialogue} onOpenChange={()=>setOpenCreateProductsDialogue(false)}>

        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>Add New Products</SheetTitle>
          </SheetHeader>

          <ProductImageUpload imageFile={imageFile}
  setImageFile={setImageFile}
  uploadedImage={uploadedImageUrl}
  setUploadedImageUrl={setUploadedImageUrl}
  setImageLoadingState={setImageLoadingState}/>

          <div className='py-6 px-3'>
            <CommonForm
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            formControls={addProductFormElements}
            buttonText='Add'/>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts


