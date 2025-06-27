import React, { useState } from 'react'
import { data, Link } from 'react-router-dom'
import CommonForm from '@/components/common/form'
import { loginFormControls } from '@/config'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/auth-slice'
import { toast } from "sonner"

const initialState = {
  email: '',
  password: '',
}

function AuthLogin() {

  const [formData, setFormData] = useState(initialState)

  const dispatch = useDispatch()

  function onsubmit(event){
    event.preventDefault()

    dispatch(loginUser(formData))
    .then(data=> {
      console.log(data)

      if(data?.payload.success){
        toast("Logged in successfully.")
      }
      
    }).catch(error=>{
      toast("Log in unsuccessful.")
    })

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center '>
        <h1 className='text-3xl font-bold tracking-tight text-black'>Sign in to your account</h1>
        <p className='mt-2 '>Don't have an acconunt
          <Link className='font-medium ml-2 text-purple-200 hover:underline' to='/auth/register'>Register</Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onsubmit}
      />
    </div>
  )
}

export default AuthLogin