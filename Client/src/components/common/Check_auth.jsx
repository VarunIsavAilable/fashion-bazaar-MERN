import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function CheckAuth({isAuthenticated, user, children}) {

  const location = useLocation()

  if(location.pathname === '/'){
    if(!isAuthenticated){
      return <Navigate to='/auth/login'/>
    }else{
      if(user?.role === "admin"){
        return <Navigate to='/admin/dashboard'/>
      } else {
        return <Navigate to='/shop/home'/>
      } 
    }
  }


  // If user is not logged in:
  if (
    !isAuthenticated && 
    !(
      location.pathname.includes("/login") || 
      location.pathname.includes("/register")
  )

) {
    
    return <Navigate to='/auth/login'/>

  }


  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register")
  )) {

    if(user?.role === "admin"){
      return <Navigate to='/admin/dashboard'/>
    } else {
      return <Navigate to='/shop/home'/>
    } 

  }

  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")){
    return <Navigate to='/unauth_page'/>
  }

  if(isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")){
    return <Navigate to='/admin/dashboard'/>
  }

  return (
    <>
      {children}
    </>
  )
}
