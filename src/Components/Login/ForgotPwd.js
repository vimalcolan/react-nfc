import React from 'react'
import { useNavigate } from 'react-router-dom'


const ForgotPwd = () => {
    const navigate=useNavigate();
    const handleNavigate=()=>{
        navigate({pathname:"/"})
    }
  return (
    <div>
        <button className='btn btn-warning' onClick={handleNavigate}>summma</button>
    </div>
  )
}

export default ForgotPwd