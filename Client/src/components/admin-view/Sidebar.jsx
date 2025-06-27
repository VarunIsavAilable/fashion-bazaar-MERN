import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {LayoutDashboard, ShoppingBasket, ShoppingBag, TrainFront} from 'lucide-react'


function MenuItems({setOpen}){
  const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard className='text-white cursor-pointer ml-3' />
    },
    {
        id: 'products',
        label: 'products',
        path: '/admin/products',
        icon: <ShoppingBasket className='text-white cursor-pointer ml-3' />
    },
    {
        id: 'orderes',
        label: 'orderes',
        path: '/admin/orderes',
        icon: <ShoppingBag className='text-white cursor-pointer ml-3' />
    }

]


  const navigate = useNavigate()


  return (
    <nav className='mt-8 flex-col flex gap-2'>
      {
        adminSidebarMenuItems.map(menuItem=>
        <div key={menuItem.id} onClick={()=>{
          navigate(menuItem.path)
          setOpen ? setOpen(false) : null
        }} className='flex items-centergap-2 rounded-md px-2 py-3 hover:bg-[#444444]'>
          {menuItem.icon}
          <span className='text-white ml-1 cursor-pointer'>{menuItem.label}</span>
        </div>)
      }
    </nav>
  )
}

function AdminSideBar({open, setOpen}) {

  const navigate = useNavigate()

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen} className='bg-[#131316]'>
        <SheetContent side='left' className='w-64 mr-2 bg-[#131316]'>
          <div className='flex flex-col h-full'>
            <SheetHeader className='border-b '>
              <SheetTitle className='flex '>
                <TrainFront className='text-white mt-1' />
                <h6 className='text-xl ml-1 mt-1  font-extrabold text-white'>Admin Panel</h6></SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen}/>

          </div>
        </SheetContent>
      </Sheet>

      <aside className='hidden w-64 flex-col border bg-[#131316] p-6 lg:flex'>
        <div onClick={()=>navigate('/admin/dashboard')} className='flex items-center gap-2 cursor-pointer '>
          <TrainFront className='text-white' />
          <h3 className='text-xl font-extrabold text-white'>Admin Panel</h3>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  )
}

export default AdminSideBar