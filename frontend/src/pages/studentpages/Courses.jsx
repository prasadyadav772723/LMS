import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Card from '../../components/Card'

function Courses() {

    const [courses,setCourses]=useState([])


    async function get_courses() {
       const response=await axios.get(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/courses/get-all-courses`)
        setCourses(response?.data?.data)
        
        
    }
    useEffect(()=>{
        get_courses()
    },[])

if(courses.length==0){
    return <h1 className='mt-[60px] text-[white]'>No Courses Availble right now !</h1>
}
else{
    return (
    <div >
       {/* <h1 className='mt-[60px] mx-[600px] text-[white]'>Avilable Courses</h1> */}
        <div className='flex justify-evenly mt-[60px]'>
        
        {
            courses.map((x,index)=>{
                return <Card key={index} data={x}/>
            })
        }
    </div>
    </div>
    
    
    
  )
}

  
}

export default Courses