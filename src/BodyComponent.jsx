import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function BodyComponent() {
  return (
   <>
   <NavBar/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default BodyComponent