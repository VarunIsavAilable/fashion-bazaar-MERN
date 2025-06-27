import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { useDispatch } from 'react-redux'
import  { registerUser } from '../../store/auth-slice'
import { toast } from "sonner"

const initialState = {
  username: '',
  email: '',
  password: '',
}

function AuthRegister() {

  const [formData, setFormData] = useState(initialState)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // const { toast } = useToast()

  function onsubmit(event){
    event.preventDefault()

    // Call registerUser from /store/auth-slice.js and dispatch
    dispatch(registerUser(formData)).then((data)=> {
      console.log(data)
      if(data?.payload.success){
        toast("Registration successful.")
        navigate('/auth/login')
      }
      
    }).catch((error)=> {
      console.log(error.message)
        toast("User already registered")
    })
  }


  console.log(formData)

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center '>
        <h1 className='text-3xl font-bold tracking-tight text-black'>Create new account</h1>
        <p className='mt-2 '>Already have an acconunt
          <Link className='font-medium ml-2 text-purple-200 hover:underline' to='/auth/login'>Login</Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onsubmit}
      />
    </div>
  )
}

export default AuthRegister