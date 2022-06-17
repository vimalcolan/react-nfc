import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Common/Common.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailValidator, mobileNumvalidator } from "../Shared/Regex";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { BsInstagram, BsGlobe2 } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";
import { GrLinkedinOption } from "react-icons/gr";
import { GoBriefcase } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi";
import { IconContext } from "react-icons";
import { MdOutlineGroups } from "react-icons/md";
import DashboardLayout from "../Common/DashboardLayout";
import labelClose from "../assets/images/label-close.png";

const AddContact = () => {
  const navigate = useNavigate();
  const title = "Manage Contact";
  const id = 2;
  const [nameError, setNameError] = useState("");
  const [numError, setNumError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Authentication
  useEffect(() => {
    if (sessionStorage.getItem("auth") === null) {
      navigate("/login");
    }
  }, []);

  // create post values
  const [contact, setContact] = useState({
    name: "",
    title: "",
    number: "",
    mailId: "",
    organisation: "",
    website: "",
    facebook: "",
    instagram: "",
    linkedIn: "",
  });
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Add label
  const [newLabel, setNewLabel] = useState([
    { label: "Secondary Phone Number" },
  ]);
  const [labelChange, SetLabelChange] = useState({ label: "" });
  const [newLabelset, setnewLabelSet] = useState([{ label: "", values: "" }]);
  const[submitnewValueSet,setsubmitNewValueSet]=useState([{ label: "", values: "" }])
  // popup label input
  const labelChangeHandler = (e) => {
    SetLabelChange({ ...labelChange, label: e.target.value });
  };
  const handleSubmitLabel = () => {
    setNewLabel([...newLabel, labelChange]);
  };
  // page input(newly added input)
  const handleNewValueChange = (e) => {
    setnewLabelSet([ ...newLabelset,{ label: e.target.name, values: e.target.value }]);
  };

  // remove label
  const removeLabel = (removeId) => {
    const sampleLabels = [...newLabel];
    sampleLabels.splice(removeId, 1);
    setNewLabel(sampleLabels);
  };

  // post values
  const addContact = (e) => {
    e.preventDefault();
    setNameError("");
    setNumError("");
    setEmailError("");

    const numberValidate = mobileNumvalidator(contact.number);
    const emailValidate = emailValidator(contact.mailId);

    console.log("existing", contact);
    console.log("new value set", newLabelset);

console.log("submit new values",submitnewValueSet);
    if (contact.name !== "" && numberValidate && emailValidate) {
      const postData = async () => {
        await axios.post(" http://localhost:8001/contactDetails", contact);
      };
      postData();
      navigate("/manage-contact");
    } else {
      if (contact.name == "") {
        setNameError("please Enter name");
      }
      if (contact.number == "") {
        setNumError("please enter mobile number");
      }
      if (contact.number && !numberValidate) {
        setNumError("please enter valid mobile number");
      }
      if (contact.mailId == "") {
        setEmailError("please enter mail id");
      }
      if (contact.mailId && !emailValidate) {
        setEmailError("please enter valid email id");
      }
      if (contact.name == "" && contact.number == "" && contact.mailId == "") {
        toast.error("please enter values in required fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  // image upload
  const [imgUpload, setImgUpload] = useState(
    "https://cdn2.vectorstock.com/i/1000x1000/35/71/profile-icon-with-add-sign-vector-20383571.jpg"
  );

  const imgHandler = (e) => {
    const file = new FileReader();
    file.onload = () => {
      if (file.readyState === 2) {
        setImgUpload(file.result);
      }
    };
    file.readAsDataURL(e.target.files[0]);
  };
  // remove image
  const removeLogo = () => {
    setImgUpload(
      "https://cdn2.vectorstock.com/i/1000x1000/35/71/profile-icon-with-add-sign-vector-20383571.jpg"
    );
  };

  return (
    <>
      <DashboardLayout title={title} pageId={id}>
        <div className="add-page">
          <h4 className="text-white">Contact Form</h4>
          <div className="add-page-content ">
            <div className="header-row d-flex justify-content-between align-items-center">
              <h5>Add/Edit Form</h5>
              <button
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Field
              </button>
            </div>
            <div className="input-logo-sec">
              <div className="input-logo-wrapper d-flex align-items-center">
                <div className="img-wrapper me-2">
                  {" "}
                  <img src={imgUpload} alt="logo" />
                </div>
                <div className="logo-change">
                  <input
                    type="file"
                    id="input"
                    className="img-upload"
                    accept="image/*"
                    onChange={imgHandler}
                  />
                  <label htmlFor="input">
                    {" "}
                    <span className="change-logo">CHANGE LOGO</span>
                  </label>
                </div>
                <span className="remove-logo text-white" onClick={removeLogo}>
                  REMOVE PHOTO
                </span>
              </div>
            </div>
            <div className="basic-info-head">
              <h5>Basic Information</h5>
            </div>
            <IconContext.Provider value={{ size: "20px", color: "#858585" }}>
              <form onSubmit={addContact} className="add-form">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="input-sec">
                      <label>Name</label>
                      <span className="required">*</span>
                      <div className="input-wrapper">
                        <div className="input-logo">
                          <HiOutlineUser />
                        </div>
                        <input
                          placeholder="Enter Name"
                          name="name"
                          onChange={handleChange}
                          value={contact.name}
                        />
                      </div>
                      <div className="required">{nameError}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-sec">
                      <label>Job title</label>
                      <div className="input-wrapper">
                        <div className="input-logo">
                          <GoBriefcase />
                        </div>
                        <input
                          className="form-control"
                          placeholder="Enter Job Title"
                          name="title"
                          onChange={handleChange}
                          value={contact.title}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-sec">
                      <label>Mobile number</label>
                      <span className="required">*</span>
                      <div className="input-wrapper">
                        <div className="input-logo">
                          <FiPhoneCall />
                        </div>
                        <input
                          className="form-control"
                          placeholder="Enter Phone Number"
                          name="number"
                          onChange={handleChange}
                          value={contact.number}
                        />
                      </div>
                      <div className="required">{numError}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-sec">
                      <label>Email id</label>
                      <span className="required">*</span>
                      <div className="input-wrapper">
                        <div className="input-logo">
                          <HiOutlineMail />
                        </div>
                        <input
                          className="form-control"
                          placeholder="Enter Email ID"
                          name="mailId"
                          onChange={handleChange}
                          value={contact.mailId}
                        />
                      </div>
                      <div className="required">{emailError}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-sec">
                      <label>Organisation</label>
                      <div className="input-wrapper">
                        <div className="input-logo">
                          <MdOutlineGroups />
                        </div>
                        <input
                          className="form-control"
                          placeholder="Enter Organisation"
                          name="organisation"
                          onChange={handleChange}
                          value={contact.organisation}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-sec">
                      <label>Website</label>
                      <div className="input-wrapper">
                        <div className="input-logo">
                          <BsGlobe2 />
                        </div>
                        <input
                          className="form-control"
                          placeholder="Enter Website"
                          name="website"
                          onChange={handleChange}
                          value={contact.website}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-sec">
                      <label>Facebook</label>
                      <div className="input-wrapper">
                        <div className="input-logo">
                          <ImFacebook />
                        </div>
                        <input
                          className="form-control"
                          placeholder="Enter Facebook link"
                          name="facebook"
                          onChange={handleChange}
                          value={contact.facebook}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-sec">
                      <label>Instagram</label>
                      <div className="input-wrapper">
                        <div className="input-logo">
                          <BsInstagram />
                        </div>
                        <input
                          className="form-control"
                          placeholder="Enter Instagram link"
                          name="instagram"
                          onChange={handleChange}
                          value={contact.instagram}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-sec">
                      <label>Linked In</label>
                      <div className="input-wrapper">
                        <div className="input-logo">
                          <GrLinkedinOption />
                        </div>
                        <input
                          className="form-control"
                          placeholder="Enter LinkedIn link"
                          name="linkedIn"
                          onChange={handleChange}
                          value={contact.linkedIn}
                        />
                      </div>
                    </div>
                  </div>
                  {newLabel.map((e, index) => {
                    return (
                      <div key={index} className="col-lg-4">
                        <div className="input-sec new-input-sec">
                          <label>{e.label}</label>
                          <div className="input-wrapper">
                            <input
                              className="form-control"
                              placeholder={"Enter " + e.label}
                              name={e.label}
                              onChange={handleNewValueChange}
                            />
                            <div
                              className="input-logo"
                              onClick={() => {
                                removeLabel(index);
                              }}
                            >
                              <img src={labelClose} alt="close" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {
                    // ( newLabel.map((e)=>{
                    //   return (
                    //     <div className="col-lg-4">
                    //     <div className="input-sec">
                    //          <label>{e.new}</label>
                    //         <div className="input-wrapper">
                    //           <div className="input-logo"><GrLinkedinOption/></div>
                    //         <input
                    //           className="form-control"
                    //           placeholder={"Enter" + e.new}
                    //           name={e.new}
                    //           onChange={handleChange}
                    //         />
                    //         </div>
                    //        </div>
                    //     </div>
                    //   )
                    // }))
                  }
                </div>
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="buttons d-flex justify-content-center">
                      <button className="btn update m-2" type="submit">
                        Update
                      </button>
                      <button className="btn cancel m-2">cancel</button>
                    </div>
                    <ToastContainer />
                  </div>
                </div>
              </form>
            </IconContext.Provider>
          </div>
        </div>
      </DashboardLayout>

      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add label
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <h5>
                <label>Label Name</label>
              </h5>
              <input type="text" onChange={labelChangeHandler} />
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleSubmitLabel}
              >
                save
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContact;
