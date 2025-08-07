import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import AlertComponents from '../../components/AlertComponents'


function AllUsers() {

  const [users,setUsers]=useState([])
  const [show,setShow]=useState('hidden')
  const [error,setError]=useState()

  async function all_users() {
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/all-users`,{withCredentials:true})
    setUsers(response?.data?.data)

  }

  useEffect(()=>{
    all_users()
  },[])

  async function handleDelete(id) {
    try{const response=await axios.delete(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/delete-user/${id}`)
    if (response){
      setShow('block')
      setError(response?.data?.message)
      all_users()
      // setTimeout(()=>{
      //   window.location.reload()
      // },3000);
      
    }
    else{
      return "Error while deleting the user"
    }}
    catch{
      console.log ("Something went wrong while api calling")
    }
  }

  if(show=="block"){
    setTimeout(()=>{
      setShow("hidden")
    },3000);
  }
 
  if(users.length==0){
    return <h1 className='text-center mt-5'>No users found</h1>
  }
  else{
     return (
    <div>
      <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead className='text-[red]'>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>ph_no</th>
        <th>role</th>
        <th>UniversityName</th>
        <th>Created At</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {
          users.map((x,index)=>{
            return <tr>
        <th className='text-[red]'>{index+1}</th>
        <td>{x.name}</td>
        <td>{x.email}</td>
        <td>{x.ph_no}</td>
        <td>{x.role}</td>
        <td>{x.university_name}</td>
        <td>{x.created_at}</td>
        <td className=' bg-[lime] text-[black] m-2  text-center  cursor-pointer'> <Link to={`/dashboard/update-user/${x.id}`}> UPDATE</Link> </td>
        <td className='bg-[red] text-[white] m-2 text-center cursor-pointer'  onClick={()=>document.getElementById('my_modal_3').showModal()}>DELETE</td>

        
        <dialog id="my_modal_3" className="modal">
  <div className="modal-box bg-gray-600 ">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[white]">✕</button>
    </form>
    <h3 className="font-bold text-lg ">Are you sure want to Delete?</h3>
   <form method="dialog">
     <button className="btn bg-[red] text-[white] border-none mt-3" onClick={()=>{handleDelete(x.id)}} >DELETE</button>
   </form>
  </div>
</dialog>
      </tr>
          })
        }
      
    </tbody>
    <tfoot className='text-[red]'>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>ph_no</th>
        <th>role</th>
        <th>UniversityName</th>
        <th>Created At</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </tfoot>
  </table>
</div>

<span className={`${show}`}>
  <AlertComponents data={`${error}`}/>

</span>

    </div>
  )
  }

 
}

export default AllUsers