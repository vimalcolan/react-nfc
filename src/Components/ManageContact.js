import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Components/pages.css";

import view from "../assets/images/view.png";
import edit from "../assets/images/edit.png";
import deleteIcon from "../assets/images/trash.png";
import countArrow from "../assets/images/count-arrows.svg";

import DashboardLayout from "../Common/DashboardLayout";
import exportFromJSON from "export-from-json";
import * as xlsx from "xlsx";

const ManageContact = () => {
  const title = "Manage Contact";
  const id = 2;
  // Authentication
  useEffect(() => {
    if (sessionStorage.getItem("auth") === null) {
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();

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
  // console.log("normal",contactDetails);
  // var reversedContact=contactDetails.reverse();
  // console.log("rev",reversedContact);

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
    const index = contactDetails
      .filter((e) => {
        return e.id === editId;
      })
      .map((e) => {
        return e.id;
      });
    sessionStorage.setItem("editId", index);
    navigate(`/contacts/edit/${index}`);
  };

  //------------------------------- delete contact -------------------------------//
  const handleDelete = (deleteId) => {
    const delIndex = contactDetails
      .filter((e) => {
        return e.id === deleteId;
      })
      .map((e) => {
        return e.id;
      });
    debugger;
    axios.delete(`http://localhost:8001/contactDetails/${delIndex}`);
    window.location.reload(false);
  };

  // -------------------------------------- View contact ------------------------//
  const handleView = (viewId) => {
    console.log("view id", viewId);
    const index = contactDetails.filter((e) => {return e.id === viewId;}).map((e) => { return e.id;});
    sessionStorage.setItem("viewId", index);
    navigate(`/contacts/view/${index}`);
  };

  // -----------------------------------------pagination---------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const pages = [];

  for (let i = 1; i <= Math.ceil(contactDetails.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentItems = contactDetails.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const pageChangeClick = (pageNum) => {
    setCurrentPage(pageNum + 1);
  };

  const handlePageSize = (e) => {
    setItemPerPage(e.target.value);
  };

  const pageLimit = 3;
  const [maxPageNumberLimit, setMaxNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinNumberLimit] = useState(1);

  const handlePrevBtn = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageLimit == 0) {
      setMaxNumberLimit(maxPageNumberLimit - pageLimit);
      setMinNumberLimit(minPageNumberLimit - pageLimit);
    }
  };
  const handleNextBtn = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxNumberLimit(maxPageNumberLimit + pageLimit);
      setMinNumberLimit(minPageNumberLimit + pageLimit);
    }
  };

  let postIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    postIncrementBtn = <li onClick={handleNextBtn}>...</li>;
  }

  //-------------------------------------------- sample document download------------------------------------------------------
  const data = [
    {
      name: "",
      title: "",
      number: "",
      Email: "",
      Organisation: "",
      Website: "",
      Facebook: "",
      Instagram: "",
      LinkedIn: "",
    },
  ];

  const fileName = "download";
  const exportType = "xls";

  const ExportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  //-------------------------------------- Bulk upload-------------------------------------------------------------

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log("upload",json);
       
        for (var key in json) {
          axios.post(" http://localhost:8001/contactDetails", json[key]);
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <>
      <DashboardLayout title={title} pageId={id}>
        <div className="manage-page">
          <div className="overview">
            <h4>Contact detail</h4>
          </div>
          <div className="contact-table-wrapper">
            <div className="head-row d-flex justify-content-between align-items-center">
              <div className="left-side-content">
                <h4>List of Contacts</h4>
              </div>
              <div className="right-side-content">
                <span className="sample-doc">
                  <button type="button" onClick={ExportToExcel}>
                    Sample Document Download
                  </button>
                </span>
                <span className="bulk-upload mx-2">
                  <label htmlFor="upload">Bulk Upload Contact</label>
                  <form className="upload-form">
                    <input
                      type="file"
                      name="upload"
                      id="upload"
                      onChange={readUploadFile}
                    />
                  </form>
                </span>
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
              <label className="me-2 text-white">Filter</label>
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
              <table className="table text-white" id="table-to-excel">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Job title</th>
                    <th>Mobile Number</th>
                    <th>Email id</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contactDetails.length ? (
                    currentItems
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
                      .map((e, index) => (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td><Link to="/"><span className="name-text"> {e.name}</span></Link></td>
                          <td><span className="name-text">Link</span></td>
                          <td>{e.title}</td>
                          <td>{e.number}</td>
                          <td>{e.mailId}</td>
                          <td>
                            {/* <Link to="/contacts/view/">
                              <span><img src={view} alt="view" /></span>
                            </Link> */}
                            <span  onClick={() => {handleView(e.id)}} > <img src={view} alt="view" /></span>
                            <span className="mx-2"  onClick={() => {handleEdit(e.id); }}><img src={edit} alt="edit" /></span>
                            <span onClick={() => { handleDelete(e.id); }}> <img src={deleteIcon} alt="delete" /> </span>
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
          <div className="pagination-sec d-flex justify-content-between align-items-center mt-2">
            <div className="page-size d-flex align-items-center">
              <span>Show</span>
              <div className="custom-select">
                <select
                  onChange={handlePageSize}
                  name="pageSize"
                  value={itemsPerPage}
                >
                  <option name="five" value="5">
                    5
                  </option>
                  <option name="ten" value="10">
                    10
                  </option>
                  <option name="twenty" value="20">
                    20
                  </option>
                </select>
                <img src={countArrow} alt="count-arrow" />
              </div>
              <span>Last Entries</span>
            </div>
            <div className="page-numbers">
              <ul>
                <li>
                  <button
                    className="pagination-prev-btn"
                    onClick={handlePrevBtn}
                    disabled={currentPage == pages[0] ? true : false}
                  >
                    Prev.
                  </button>
                </li>

                {pages.map((num, index) => {
                  if (num <= maxPageNumberLimit && num >= minPageNumberLimit) {
                    return (
                      <li
                        key={index}
                        id={num}
                        onClick={() => {
                          pageChangeClick(index);
                        }}
                        className={currentPage == num ? "active" : ""}
                      >
                        {num}
                      </li>
                    );
                  }
                })}
                {postIncrementBtn}
                <li>
                  <button
                    className="pagination-next-btn"
                    onClick={handleNextBtn}
                    disabled={
                      currentPage == pages[pages.length - 1] ? true : false
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
      <ToastContainer />
    </>
  );
};

export default ManageContact;
