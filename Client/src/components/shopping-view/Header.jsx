import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { House, Menu, ShoppingCart, User, LogOut }from 'lucide-react'
import { SheetTrigger, Sheet, SheetContent } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '../ui/dropdown-menu'
import { logoutUser } from '@/store/auth-slice'

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
  const {isAuthenticated, user} = useSelector(state=>state.auth)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logoutUser())
  }

  return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
    <Button variant='outline' size='icon' className='text-white'>
      <ShoppingCart className='w-5 h-5 text-white'/>
      <span className='sr-only'>User Cart</span>
    </Button>
    
    <DropdownMenu className='cursor-pointer'>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black cursor-pointer'>
          <AvatarFallback className='bg-black text-white font-extrabold'>{user?.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" className='w-56'>
        <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
       
        <DropdownMenuSeparator/>

        <DropdownMenuItem className='cursor-pointer' onClick={()=>navigate('shop/account')}> 
          <User  className='mr-2 h-4 w-4'/>
          Account
        </DropdownMenuItem>

        <DropdownMenuSeparator/>

        <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4'/>
          Logout
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>

  </div>
}


export default function ShoppingHeader() {

  const {isAuthenticated, user} = useSelector(state=>state.auth)

  console.log(user)

  return (
    <header className='sticky top-0 z-40 w-screen border-b bg-white'>
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
            <HeaderRightContent />
              
          </SheetContent>
        </Sheet>

        {/* For larger devices */}
        <div className='hidden lg:block'>
          <MenuItems/>
        </div>

        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div>
          
      </div>
    </header>
  )
}
