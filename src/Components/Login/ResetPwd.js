import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordValidator } from "../../Shared/Regex";
import loginBg from "../../assets/images/login-bg.png";
import eyeIcon from "../../assets/images/eye-icon.png";
import axios from "axios";

const ResetPwd = () => {
  const [togglepwd, setTogglepwd] = useState(true);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(true);
  const [newpwd, setnewpwd] = useState({ pwd: "", confirmpwd: "" });
  const [pwderrormsg, setpwderrormsg] = useState("");
  const [apidata, setapidata] = useState("");
  const navigate = useNavigate();

  const pwdId = sessionStorage.getItem("authentication");
  useEffect(() => {
    const result = async () => {
      axios
        .get(`http://localhost:8001/userdetails/${pwdId}`)
        .then((res) => setapidata(res.data));
    };
    result();
  }, []);

  const formHandler = (e) => {
    setnewpwd({ ...newpwd, [e.target.name]: e.target.value });
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setpwderrormsg("");

    const passwordValidate = passwordValidator(newpwd.pwd);
    if ((newpwd.pwd === newpwd.confirmpwd) && passwordValidate) {
      axios
        .put(`http://localhost:8001/userdetails/${pwdId}`, {email:apidata.email,password:newpwd.pwd})
      navigate("/login");
      sessionStorage.removeItem("authentication")
    }
    else{
      if(!passwordValidate){
        setpwderrormsg("please enter valid password");
      }
      if(newpwd.pwd == "" && newpwd.confirmpwd == ""){
        setpwderrormsg("please enter password");
      }
      if(newpwd.pwd !== newpwd.confirmpwd){
        setpwderrormsg("Password didn't match");
      }
    }
  }

  // toggle password to text
  const handlePasswordToggle = () => {
    setTogglepwd(!togglepwd);
  };
  const handleConfirmPasswordToggle=()=>{
    setConfirmPasswordToggle(!confirmPasswordToggle);
  }
  return (
    <>
      <section>
        <div className="row login-page justify-content-between">
          <div className="col-5">
            <div className="right-side">
              <div className="img-wrapper">
                <img src={loginBg} alt="login-bg" />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="login-box">
              <div className="logo">
                <div className="logo-wrapper">
                  <h4>
                    NFC BUSINESS <span>CARD</span>
                  </h4>
                </div>
              </div>
              <div className="login-sec container">
              <h5>Forgot Password</h5>
                <form onSubmit={resetHandler}>
                  <div className="form-group">
                    <label>Password</label>
                    <div className="my-2 user-box">
                      <input
                        type={togglepwd ? "password" : "text"}
                        placeholder="New password"
                        name="pwd"
                        className="form-control"
                        onChange={formHandler}
                      ></input>
                      <span className="mx-2" onClick={handlePasswordToggle}>
                        <img src={eyeIcon} alt="eye" />
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <div className="my-2 user-box">
                      <input
                        type={confirmPasswordToggle ? "password" : "text"}
                        placeholder="Confirm password"
                        name="confirmpwd"
                        className="form-control"
                        onChange={formHandler}
                      ></input>
                      <span className="mx-2" onClick={handleConfirmPasswordToggle}>
                        <img src={eyeIcon} alt="eye" />
                      </span>
                    </div>
                  </div>
                  {pwderrormsg.length > 0 && (
                    <div className="error-text">{pwderrormsg}</div>
                  )}
                  <div className="my-4 text-center login-btn ">
                    <button type="submit" className="btn">
                     Submit
                    </button>
                  </div>
                  <div
                    className="forgot-txt d-flex flex-end"
                    onClick={() => {
                      navigate("/forgot");
                    }}
                  >
                    Forgot password?
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPwd;
