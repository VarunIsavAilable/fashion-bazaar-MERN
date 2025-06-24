import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'

const initialState = {
  username: '',
  email: '',
  password: '',
}

function AuthRegister() {

  const [formData, setFormData] = useState(initialState)

  function onsubmit(){

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