import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordValidator } from "../../Shared/Regex";
import loginBg from "../../assets/images/login-bg.png";
import eyeIcon from "../../assets/images/eye-icon.png";
import axios from "axios";

const ResetPwd = () => {
  const [togglepwd, setTogglepwd] = useState(true);
  const [newpwd, setnewpwd] = useState({ pwd: "", confirmpwd: "" });
  const [errormsg, seterrormsg] = useState("");
  const [validpwd, setvalidpwd] = useState("");
  const [apidata, setapidata] = useState("");
  const navigate = useNavigate();

  const pwdId = sessionStorage.getItem("authentication");
  console.log(pwdId);

  useEffect(() => {
    const result = async () => {
      axios
        .get(`http://localhost:8001/userdetails/${pwdId}`)
        .then((res) => setapidata(res.data));
    };
    result();
  }, []);
  console.log(apidata);

  const formHandler = (e) => {
    setnewpwd({ ...newpwd, [e.target.name]: e.target.value });
  };

  const resetHandler = (e) => {
    e.preventDefault();
    seterrormsg("");
    setvalidpwd("");

    const passwordValidate = passwordValidator(newpwd.pwd);
    if (!passwordValidate) {
      setvalidpwd("please enter valid pwd");
    }
    if (newpwd.pwd === newpwd.confirmpwd) {
      axios
        .put(`http://localhost:8001/userdetails/${pwdId}`, {username:apidata.username,password:newpwd.pwd})
        .then((resp) => console.log(resp));
      navigate("/login");
    }
    // else{
    //   return seterrormsg("ensure both values are same");
    // }
    // if(newpwd.pwd===newpwd.confirmpwd){
    //   navigate("/login")
    //   console.log("yes");
    //  }
  };

  // toggle password to text
  const handlePasswordToggle = () => {
    setTogglepwd(!togglepwd);
  };
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
                <h5>Reset</h5>
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
                        type={togglepwd ? "password" : "text"}
                        placeholder="Confirm password"
                        name="confirmpwd"
                        className="form-control"
                        onChange={formHandler}
                      ></input>
                      <span className="mx-2" onClick={handlePasswordToggle}>
                        <img src={eyeIcon} alt="eye" />
                      </span>
                    </div>
                  </div>
                  {errormsg.length > 0 && (
                    <div className="error-text">{errormsg}</div>
                  )}
                  {validpwd.length > 0 && (
                    <div className="error-text">{validpwd}</div>
                  )}

                  <div className="my-4 text-center login-btn ">
                    <button type="submit" className="btn">
                      Login
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
