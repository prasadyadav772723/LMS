import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function AppLayOut() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default AppLayOut