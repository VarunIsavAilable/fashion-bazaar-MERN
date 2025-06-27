import React from 'react'
import {AlignJustify, LogOut} from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function AdminHeader({setOpen}) {
  return (
    <header className='flex items-center justify-between px-4 py-3 w-full  bg-[#131316] '>

      <Button onClick={() => setOpen(prev => !prev)} className='lg:hidden sm:block '>
        <AlignJustify />
        <span className='sr-only'>Toggle Menu</span>
      </Button>

      <div className='flex flex-1 justify-end'>
        <Button className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'><LogOut /> Logout</Button>
      </div>

    </header>
  )
}
