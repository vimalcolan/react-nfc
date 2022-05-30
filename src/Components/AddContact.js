import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import "../Common/Common.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImg from "../assets/images/logoImg.png";
import userIcon from "../assets/images/userIcon.png";

const AddContact = () => {
  const navigate = useNavigate();
  const [titleHeader] = useState("Manage contact");
  const [togglemenu, setTogglemenu] = useState(false);
  // Authentication
  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      navigate("/add-contact");
    } else {
      navigate("/login");
    }
  }, []);
  // toggle menu
  const handleMenu = () => {
    setTogglemenu(!togglemenu);
  };
  // post values
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
  const addContact = (e) => {
    e.preventDefault();
    if (contact.name !== "" && contact.number !== "") {
      const postData = async () => {
        await axios
          .post(" http://localhost:8001/contactDetails", contact)
          .then((data) => console.log(data.data));
      };
      postData();
      // toast.success("Contact updated successfully", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      navigate("/manage-contact");
    }
  };


// add label


// const[previousData,setPreviouData]=useState();
// useEffect(()=>{
//   const fetchData=async()=>{
//     await axios.get("http://localhost:8001/contactDetails").then(res=>setPreviouData(res.data))
//    }
//    fetchData();
// },[])
//  console.log("prev",previousData);


// const handleAddLabel=(e)=>{
//   e.preventDefault();
 
// const dataAdded=[...previousData];
// debugger;
// console.log("data added",dataAdded);
// if (contact.name !== "" && contact.number !== "") {
//   const postData = async () => {
//     await axios
//       .post(" http://localhost:8001/contactDetails", contact)
//       .then((data) => console.log(data.data));
//   };
//   postData();
// }
// }
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
              <form onSubmit={addContact} className="add-form">
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
                      value={contact.name}
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
                      value={contact.title}
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
                      value={contact.number}
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
                      value={contact.mailId}
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
                      value={contact.organisation}
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
                      value={contact.website}
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
                      value={contact.facebook}
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
                      value={contact.instagram}
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
                      value={contact.linkedIn}
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


<div className="modal fade" id="exampleModal" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add label</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
     <form>
     <div className="modal-body">
        <h5>Label Name</h5>
        <input type="text"  />
      </div>
      <div className="modal-footer d-flex justify-content-between">
        <button className="btn btn-secondary" data-bs-dismiss="modal" type="submit">save</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
      </div>
     </form>
    </div>
  </div>
</div>
    </>
  );
};

export default AddContact;
