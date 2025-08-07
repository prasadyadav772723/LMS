import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Profile() {
const [error, setError] = useState("");
const [color, setColor] = useState("red");
const [userData,setUserData]=useState({
    name:"",
    ph_no:"",
    university_name:""
})
const navigate=useNavigate()

  const id = cookies.get("id");
  const token = cookies.get("token");

  if (token && id) {

    async function get_user() {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/get-user/${id}`,
        { withCredentials: true }
      );
      setUserData({...userData,name:response?.data?.data?.name,ph_no:response?.data?.data?.ph_no,university_name:response?.data?.data?.university_name})
    }
   useEffect(()=>{get_user()},[])
  }

  async function handleUpdate() {

    if(token&&id){
        const response=await axios.put(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/update-user/${id}`,userData,{withCredentials:true})
        if(response){
            setColor("green")
            setError(response?.data?.message)
            navigate("/student-dashboard")
        }
        else{
            setColor("red")
            setError("error occured")
        }
    }
    
    
  }

  return (
    <div >
      
      <div className=" mx-auto mt-[100px] border-2 border-[cyan]  p-6 rounded-[10px] h-[350px] w-[350px]  ">
        <h1 className="text-[30px] ">Update user !</h1>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend text-[white] ">Name</legend>
          <input
            type="text"
            className="input h-[30px] h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={userData.name}
            onChange={(x) => {
              setUserData({ ...userData,name: x.target.value });
            }}
            
          />
        </fieldset>

         <fieldset className="fieldset ">
          <legend className="fieldset-legend text-[white]">Phone NUmber</legend>
          <input
            type="number"
            className="input h-[30px] h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={userData.ph_no}
            onChange={(x) => {
              setUserData({ ...userData,ph_no: x.target.value });
            }}
            
          />
        </fieldset>

         <fieldset className="fieldset ">
          <legend className="fieldset-legend text-[white]"> University Name</legend>
          <input
            type="text"
            className="input h-[30px] h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={userData.university_name}
            onChange={(x) => {
              setUserData({ ...userData,university_name: x.target.value });
            }}
            
          />
        </fieldset>
        
        
        <p className={`text-center text-[${color}]`}>{error}</p>
        <button
          className={"btn btn-primary curser-pointer w-[100%] h-[30px] mt-5 mb-2"}
          onClick={handleUpdate}
        >
         
          UpdateDetails
        </button>
        
      </div>
    </div>
  );
}

export default Profile;
