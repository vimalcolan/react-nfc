import React, { useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import ChartData from "../Shared/ChartData";
import search from '../assets/images/search-icon.png';
import "./Common.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [togglemenu, setTogglemenu] = useState(false);
  const [titleHeader] = useState("Dashboard");
  const navigate=useNavigate();
  const handleMenu = () => {
    setTogglemenu(!togglemenu);
  };
  
  return (
    <>
      <div className="dashboard">
        <Header handleMenu={handleMenu} title={titleHeader}/>
        <div className="page-wrapper d-flex">
          <Sidebar toggle={togglemenu} />
          <div className="main-page">
            <div className="overview">
              <h4>Overview</h4>
            </div>
            <div className="row main-row">
              <div className="col-md-6">
              <div className="chart-wrapper">
              <ChartData />
              </div>
              </div>
              <div className="col-md-6">
                <div className="contacts-table-wrapper">
                  <h5 >Number of Contacts Saved By User</h5>
                  <div className="search-field">
                    <label className="text-white">Search</label>
                   <div className="input-wrapper d-flex">
                   <input type="text" placeholder="Search By User Name..." />
                   <div className="search-icon" ><img src={search} alt="search"/></div>
                   </div>
                  </div>
                  <div className="contacts-table table-responsive mt-2">
                    <table className="table text-white">
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Username</td>
                        <td>Saved Contacts</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td >01</td>
                        <td><span onClick={()=>{navigate("/manage-contact")}}>John Adam</span></td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td><span>John Adam</span></td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td><span>John Adam</span></td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td><span>John Adam</span></td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td><span>John Adam</span></td>
                        <td>10</td>
                      </tr>
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
