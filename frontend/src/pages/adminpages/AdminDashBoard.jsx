import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function AdminDashBoard() {

  const routes=[
    {
      path:"/admin-dashboard/all-users",
      name:"All Users"
    },
     {
      path:"/admin-dashboard/create-course",
      name:"Create Course"
    },
    {
      path:"/admin-dashboard/all-courses",
      name:"All Courses"
    }
  ]

  return (
    <div className='flex mt-[64px]'>
      <div className="bg-gray-800 h-[100vh] w-[20%] p-4  ">
      {
        routes.map((x,index)=>{
          return <Link key={index} to={x.path}><button className='w-[100%] bg-[black] text-[white] my-2 p-2 text-start cursor-pointer'>{x.name}</button></Link>
        })
      }
      </div>

      <div className="bg-[black] text-[white] h-[100vh] w-[80%] ">
      <Outlet/>
      </div>

    </div>
  )
}

export default AdminDashBoard