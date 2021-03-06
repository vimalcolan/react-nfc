import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { emailValidator,passwordValidator } from '../../Shared/Regex';
import eyeIcon from '../../assets/images/eye-icon.png';
import loginBg from '../../assets/images/login-bg.png';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
const[togglevisible,setTogglevisible]=useState(true);
const[loginvalues,setLoginvalues]=useState({username:"",password:""});
const[emailerrormsg,setEmailerrormsg]=useState("");
const[pwderrormsg,setPwderrormsg]=useState("");
const[exacterrormsg,setExacterrormsg]=useState("");
const[successmsg,setSuccessmsg]=useState("");
const[loginapi,setLoginapi]=useState();
const navigate=useNavigate();
useEffect(()=>{
  const user=async ()=>{
  await axios.get("http://localhost:8001/userdetails").then(res=>setLoginapi(res.data));
  }
  user();
},[]);


// Form handling
const formHandler = (e)=>{
  setLoginvalues({...loginvalues,[e.target.name]:e.target.value});
}

const loginHandler=(e)=>{
  e.preventDefault();
  console.log(loginvalues);
  setEmailerrormsg("");
  setPwderrormsg("");
  setExacterrormsg("");
  setSuccessmsg("");

      //  validation
      const validateEmail=emailValidator(loginvalues.username);  
      const validatePwd=passwordValidator(loginvalues.password);  
      console.log(validateEmail,validatePwd);

      //  Error message
      if(!validateEmail) return setEmailerrormsg("please enter valid email");
      if(!validatePwd) return setPwderrormsg("please enter password in the combination of small letters,capital letters,numeric digits,special chracters");

    
      // Matching exact db value and current value
      for(let i=0;i<loginapi.length;i++){
        if((loginapi[i].username==loginvalues.username)&&(loginapi[i].password==loginvalues.password)){
         navigate("/")
        }
        else{
          setExacterrormsg("please enter correct mail and password");
        }
      }
} 


// toggle password to text
const handlePasswordVisible=()=>{
  setTogglevisible(!togglevisible)
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
            <img/>
            <h4>NFC BUSINESS <span>CARD</span></h4>
          </div>
        </div>
  <div className='login-sec container'>
    <h5>Login</h5>
       <form onSubmit={loginHandler}>
          {exacterrormsg.length >0 &&  <div style={{color:"#fff",fontSize:"16px",marginBottom:"10px"}}>{exacterrormsg}</div>}
          <div className='form-group'>
            <label>Username</label>
            <div className='my-2 user-box'>
               <input type="text" placeholder="email" name='username' className='form-control' onChange={formHandler} ></input>
           </div>
           {emailerrormsg.length >0 && <div style={{color:"#fff",fontSize:"16px",marginBottom:"10px"}}>{emailerrormsg}</div>}
          </div> 
          
          <div className='form-group'>
            <label>Password</label>
            <div className='my-2 user-box'>
              <input type={togglevisible?"password":"text"} placeholder="password" name='password' className='form-control' onChange={formHandler} ></input>
              <span className='mx-2' onClick={handlePasswordVisible}><img src={eyeIcon} alt="eye"/></span>
           </div>
           {pwderrormsg.length >0 &&  <div style={{color:"#fff",fontSize:"16px",marginBottom:"10px"}}>{pwderrormsg}</div>}
          </div>
          
           <div className='my-4 text-center login-btn '>
             <button  type='submit' className='btn'>Login</button>
           </div>
           {<div style={{color:"green",fontSize:"16px",marginBottom:"10px"}}>{successmsg}</div>}
       </form>
     
   
   </div>

  </div>
      </div>
    </div>
    </section>
   



        
    </>
  )
}

export default Login