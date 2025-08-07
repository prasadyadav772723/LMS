import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userUpdateValidation from '../../validate/userUpdateValidation';
function UpdateUser() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [error, setError] = useState("");
    const [color, setColor] = useState("red");
    const [updatedData, setUpdatedData] = useState({
          name: "",
          email: "",
          ph_no: "",
          university_name: ""
        });

        async function get_user() {
           try{ const response= await axios.get(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/get-user/${id}`,updatedData)
           if(response){
              setUpdatedData({
                ...updatedData,name:response?.data?.name,
                email:response?.data?.email,
                ph_no:response?.data?.ph_no,
                university_name:response?.data?.university_name
              })
           }
           else{
            setColor("red")
            setError("Error while fetching user api data")
           }
            
            }
            catch{
              setColor("red")
              setError("eroor fom frontend while fetching user data !")

            }
        }
        useEffect(()=>{
            get_user()
        },[])



    async function handleUpdate() {
    const response=userUpdateValidation(updatedData.name,updatedData.email,updatedData.ph_no,updatedData.university_name)
    if(response){
      setColor("red")
      setError(response)
    }
    else{
     try{ const response=await axios.put(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/update-user/${id}`,updatedData)
      if(response){
        setColor("green")
        setError(response?.message)
        navigate("/dashboard/all-users")

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
        <h1 className="text-[30px]">Update User Details !</h1>
        <fieldset className="fieldset ">
        <legend className="fieldset-legend text-[white]">What is your name?</legend>
        <input type="text"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={updatedData.name}
            onChange={(x) => {
              setUpdatedData({ ...updatedData, name: x.target.value });
            }}
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">What is your Email?</legend>
        <input type="email"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={updatedData.email}
            onChange={(x) => {
              setUpdatedData({ ...updatedData, email: x.target.value });
            }}
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">What is your mobile number?</legend>
        <input type="number"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={updatedData.ph_no}
            onChange={(x) => {
              setUpdatedData({ ...updatedData, ph_no: x.target.value });
            }}
          /> 
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-[white]">What is your University Name?</legend>
        <input type="text"
            className="input w-[100%] text-[black]"
            placeholder="Type here"
            value={updatedData.university_name}
            onChange={(x) => {
              setUpdatedData({ ...updatedData, university_name: x.target.value });
            }}
          /> 
      </fieldset>
      
      <p className={`text-center text-[${color}]`}>{error}</p>
      <button className={'btn btn-primary curser-pointer w-[100%] mt-5 mb-2'} onClick={handleUpdate}
      > UpdateDetails </button>
     
      </div>
    </div>
  )
}

export default UpdateUser