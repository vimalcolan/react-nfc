import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import "../Common/Common.css";
import "../Components/pages.css";
import view from "../assets/images/view.png";
import edit from "../assets/images/edit.png";
import deleteIcon from "../assets/images/trash.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageContact = () => {
  const navigate = useNavigate();
  const [togglemenu, setTogglemenu] = useState(false);
  const [titleHeader] = useState("Manage Contact");

  // Authentication
  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      navigate("/manage-contact");
    } else {
      navigate("/login");
    }
  }, []);

  //   toggle menu
  const handleMenu = () => {
    setTogglemenu(!togglemenu);
  };


  
  // fetching Api values into table
  const [contactDetails, setContactDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8001/contactDetails")
        .then((res) => setContactDetails(res.data));
    };
    fetchData();
  }, []);

  //   filter
  const [searchName, setsearchName] = useState("");
  const [searchTitle, setsearchTitle] = useState("");
  const [searchNumber, setsearchNumber] = useState("");
  const [searchMailId, setsearchMailId] = useState("");
  const handleChangeName = (e) => {
    setsearchName(e.target.value);
  };
  const handleChangeTitle = (e) => {
    setsearchTitle(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setsearchNumber(e.target.value);
  };
  const handleChangeMailId = (e) => {
    setsearchMailId(e.target.value);
  };


  //-----------------------------   Edit contact  ----------------------------------//
  const handleEdit = (editId) => {
    const index = contactDetails.filter((e) =>{return e.id === editId;}).map((e) =>{ return e.id;});
    sessionStorage.setItem("editId", index);
    navigate("/edit-contact");
  };

  //------------------------------- delete contact -------------------------------//
  const [deleteIndex, setdeleteIndex] = useState([]);

  const handleDelete = (deleteId) => {
    const delIndex = contactDetails.filter((e) => {return e.id === deleteId}).map((e) => {return e.id});
    console.log("delete val", delIndex);
    setdeleteIndex(delIndex); 
    debugger;
    axios.delete(`http://localhost:8001/contactDetails/${delIndex}`)
    window.location.reload(false)
  };
 


  // -------------------------------------- View contact ------------------------//
  const handleView = (viewId) => {
    console.log("view id", viewId);
    const index = contactDetails
      .filter((e) => {
        return e.id === viewId;
      })
      .map((e) => {
        return e.id;
      });
    sessionStorage.setItem("viewId", index);
    console.log("view id", index);
    navigate("/view-contact");
  };
  return (
    <>
      <div className="dashboard manage-contact">
        <Header handleMenu={handleMenu} title={titleHeader} />
        <div className="page-wrapper">
          <Sidebar toggle={togglemenu} />
          <div className="main-page">
            <div className="overview">
              <h4>Contact detail</h4>
            </div>
            <div className="contact-table-wrapper">
              <div className="head-row d-flex justify-content-between">
                <div className="left-side-content">
                  <h4>List of Contacts</h4>
                </div>
                <div className="right-side-content">
                  <span className="sample-doc">Sample Document Download</span>
                  <span className="bulk-upload mx-2">Bulk Upload Contact</span>
                  <span>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        navigate("/add-contact");
                      }}
                    >
                      Add Contact
                    </button>
                  </span>
                </div>
              </div>
              <div className="filter-row d-flex justify-content-between align-items-center">
                <label className="ml-2">Filter</label>
                <input
                  type="text"
                  placeholder="Search by User Name..."
                  onChange={handleChangeName}
                  value={searchName}
                />
                <input
                  type="text"
                  placeholder="Search by Job title..."
                  onChange={handleChangeTitle}
                  value={searchTitle}
                />
                <input
                  type="text"
                  placeholder="Search by Mobile number..."
                  onChange={handleChangeNumber}
                  value={searchNumber}
                />
                <input
                  type="text"
                  placeholder="Search by Email Id..."
                  onChange={handleChangeMailId}
                  value={searchMailId}
                />
              </div>
              <div className="table-row table-responsive">
                <table className="table text-white">
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>name</td>
                      <td>Job title</td>
                      <td>Mobile Number</td>
                      <td>Email id</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {contactDetails.length ? (
                      contactDetails
                        .filter((data) => {
                          if (
                            searchName == "" &&
                            searchTitle == "" &&
                            searchNumber == "" &&
                            searchMailId == ""
                          ) {
                            return data;
                          } else if (
                            data.name
                              .toLowerCase()
                              .includes(searchName.toLowerCase()) &&
                            data.title
                              .toLowerCase()
                              .includes(searchTitle.toLowerCase()) &&
                            data.number
                              .toLowerCase()
                              .includes(searchNumber.toLowerCase()) &&
                            data.mailId
                              .toLowerCase()
                              .includes(searchMailId.toLowerCase())
                          ) {
                            return data;
                          }
                        })
                        .map((e) => (
                          <tr key={e.id}>
                            <td>{e.id}</td>
                            <td><span className="name-text" onClick={() => {handleEdit(e.id);}}>{e.name}</span></td>
                            <td>{e.title}</td>
                            <td>{e.number}</td>
                            <td>{e.mailId}</td>
                            <td>
                              <span onClick={() => {handleView(e.id)}}><img src={view} alt="view"/></span>
                              <span className="mx-2" onClick={() => {handleEdit(e.id)}}><img src={edit} alt="edit"/></span>
                              <span onClick={() => {handleDelete(e.id)}}><img  src={deleteIcon}alt="delete"/>
                              </span>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                       <td colSpan="6">
                       <div className="loading-gif">
                        <span className="loader">
                          <span className="loader-inner"></span>
                        </span>
                      </div>
                       </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ManageContact;
