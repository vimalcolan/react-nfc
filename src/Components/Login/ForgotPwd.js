import React,{useState} from 'react'

const ForgotPwd = () => {
  
  return (
    <div>
            <div className='form-group'>
            <label>Username</label>
            <div className='my-2 user-box'>
               <input type="text" placeholder="email" name='username' className='form-control' ></input>
           </div>
          </div> 
    </div>
  )
}

export default ForgotPwd