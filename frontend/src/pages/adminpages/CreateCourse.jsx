import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import createCourseValidation from '../../validate/createCourseValidation';
import { useNavigate } from 'react-router-dom';

function CreateCourse() {

    const [error, setError] = useState("");
    const [color, setColor] = useState("red");
    const navigate=useNavigate()
    const [courseData, setCourseData] = useState({
              course_name: "",
              img: "",
              duration: "",
              price: "",
              mode:"",
              road_map_id:""
            });

    async function handleCreateCourse() {
        const result=createCourseValidation(courseData.course_name,courseData.img,courseData.duration,courseData.price,courseData.mode,courseData.road_map_id)
        if(result){
            setColor('red')
            setError(result)
        }
        else{
            try{const response=await axios.post(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/courses/create-course`,courseData)
            if(response){
                setColor("green")
                setError(response?.data?.message)
                navigate('/dashboard/all-courses')

            }
            else{
                setColor("red")
                setError("Error while fetching create user api !!")
            }}
            catch{
                setColor("red")
                setError("Error while fetching create-course api in frontend")
            }
        }
        
        
    }



  return (
    <div>
        <div className=" w-[40%] border-2 border-[cyan]  p-6 rounded-[10px] mx-auto mt-[20px] ">
        <h1 className="text-[30px]">Create Course !</h1>
        <fieldset className="fieldset ">
        <legend className="fieldset-legend text-[white]">Course name?</legend>
        <input type="text"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={courseData.course_name}
            onChange={(x) => {
              setCourseData({ ...courseData,course_name: x.target.value });
            }}
            
            
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">Course Image?</legend>
        <input type="text"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={courseData.img}
            onChange={(x) => {
              setCourseData({ ...courseData,img: x.target.value });
            }}
            
            
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">Duration?</legend>
        <input type="number"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={courseData.duration}
            onChange={(x) => {
              setCourseData({ ...courseData,duration: x.target.value });
            }}
            
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">Price?</legend>
        <input type="number"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={courseData.price}
            onChange={(x) => {
              setCourseData({ ...courseData,price: x.target.value });
            }}
            
            
          /> 
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">Mode?</legend>
        <select
        id="mode"
        value={courseData.mode}
        onChange={(x) => {
              setCourseData({ ...courseData,mode: x.target.value });
            }}
        
        className="input w-[100%] text-[black] outline-none"
      >
        <option value="online">Online</option>
        <option value="offline">Offline</option>
        <option value="both">Both</option>
      </select>
        
      </fieldset>
     


      
      
      <p className={`text-center text-[${color}]`}>{error}</p>
      <button className={'btn btn-primary curser-pointer w-[100%] mt-5 mb-2'} onClick={handleCreateCourse}
      > UpdateDetails </button>
     
      </div>
    </div>
  )
}

export default CreateCourse