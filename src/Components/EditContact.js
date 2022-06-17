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
import DashboardLayout from "../Common/DashboardLayout";

const EditContact = () => {
  const navigate=useNavigate();
  const title = "Manage contact";
  const id=2;
   // Authentication
   useEffect(()=>{
    if(sessionStorage.getItem("auth")===null){
      navigate("/login")
    }
  },[])

  const[editData,setEditdata]=useState( {name: "",
  title: "",
  number: "",
  mailId: "",
  organisation: "",
  website: "",
  facebook: "",
  instagram: "",
  linkedIn: ""})
  // const[editNewData,seteditNewData]=useState([{label:"",value:""}]);

  // get edit id from session storage
  const updateId=sessionStorage.getItem("editId");
 useEffect(()=>{
  const fetchData=async ()=>{
    axios.get(`http://localhost:8001/contactDetails/${updateId}`).then(res=>setEditdata(res.data));
      }
      fetchData(); 
    
 },[]);

//  const newLabel=editData.newlabels
//  seteditNewData([{...editNewData,newLabel}]);
// console.log("newlabels",editData.newlabels);


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


  // const user={
  //   name: "project1.3345",
  //   title: "jobtitle3",
  //   number: " 9876554433",
  //   mailId: "test7@gmail.com",
  //   organisation: "test oorganisation",
  // website: "www.test.com",
  // facebook: "test33",
  //   instagram: "sample_223",
  //   linkedIn: "sample_test3",
  //   id: 3,
  //   newlabels:[{label:"sec",value:"9876543210"},{label:"twitter",value:"vimal11"},{label:"num3",value:"0000"}]
  // }
  // const newLabel=user.newlabels
  
  // console.log("new",newLabel);
  return (
    <>
 
<DashboardLayout  title={title} pageId={id}>
<div className="edit-page">
          <h4 className="text-white">Contact Form</h4>
            <div className="add-page-content ">
              <div className="header-row d-flex justify-content-between align-items-center">
                <h5>Add/Edit Form</h5>
                <button className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Field</button>
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
                {/* {
                 newLabel.length?( 
                  newLabel.map((e,ind)=>{
                  return(
                   <div className="col-lg-4" key={ind}>
                   <div className="input-sec">
                        <label>{e.label}</label>
                       <div className="input-wrapper">
                         <div className="input-logo"><img src={userIcon} alt="icon"/></div>
                       <input
                         className="form-control"
                         placeholder="name"
                         name={e.name}
                         onChange={handleChange}
                         value={e.value}
                       />
                       </div>
                      </div>
                   </div>
                  )
                 })
                 ):(<div>no new labels</div>)
                } */}
               
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
</DashboardLayout>
    </>
  );
}

export default EditContact