import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import "../Common/Common.css";
import { useNavigate } from "react-router-dom";
import back from '../assets/images/back.png'
import name from '../assets/images/name.png';
import title from '../assets/images/title.png';
import number from '../assets/images/number.png';
import mailId from '../assets/images/mailId.png';
import organisation from '../assets/images/organisation.png';
import website from '../assets/images/website.png';
import facebook from '../assets/images/fb.png';
import insta from '../assets/images/insta.png';
import linkedIn from '../assets/images/linkedIn.png';
import customFields from '../assets/images/customFields.png';
import address from '../assets/images/address.png';
import DashboardLayout from "../Common/DashboardLayout";

const ViewContact = () => {
    const navigate=useNavigate();
     const title = "Manage contact";
  const [togglemenu, setTogglemenu] = useState(false);
  
   // Authentication
   useEffect(()=>{
    if(sessionStorage.getItem("auth")===null){
      navigate("/login")
    } 
  },[])

//   toggle menu
  const handleMenu = () => {
    setTogglemenu(!togglemenu);
  }


  const[viewContact,setviewContact]=useState({})
  const ViewContactId=sessionStorage.getItem("viewId");
  useEffect(()=>{
    const fetchData=async()=>{
      await axios.get(`http://localhost:8001/contactDetails/${ViewContactId}`).then(res=>setviewContact(res.data))
    }
    fetchData();
  },[])
console.log("viewContact",viewContact);

  return (
    <>
   


<DashboardLayout title={title}>
<div className="view-page">
                <div className="header-row d-flex justify-content-between align-items-center">
                  <h4>CONTACT INFORMATION</h4>
                  <div className="back-btn">
                    <span onClick={()=>{navigate('/manage-contact')}}><img src={back} alt="back" className="me-2"/>Back</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={name} alt="back"  /></div>
                      <div className="label-name">Name</div>
                      <div className="label-value">{viewContact.name}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={title} alt="back"  /></div>
                      <div className="label-name">Job Title</div>
                      <div className="label-value">{viewContact.title}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={number} alt="back"  /></div>
                      <div className="label-name">Mobile Number</div>
                      <div className="label-value">{viewContact.number}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={mailId} alt="back"  /></div>
                      <div className="label-name">Email id</div>
                      <div className="label-value">{viewContact.mailId}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={organisation} alt="back"  /></div>
                      <div className="label-name">Organization</div>
                      <div className="label-value">{viewContact.organisation}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={website} alt="back"  /></div>
                      <div className="label-name">Website</div>
                      <div className="label-value">{viewContact.website}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={facebook} alt="back"  /></div>
                      <div className="label-name">Facebook</div>
                      <div className="label-value">{viewContact.facebook}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={insta} alt="back"  /></div>
                      <div className="label-name">Instagram</div>
                      <div className="label-value">{viewContact.instagram}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={linkedIn} alt="back"  /></div>
                      <div className="label-name">linkedIn</div>
                      <div className="label-value">{viewContact.linkedIn}</div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={customFields} alt="back"  /></div>
                      <div className="label-name">Custom Fields</div>
                      <div className="label-value"></div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="icon"><img src={address} alt="back"  /></div>
                      <div className="label-name">Address</div>
                      <div className="label-value"></div>
                    </div>
                  </div>

                </div>
            </div>
</DashboardLayout>
    </>
  )
}

export default ViewContact