import React from 'react'
import {AlignJustify, LogOut} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'

export default function AdminHeader({setOpen}) {

  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logoutUser())
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 w-full  bg-[#131316] text-white'>

      <Button onClick={() => setOpen(prev => !prev)} className='lg:hidden sm:block cursor-pointer'>
        <AlignJustify />
        <span className='sr-only'>Toggle Menu</span>
      </Button>

      <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogout} className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer'><LogOut /> Logout</Button>
      </div>

    </header>
  )
}
