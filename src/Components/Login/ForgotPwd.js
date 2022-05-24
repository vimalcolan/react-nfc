import axios from 'axios';
import React,{useEffect, useState} from 'react'
import {useNavigate } from 'react-router-dom';
import loginBg from '../../assets/images/login-bg.png'

const ForgotPwd = () => {

const [user, setUser] = useState("");
const [apiusername, setApiusername] = useState('')
const navigate=useNavigate();
const formHandler=(e)=>{
  setUser(e.target.value);
}
useEffect(()=>{
  const result=async()=>{
    await axios.get("http://localhost:8001/userdetails").then(res=>setApiusername(res.data));
  }
  result();
},[])
const forgotmailHandler=(e)=>{
  e.preventDefault();
  for(let i=0;i<apiusername.length;i++){
    if(apiusername[i].username===user){
      console.log("yes");
navigate('/reset');
sessionStorage.setItem("authentication",apiusername[i].id)
    }
  }

}
  return (
    <>
               <section>
    <div className='row login-page justify-content-between'>
      <div className='col-5'>
        <div className='right-side'>
        <div className='img-wrapper'>
          <img src={loginBg} alt="login-bg"/>
        </div>
        </div>
      </div>
      <div className='col-6'>
      <div className='login-box' >
        <div className='logo'>
          <div className='logo-wrapper'>
           
            <h4>NFC BUSINESS <span>CARD</span></h4>
          </div>
        </div>
  <div className='login-sec container'>
    <h5>Login</h5>
       <form onSubmit={forgotmailHandler}>
         
          <div className='form-group'>
            <label>Username</label>
            <div className='my-2 user-box'>
               <input type="text" placeholder="email" name='username' className='form-control' value={user} onChange={formHandler} ></input>
           </div>
           
          </div> 
           <div className='my-4 text-center login-btn '>
             <button  type='submit' className='btn'>submit</button>
           </div>
        
       </form>
     
   
   </div>

  </div>
      </div>
    </div>
    </section>
    </>
  )
}

export default ForgotPwd