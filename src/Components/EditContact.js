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
import labelClose from "../assets/images/label-close.png";
import profileLogo from "../assets/images/profile-icon.png";

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
  linkedIn: "",
  newLabels:[],
  imgURL:[]
});

const[existingEditLabel,setexistingEditLabel]=useState([]);
const [newEditLabel, setnewEditLabel] = useState([{label:"",value:""}]);
const [labelChange, SetLabelChange] = useState("");
const[addLabels,setaddLabels]=useState([]);
const[newValue,setnewValue]=useState([{label:"",value:""}]);
const[newValue1,setnewValue1]=useState([{label:"",value:""}]);
const [imgUpload, setImgUpload] = useState("https://cdn2.vectorstock.com/i/1000x1000/35/71/profile-icon-with-add-sign-vector-20383571.jpg")
const[editImgUpload,seteditImgUpload]=useState("");
  // get edit id from session storage
  const updateId=sessionStorage.getItem("editId");

 useEffect(()=>{
  const fetchData=async ()=>{
    axios.get(`http://localhost:8001/contactDetails/${updateId}`).then(res=>{
      setEditdata(res.data);
      setexistingEditLabel(res.data.newLabels);
      setImgUpload(res.data.imgURL)});
      }
      fetchData(); 
 },[]);
//  console.log("initial edit data",editData);
  const handleChange = (e) => {
    setEditdata({ ...editData, [e.target.name]: e.target.value });
  };

const labelChangeHandler = (e) => {
  SetLabelChange(e.target.value);
};

const handleSubmitLabel = () => {
  setaddLabels([...addLabels,labelChange])
  setnewValue1([...newValue1,{label:"",value:""}]);

};
const handleNewValueChange = (e,k) => {
  let element=[...existingEditLabel];
  element[k].label=existingEditLabel[k].label;
  element[k].value=e.target.value;
  setnewValue(element);
  console.log("element",element);

}
const handleNewValueChange1 = (e,k) => {
  let element=[...newValue1];
  element[k].label=addLabels[k];
  element[k].value=e.target.value;
  setnewValue1(element);
  console.log("element",element);
}

const removeLabel=(e)=>{
  const sampleLabels=[...existingEditLabel];
  sampleLabels.splice(e,1);
  setexistingEditLabel(sampleLabels);
}
const removeLabel1=(evt)=>{
  const sampleLabels=[...addLabels];
  sampleLabels.splice(evt,1);
  setaddLabels(sampleLabels);
}

 // image upload
 const imgHandler = (e) => {
  if((editData.imgURL).length!==0){
    const file = new FileReader();
    file.onload = () => {
    if (file.readyState === 2) {
      setImgUpload(file.result);
      seteditImgUpload(file.result);
    }
  };
  file.readAsDataURL(e.target.files[0]);
  }
  // editData.imgURL.pop()
};


// remove image
const removeLogo = () => {
  setImgUpload(
    "https://cdn2.vectorstock.com/i/1000x1000/35/71/profile-icon-with-add-sign-vector-20383571.jpg"
  );
};


// -----------------------Edit Values --------------------------//
  const EditContact = (e) => {
    e.preventDefault();


    const editUpdated=[...existingEditLabel];
//     console.log("existing edited data",editUpdated);
// const apieditedLabels=[...editData.newLabels];
// console.log("api edit data",apieditedLabels);
// apieditedLabels.splice(0);
// console.log("all deleted from api",apieditedLabels);
editData.newLabels.splice(0);
editUpdated.map((e)=>{
  editData.newLabels.push(e);
})


newValue1.pop();
  newValue1.map((e)=>{
    console.log("new value set",e);
      if((newValue1.label!=="")&&(newValue1.value!=="")){
      editData.newLabels.push(e)
      }
  });
      // update image
   
setImgUpload(editImgUpload);
// editData.imgURL.push(imgUpload);



    if((editData.name!=="")&&(editData.number!=="")){
      console.log("final edit data",editData);
      const postData = async () => {
        await axios
          .put(`http://localhost:8001/contactDetails/${updateId}`, editData)
          .then((data) => console.log(data.data)).catch(err=>console.log(err))
      };
      postData(); 
      toast.success("Contact updated successfully",{position:toast.POSITION.TOP_RIGHT});
      navigate('/manage-contact');
      sessionStorage.removeItem("editId");
    }}

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
                <div className="img-wrapper me-2"> {" "}<img src={imgUpload} alt="logo" /></div>
                <div className="logo-change">
                  <input type="file" id="input" className="img-upload" accept="image/*" onChange={imgHandler}/>
                  <label htmlFor="input">{" "}<span className="change-logo">CHANGE LOGO</span></label>
                </div>
                <span className="remove-logo text-white" onClick={removeLogo}>REMOVE PHOTO</span>
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
                    <input placeholder="name"  name="name"  onChange={handleChange} value={editData.name}/>
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
                  {
             existingEditLabel.length?(
                existingEditLabel.map((event, index) => {
                    return (
                      <div key={index} className="col-lg-4">
                        <div className="input-sec new-input-sec">
                          <label>{event.label}</label>
                          <div className="input-wrapper">
                            <input
                              className="form-control"
                              placeholder={"Enter " + event.label}
                              name={event.label}
                              value={existingEditLabel[index].value}
                              onChange={(e)=>{handleNewValueChange(e,index)}}
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
                  })
                 ):(null)
                  }


                {addLabels.length?(
               addLabels.map((event, index) => {
                    return (
                      <div key={index} className="col-lg-4">
                        <div className="input-sec new-input-sec">
                          <label>{event}</label>
                          <div className="input-wrapper">
                            <input
                              className="form-control"
                              placeholder={"Enter " + event}
                              name={event}
                              value={newValue1[index].value}
                              onChange={(e)=>{handleNewValueChange1(e,index)}}
                            />
                            <div
                              className="input-logo"
                              onClick={() => {
                                removeLabel1(index);
                              }}
                            >
                              <img src={labelClose} alt="close" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                 ):(null)
                  }
               
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


{/* ---------------MODAL---------------- */}


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
              <input type="text" onChange={
                labelChangeHandler
              } />
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
}

export default EditContact