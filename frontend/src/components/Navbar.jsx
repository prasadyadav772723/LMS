import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Navbar() {
const [userId,setUserId]=useState(null)
  const token=Cookies.get("token");
  const id=Cookies.get("id");
 
  // console.log(token);
  const navigate=useNavigate()

  async function handleSignOut(){
    const response=await axios.post(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/sign-out`,{},{withCredentials:true})
    if(response){
      navigate("/")
    }
  
  }


  async function get_user() {
    const response= await axios.get(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/get-user/${id}`,{withCredentials:true})
    setUserId(response?.data?.data?.role)
  }
  useEffect(()=>{
    get_user()
  },[])

  return (
    <div>
     <div className="navbar bg-base-100 shadow-sm bg-gray-400 fixed top-0 z-[10]">
   <div className="navbar-start">
     <div className="dropdown">
       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
       <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <Link to="/courses">Courses</Link>
        {/* <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li> */}
       </ul>
    </div>
    <Link className="btn btn-ghost text-xl" to="/">LMS</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <Link to="/courses">Courses</Link>
      {/* <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li> */}
    </ul>
  </div>
  

    {((token)?
    (<div className="dropdown dropdown-end navbar-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://cdn.pixabay.com/photo/2016/11/23/18/15/man-1854175_1280.jpg" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-[130px] w-52 p-2 shadow">
        <li>
          <Link to={userId==1?"/admin-dashboard" : "/student-dashboard"}  className="justify-between">
            Dashboard
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li onClick={handleSignOut}><a>SignOut</a></li>
      </ul>
    </div>):
    
    (<div className="navbar-end">
    <Link to={'signup'}><button className="btn mr-3 btn-primary">SignUp</button></Link> 
    <Link to={'signin'}><button className="btn btn-success">SignIn</button></Link>
  </div>))}

  

</div>
    </div>
  )
}

export default Navbar