import { use, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import AuthLogin from './Pages/auth/Login'
import AuthRegister from './Pages/auth/Register'
import AdminLayout from './components/admin-view/Layout'
import AdminDashboard from './Pages/admin-view/Dashboard'
import AdminProducts from './Pages/admin-view/Products'
import AdminOrderes from './Pages/admin-view/Orders'
import AdminFeatures from './Pages/admin-view/Features'
import ShoppingLayout from './components/shopping-view/Layout'
import NotFound from './Pages/not-found'
import ShoppinHome from './Pages/shopping-view/Home'
import ShoppingListing from './Pages/shopping-view/Listing'
import ShoppingCheckout from './Pages/shopping-view/Checkout'
import ShoppingAccount from './Pages/shopping-view/Acconunt'
import CheckAuth from './components/common/Check_auth'
import UnauthPage from './Pages/unauth_page'

function App() {
  const [count, setCount] = useState(0)

  const isAuthenticated = false
  const user = {
    name: 'Varun',
    role: 'user'
  };

  return (
    <div className='flex flex-col overflow-hidden bg-white min-h-screen'>
      <h1 className="text-3xl font-bold text-center my-4">Header</h1>
      <Routes>



        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout /> {/* children to the Check_auth */}
          </CheckAuth>
            }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>





        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/> {/* children to the Check_auth */}
          </CheckAuth>
            }>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='products' element={<AdminProducts/>}/>
          <Route path='orderes' element={<AdminOrderes/>}/>
          <Route path='features' element={<AdminFeatures/>}/>
        </Route>
          




        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/> {/* children to the Check_auth */}
          </CheckAuth>
            }>
          <Route path='home' element={<ShoppinHome/>}/>
          <Route path='listing' element={<ShoppingListing/>}/>
          <Route path='checkout' element={<ShoppingCheckout/>}/>
          <Route path='account' element={<ShoppingAccount/>}/>
        </Route>



        <Route path="unauth_page" element={<UnauthPage/>} />



        <Route path='*' element={<NotFound/>}/> 
        {/* For not found page */}





      </Routes>
    </div>
  )
}

export default App
