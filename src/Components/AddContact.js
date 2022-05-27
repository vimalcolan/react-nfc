import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import "../Common/Common.css";

const AddContact = () => {
  const [titleHeader] = useState("Manage contact");
  const [togglemenu, setTogglemenu] = useState(false);
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
    const postData = async () => {
      await axios
        .post(" http://localhost:8001/contactDetails", contact)
        .then((data) => console.log(data.data));
    };
    postData();
  };
  const handleMenu = () => {
    setTogglemenu(!togglemenu);
  };
  return (
    <>
      <div className="dashboard">
        <Header handleMenu={handleMenu} title={titleHeader} />
        <div className="page-wrapper">
         <Sidebar toggle={togglemenu} />
          <div className="main-page">
          <form onSubmit={addContact} className="add-form">
            <div className="row">
              <div className="col-lg-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="name"
                    name="name"
                    onChange={handleChange}
                    value={contact.name}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="title"
                    name="title"
                    onChange={handleChange}
                    value={contact.title}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="number"
                    name="number"
                    onChange={handleChange}
                    value={contact.number}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="mail id"
                    name="mailId"
                    onChange={handleChange}
                    value={contact.mailId}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="organisation"
                    name="organisation"
                    onChange={handleChange}
                    value={contact.organisation}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="website"
                    name="website"
                    onChange={handleChange}
                    value={contact.website}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="facebook"
                    name="facebook"
                    onChange={handleChange}
                    value={contact.facebook}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="instagram"
                    name="instagram"
                    onChange={handleChange}
                    value={contact.instagram}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="linked in"
                    name="linkedIn"
                    onChange={handleChange}
                    value={contact.linkedIn}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <button className="btn btn-success m-2" type="submit">
                  Add contact
                </button>
              </div>
            </div>
          </form>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default AddContact;
