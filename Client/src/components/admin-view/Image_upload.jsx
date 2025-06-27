import { Label } from '@radix-ui/react-label'
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'


export default function ProductImageUpload(
  {imageFile, setImageFile, uploadedImage, setUploadedImageUrl, setImageLoadingState}

) {

  const inputRef = useRef(null)

  function handleImageFileChange(event){
    console.log(event.target.files)
    const selectedFile = event.target.files?.[0]

    if(selectedFile){
      setImageFile(selectedFile)
    }
  }

  function handlDragOver(event){
    event.preventDefault()
  }

  function handleDrop(event){
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0]

    if(droppedFile){
      setImageFile(droppedFile)
    }
  }

  function handleRemoveImage(){
    setImageFile(null)
    if(inputRef.current){
      inputRef.current.value = ''
    }
  }

  async function uploadImageToCloudinary(){
    setImageLoadingState(true)
     const data = new FormData()
     data.append('my_file', imageFile)
     const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data)

     console.log(response.data)

     if(response.data?.success) setUploadedImageUrl(response.data.result.url)
      setImageLoadingState(false)
     
  }

  useEffect(()=>{
    if(imageFile !== null) {
      uploadImageToCloudinary()
    }
  },[imageFile])

  return (
    <div className='w-full max-w-md mx-auto px-3 mt-4'>
        <Label className='text-lg font-semibold mb-2 block '>Upload Image</Label>
        <div onDragOver={handlDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4'>
          <Input id='image-upload' type='file' className='hidden'
          ref={inputRef}
          onChange={handleImageFileChange}
          />

          {
          !imageFile? 
          <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer'>
            <UploadCloudIcon className='w-10 h-10 text-green-950 mb-2'/>
            <span>Drag & drop or click to upload image</span>
          </Label>  :  <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <FileIcon className='w-7 h-7 text-green-950 mr-2'/>
            </div>
            <p className='text-sm font-medium'>{imageFile.name}</p>
            <Button variant='ghost' size='icon' className='text-green-950 hover:text-green-800' onClick={handleRemoveImage}>
              <XIcon className='w-4 h-4 '/>
              <span className='sr-only'>Remove File</span>
            </Button>
          </div>
        }
        </div>
        
    </div>
  )
}
