import { useEffect } from 'react'
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
import { checkAuth } from './store/auth-slice'
import CheckAuth from './components/common/Check_auth'
import UnauthPage from './Pages/unauth_page'
import { useDispatch, useSelector } from 'react-redux'

import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from './Pages/shopping-view/Paypal-return'
import PaymentSuccess from './Pages/shopping-view/Payment-success'
import Search from './Pages/shopping-view/Search'

function App() {
  
  const {isAuthenticated, user, isLoading} = useSelector(state=> state.auth) //FROM STORE

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()); // ✅ THUNK USAGE
  }, [dispatch]);

  if(isLoading) return <Skeleton className='h-full w-full ' />

  // Purpose of checkAuth Thunk

  // Sends a GET request to your backend at /api/auth/check-auth

  // Includes cookies (withCredentials: true) — so the JWT token can be read

  // If token is valid, backend responds with the user info



  return (
    <div className='flex flex-col overflow-hidden bg-white min-h-screen'>
      <Routes>
        <Route
         path='/'
         element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
          }
        />


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
          <Route path='paypal-return' element={<PaypalReturnPage/>}/>
          <Route path='payment-success' element={<PaymentSuccess/>}/>
          <Route path='search' element={<Search/>}/>
        </Route>



        <Route path="unauth_page" element={<UnauthPage/>} />



        <Route path='*' element={<NotFound/>}/> 
        {/* For not found page */}





      </Routes>
    </div>
  )
}

export default App
