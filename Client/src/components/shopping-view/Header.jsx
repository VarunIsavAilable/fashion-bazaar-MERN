import React from 'react'
import { Link } from 'react-router-dom'
import { House, Menu, ShoppingCart }from 'lucide-react'
import { SheetTrigger, Sheet, SheetContent } from '../ui/sheet'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenuContent, DropdownMenuLabel } from '../ui/dropdown-menu'

function MenuItems(){
  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
    {
      shoppingViewHeaderMenuItems.map(menuItem=> 
        <Link
          key={menuItem.id}
          to={menuItem.path}
          className='text-sm font-medium !text-black no-underline hover:text-gray-700'
        >
          {menuItem.label}
        </Link>
      )
    }
  </nav>
}


function HeaderRightContent(){
  return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
    <Button variant='outline' size='icon' className='text-white'>
      <ShoppingCart className='w-5 h-5 text-white'/>
      <span className='sr-only'>User Cart</span>
    </Button>
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black '>
          <AvatarFallback className='bg-black text-white font-extrabold'>VP</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" className='w-56 '>
        <DropdownMenuLabel>Logged in as </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>

  </div>
}


export default function ShoppingHeader() {

  const {isAuthenticated, user} = useSelector(state=>state.auth)

  console.log(user)

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-white'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center gap-2' >
          <House className='h-6 w-6 text-black'/>
          <span className='text-black font-bold'>Fashion Bazar</span>
        </Link>

        {/* For small devices */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden '>
              <Menu className='h-5 w-5 text-white'/>
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side='left' className='w-full max-w-xs text-black pl-4 pt-7'>

            <MenuItems/>
              
          </SheetContent>
        </Sheet>

        {/* For larger devices */}
        <div className='hidden lg:block'>
          <MenuItems/>
        </div>
          {
            isAuthenticated ? <div></div> : null
          }

          <HeaderRightContent/>
      </div>
    </header>
  )
}
