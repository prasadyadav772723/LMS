import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

function AlertComponents(props) {
    const [showDisplay,setShowDisplay]=useState('block')
    // const navigate=useNavigate()
    function handleAlertRemove(){
        setShowDisplay('hidden')
        window.location.reload()
    }
  return (
    <div className={`flex item-center justify-between bg-[green] text-[white] fixed bottom-0 right-0 me-[10px] py-3 px-[20px] ${showDisplay} `}>
        <h1>{props.data}</h1>
        <button className='ms-[20px] text-end cursor-pointer' onClick={()=>{
            handleAlertRemove()
        }}> X </button>

    </div>
  )
}

export default AlertComponents