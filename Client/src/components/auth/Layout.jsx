import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className='flex h-screen w-screen'>
      {/* Left side (black box) */}
      <div className='hidden lg:flex w-1/2 items-center justify-center bg-black'>
        <div className='max-w-md text-center text-white space-y-6 px-6'>
          <h1 className='text-4xl font-extrabold leading-tight tracking-tight'>
            Welcome to <br /> Fashion Bazar
          </h1>
        </div>
      </div>

      {/* Right side (white content box) */}
      <div className='flex flex-1 items-center justify-center bg-green-200'>
        <div className='w-full max-w-md px-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
