import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { emailValidator } from '../../Shared/Regex';
import {useNavigate } from 'react-router-dom';
import loginBg from '../../assets/images/login-bg.png'

const ForgotPwd = () => {
const [user, setUser] = useState("");
const [apiusername, setApiusername] = useState('');
const [emailError,setEmailError]=useState("");
const navigate=useNavigate();

const formHandler=(e)=>{
  setUser(e.target.value);
}
useEffect(()=>{
  const result=async()=>{
    await axios.get("http://localhost:8001/userdetails").then(res=>setApiusername(res.data));
  }
  result();
},[]);

const forgotmailHandler=(e)=>{
  e.preventDefault();
  // validation
  const emailValidate=emailValidator(user);
// matching db value with entered value
const userId=apiusername.filter((e)=>{
  return(e.email===user);
}).map((user)=>{return user.id});

if(userId.length && emailValidate){
  navigate("/reset");
  sessionStorage.setItem("authentication",userId)
}
else{
  if(user==""){
    setEmailError("Please Enter Email")
  }
  if(user && !emailValidate){
    setEmailError("please enter valid email")
  }
  if(user && emailValidate && userId.length==0){
    setEmailError("Mail id not exists")
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
    <h5>Forgot Password</h5>
       <form onSubmit={forgotmailHandler}>
         
          <div className='form-group'>
            <label>Username</label>
            <div className='my-2 user-box'>
               <input type="text" placeholder="email" name='username' className='form-control' value={user} onChange={formHandler} ></input>
           </div>
           
          </div> 
          {emailError}
           <div className='my-4 text-center login-btn '>
             <button  type='submit' className='btn'>submit</button>
           </div>
          <div className='back-to-login'>
            <span onClick={()=>{navigate("/login")}}>Back to login</span>
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