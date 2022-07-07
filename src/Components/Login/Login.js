import React, { useEffect, useState } from "react";
import axios from "axios";
import { emailValidator, passwordValidator } from "../../Shared/Regex";
import eyeIcon from "../../assets/images/eye-icon.png";
import loginBg from "../../assets/images/login-bg.png";
import loginLogo from "../../assets/images/login-logo.png";
import emailIcon from "../../assets/images/emailIcon.png";
import passwordIcon from "../../assets/images/passwordIcon.png"
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [togglepwd, setTogglepwd] = useState(true);
  const [loginvalues, setLoginvalues] = useState({ email: "", password: "" });
  const [emailerrormsg, setEmailerrormsg] = useState("");
  const [pwderrormsg, setPwderrormsg] = useState("");
  const [exacterrormsg, setExacterrormsg] = useState("");
  const [loginapi, setLoginapi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = async () => {
      await axios
        .get("http://localhost:8001/userdetails")
        .then((res) => setLoginapi(res.data));
    };
    user();
  }, []);

  // Form handling
  const formHandler = (e) => {
    setLoginvalues({ ...loginvalues, [e.target.name]: e.target.value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setEmailerrormsg("");
    setPwderrormsg("");
    setExacterrormsg("");

    //  validation
    const validateEmail = emailValidator(loginvalues.email);
    const validatePwd = passwordValidator(loginvalues.password);

    // Matching exact db value and current value
    const username = loginapi.filter((e) => {
      return (
        e.email === loginvalues.email && e.password === loginvalues.password
      );
    }).map((e)=> {return (e.username)})
    

    if (username.length > 0 && validateEmail && validatePwd) {
      sessionStorage.setItem("auth", username);
      navigate("/");
      // window.location.reload(false);
    } else {
      if (validateEmail && validatePwd && username.length == 0) {
        setExacterrormsg("please enter correct mail and password");
      }
      if (!validateEmail) {
        setEmailerrormsg("please enter valid email");
      }
      if (!validatePwd) {
        setPwderrormsg(
          "please enter password in the combination of small,caps,numeric & special chracters"
        );
      }
    }
  };

  // toggle password to text
  const handlePasswordToggle = () => {
    setTogglepwd(!togglepwd);
  };

  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <section className="login-section">
        <div className="row login-page justify-content-between">
          <div className="col-xl-6 col-lg-7 col-md-5">
            <div className="right-side">
              <div className="img-wrapper">
                <img src={loginBg} alt="login-bg" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-5 col-md-6 col-12 p-0">
           <div className="login-wrapper">
           <div className="login-box">
           <div className="logo">
                  <div className="logo-wrapper d-flex align-items-center justify-content-center">
                    <img src={loginLogo} alt="login-logo"/>
                   
                    <h4 className="ms-1 text-white">
                      NFC BUSINESS <span className="text-dark">CARD</span>
                    </h4>
                  </div>
                </div>
              <div className="login-container">
                
                <div className="login-sec">
                  <h5 className="text-white login-text">Login</h5>
                  <form onSubmit={loginHandler} className="mt-3">
                    {exacterrormsg.length > 0 && (
                      <div style={{color: "#fff", fontSize: "16px", marginBottom: "10px" }} >{exacterrormsg} </div>
                    )}
                    <div className="form-group">
                      <label>Email Id</label>
                      <div className="my-2 user-box">
                     <img src={emailIcon} alt="email-icon" />
                        <input
                          type="text"
                          placeholder="Enter email"
                          name="email"
                         autoComplete="off"
                          onChange={formHandler}
                        ></input>
                      </div>
                      {emailerrormsg.length > 0 && (
                        <div
                          style={{
                            color: "#fff",
                            fontSize: "16px",
                            marginBottom: "10px",
                          }}
                        >
                          {emailerrormsg}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <div className="my-2 user-box">
                        <img src={passwordIcon}/>
                        <input
                          type={togglepwd ? "password" : "text"}
                          placeholder="Enter password"
                          name="password"
                        autoComplete="off"
                          onChange={formHandler}
                        ></input>
                        <span className="mx-2" onClick={handlePasswordToggle}>
                          <img src={eyeIcon} alt="eye" />
                        </span>
                      </div>
                      {pwderrormsg.length > 0 && (
                        <div
                          style={{
                            color: "#fff",
                            fontSize: "16px",
                            marginBottom: "10px",
                          }}
                        >
                          {pwderrormsg}
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="remember-me d-flex align-items-center justify-content-center check">
                        <input type="checkbox" autoComplete="off" id="remember"/>
                        <label htmlFor="remember" >Remember me</label>
                      </div>
                      <div
                        className="forgot-txt d-flex flex-end"
                        onClick={() => {
                          navigate("/forgot");
                        }}
                      >
                        Forgot password?
                      </div>
                    </div>
                    <div className="my-4 text-center login-btn ">
                      <button type="submit" className="btn">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

           </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
