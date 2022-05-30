import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import "../Common/Common.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoImg from "../assets/images/logoImg.png";
import userIcon from "../assets/images/userIcon.png";

const EditContact = () => {
  const navigate=useNavigate();
  const [titleHeader] = useState("Manage contact");
  const [togglemenu, setTogglemenu] = useState(false);
   // Authentication
   useEffect(()=>{
    if(sessionStorage.getItem("auth")){
      navigate("/edit-contact")
    }
      else{
          navigate("/login")
      }
    
  },[])
  // toggle menu
  const handleMenu = () => {
    setTogglemenu(!togglemenu);
  };
  const[editData,setEditdata]=useState( {name: "",
  title: "",
  number: "",
  mailId: "",
  organisation: "",
  website: "",
  facebook: "",
  instagram: "",
  linkedIn: ""})
  // get edit id from session storage
  const updateId=sessionStorage.getItem("editId");
 useEffect(()=>{
  const fetchData=async ()=>{
    axios.get(`http://localhost:8001/contactDetails/${updateId}`).then(res=>setEditdata(res.data));
      }
      fetchData(); 
 },[]);
  const handleChange = (e) => {
    setEditdata({ ...editData, [e.target.name]: e.target.value });
  };
 

  const EditContact = (e) => {
    e.preventDefault();
    if((editData.name!=="")&&(editData.number!=="")){
      const postData = async () => {
        await axios
          .put(`http://localhost:8001/contactDetails/${updateId}`, editData)
          .then((data) => console.log(data.data));
      };
      postData();
      toast.success("Contact updated successfully",{position:toast.POSITION.TOP_RIGHT});
      navigate('/manage-contact');
      sessionStorage.removeItem("editId");
    }
  
  };

  return (
    <>
      <div className="dashboard">
        <Header handleMenu={handleMenu} title={titleHeader} />
        <div className="page-wrapper">
         <Sidebar toggle={togglemenu} />
          <div className="main-page">
          <h4 className="text-white">Contact Form</h4>
            <div className="add-page-content ">
              <div className="header-row d-flex justify-content-between align-items-center">
                <h5>Add/Edit Form</h5>
                <button className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Field</button>
              </div>
              <div className="input-logo-sec">
                <div className="input-logo-wrapper">
                 <div className="img-wrapper"> <img src={logoImg} alt="logo" /></div>
                  <span className="change-logo">Change LOGO</span>
                  <span className="remove-logo">Remove Photo</span>
                </div>
              </div>
              <div className="basic-info-head">
                <h5>Basic Information</h5>
              </div>
              <form onSubmit={EditContact} className="add-form">
              <div className="row">
                <div className="col-lg-4">
                 
                   <div className="input-sec">
                     <label>Name</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                     
                      placeholder="name"
                      name="name"
                      onChange={handleChange}
                      value={editData.name}
                    />
                    </div>
                   </div>
                  </div>
               
                <div className="col-lg-4">

                  <div className="input-sec">
                     <label>Job title</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                      className="form-control"
                      placeholder="name"
                      name="title"
                      onChange={handleChange}
                      value={editData.title}
                    />
                    </div>
                   </div>
                </div>
                <div className="col-lg-4">
                
                  <div className="input-sec">
                     <label>Mobile number</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                      className="form-control"
                      placeholder="name"
                      name="number"
                      onChange={handleChange}
                      value={editData.number}
                    />
                    </div>
                   </div>
                </div>
                <div className="col-lg-4">
                <div className="input-sec">
                     <label>Email id</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                      className="form-control"
                      placeholder="name"
                      name="mailId"
                      onChange={handleChange}
                      value={editData.mailId}
                    />
                    </div>
                   </div>
                </div>
                <div className="col-lg-4">
                <div className="input-sec">
                     <label>Organisation</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                      className="form-control"
                      placeholder="name"
                      name="organisation"
                      onChange={handleChange}
                      value={editData.organisation}
                    />
                    </div>
                   </div>
                </div>
                <div className="col-lg-4">
                <div className="input-sec">
                     <label>Website</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                      className="form-control"
                      placeholder="name"
                      name="website"
                      onChange={handleChange}
                      value={editData.website}
                    />
                    </div>
                   </div>
                </div>
                <div className="col-lg-4">
                <div className="input-sec">
                     <label>Facebook</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                      className="form-control"
                      placeholder="name"
                      name="facebook"
                      onChange={handleChange}
                      value={editData.facebook}
                    />
                    </div>
                   </div>
                </div>
                <div className="col-lg-4">
                <div className="input-sec">
                     <label>Instagram</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                      className="form-control"
                      placeholder="name"
                      name="instagram"
                      onChange={handleChange}
                      value={editData.instagram}
                    />
                    </div>
                   </div>
                </div>
                <div className="col-lg-4">
                <div className="input-sec">
                     <label>Linked In</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                      className="form-control"
                      placeholder="name"
                      name="linkedIn"
                      onChange={handleChange}
                      value={editData.linkedIn}
                    />
                    </div>
                   </div>
                </div>
                {/* <div className="col-lg-4">
                <div className="input-sec">
                     <label>Linked In</label>
                    <div className="input-wrapper">
                      <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                    <input
                      className="form-control"
                      placeholder="name"
                      name="name"
                      onChange={handleChange}
                      value={contact.linkedIn}
                    />
                    </div>
                   </div>
                </div> */}
                <div className="col-lg-12 ">
                 <div className="buttons d-flex justify-content-center">
                 <button className="btn update m-2" type="submit">
                    Update
                  </button>
                  <button className="btn cancel m-2" >
                   cancel
                  </button>
                 </div>
                  <ToastContainer />
                </div>
              </div>
            </form>

            </div>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default EditContact