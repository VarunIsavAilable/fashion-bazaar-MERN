import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './Sidebar'
import AdminHeader from './Header'



function AdminLayout() {

  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <div className='flex w-screen min-h-screen'>
        {/* admin sidebar */}
        <AdminSideBar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className='flex flex-1 flex-col'>
            {/* admin header */}
            <AdminHeader setOpen={setOpenSidebar}/>
            <main className='flex-1 flex-col flex bg-gradient-to-tr from-[#131316] to-[#21212c] p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout
