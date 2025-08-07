import React, { useState } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import AppLayOut from './components/AppLayOut'
import Signup from './pages/authpages/Signup'
import SignIn from './pages/authpages/Signin'
import AllUsers from './pages/adminpages/AllUsers'
import AllCourses from './pages/adminpages/AllCourses'
import UpdateUser from './pages/adminpages/UpdateUser'
import CreateCourse from './pages/adminpages/CreateCourse'
import UpdateCourse from './pages/adminpages/UpdateCourse'
import cookies from 'js-cookie'
import AdminDashBoard from './pages/adminpages/AdminDashBoard'
import RecordingsPage from './pages/studentpages/RecordingsPage'
import StudentDashBoard from './pages/studentpages/StudentDashboard'
import axios from 'axios'
import { useEffect } from 'react'

import Profile from './pages/studentpages/Profile'
import Courses from './pages/studentpages/courses'
import Card from './components/Card'
import Invoice from './pages/studentpages/Invoice'



function AdminRoute({children}){
    const id=cookies.get("id")
    const token=cookies.get("token")
    const [userId,setUserId]=useState(null)

    async function get_user() {
    const response= await axios.get(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/get-user/${id}`,{withCredentials:true})
    setUserId(response?.data?.data?.role)
  }
  useEffect(()=>{
      get_user()
    },[])
   
    if(token){
      if(userId==1){
        return children
      }
      // else{
      //   return <Navigate to="/"/>
      // }
    }
    else{
      return <Navigate to="/signin"/>
    }
  }

  function StudentRoute({children}){
  
    const id=cookies.get("id")
    const token=cookies.get("token")
    const [userId,setUserId]=useState(null)

    async function get_user() {
    const response= await axios.get(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/get-user/${id}`,{withCredentials:true})
    setUserId(response?.data?.data?.role)
  }
  useEffect(()=>{
      get_user()
    },[])
    
       if(token){
      if(userId==0){
        return children
      }
      // else{
      //   return <Navigate to="/"/>
      // }
    }
    else{
      return <Navigate to="/signin"/>
    }
  }
  

function App() {
  //  const token=Cookies.get("token");
  //  const id=Cookies.get("id");

  

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<AppLayOut />}> 
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='*' element={<h1>Page not found - 404</h1>} />
        <Route path='courses' element={<Courses />} />


        <Route path='admin-dashboard' element={ <AdminRoute><AdminDashBoard /></AdminRoute>}>
          <Route path='all-users' element={<AllUsers />} />
          <Route path='update-user/:id' element={<UpdateUser />} />
          <Route path='create-course' element={<CreateCourse />} />
          <Route path='update-course/:id' element={<UpdateCourse />} />
          <Route path='all-courses' element={<AllCourses />} />
        </Route>

        <Route path='student-dashboard' element={<StudentRoute><StudentDashBoard/></StudentRoute>}>
          <Route path='profile' element={<Profile />} />
          <Route path='recordings-page' element={<RecordingsPage />} />
          {/* <Route path='card' element={<Card/>} /> */}
          <Route path='invoice' element={<Invoice/>} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
}

export default App