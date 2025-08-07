import React,{useEffect} from 'react'
// import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import courseUpdateValidation from '../../validate/courseUpdateValidation';

function UpdateCourse() {
    const {id}=useParams()
    const navigate=useNavigate()
        const [error, setError] = useState("");
        const [color, setColor] = useState("red");
        const [updatedData, setUpdatedData] = useState({
              course_name: "",
              img: "",
              duration: "",
              price: "",
              mode:""
            });

    async function get_courses() {
           try{ const response= await axios.get(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/courses/get-course/${id}`,updatedData)
           if(response){
              setUpdatedData({
                ...updatedData,course_name:response?.data?.course_name,
                img:response?.data?.img,
                duration:response?.data?.duration,
                price:response?.data?.price,
                mode:response?.data?.mode
              })
           }
           else{
            setColor("red")
            setError("Error while fetching user api data")
           }
            
            }
            catch{
              setColor("red")
              setError("error fom frontend while fetching user data !")

            }
        }
        useEffect(()=>{
            get_courses()
        },[])

     async function handleUpdate() {
    const response=courseUpdateValidation(updatedData.course_name,updatedData.img,updatedData.duration,updatedData.price,updatedData.mode)
    if(response){
      setColor("red")
      setError(response)
    }
    else{
     try{ const response=await axios.put(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/courses/update-course/${id}`,updatedData)
      if(response){
        setColor("green")
        setError(response?.message)
        navigate("/dashboard/all-courses")

      }
      else{
        setColor("red")
        setError("error while updating user")
      }}
      catch{
        setColor("red")
        setError("Error while updating user api !")
      }
      
    }

    
    
  }




  return (
    <div>
        <div className=" w-[40%] border-2 border-[cyan]  p-6 rounded-[10px] mx-auto mt-[20px] ">
        <h1 className="text-[30px]">Update Course Details !</h1>
        <fieldset className="fieldset ">
        <legend className="fieldset-legend text-[white]">Course Name</legend>
        <input type="text"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={updatedData.course_name}
            onChange={(x) => {
              setUpdatedData({ ...updatedData,course_name: x.target.value });
            }}
            
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">Course Image</legend>
        <input type="text"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={updatedData.img}
            onChange={(x) => {
              setUpdatedData({ ...updatedData,img: x.target.value });
            }}
            
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]"> Duration</legend>
        <input type="number"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={updatedData.duration}
            onChange={(x) => {
              setUpdatedData({ ...updatedData,duration: x.target.value });
            }}
           
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">Price</legend>
        <input type="number"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={updatedData.price}
            onChange={(x) => {
              setUpdatedData({ ...updatedData,price: x.target.value });
            }}
            
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">Mode</legend>
        <select
        id="mode"
        value={updatedData.mode}
        onChange={(x) => {
              setUpdatedData({ ...updatedData,mode: x.target.value });
            }}
        className="input w-[100%] text-[black] outline-none"
      >
        <option value="online">Online</option>
        <option value="offline">Offline</option>
        <option value="both">Both</option>
      </select>
        
      </fieldset>
      
      <p className={`text-center text-[${color}]`}>{error}</p>
      <button className={'btn btn-primary curser-pointer w-[100%] mt-5 mb-2'} onClick={handleUpdate}
      > UpdateCourseDetails </button>
     
      </div>
    </div>
  )
}

export default UpdateCourse