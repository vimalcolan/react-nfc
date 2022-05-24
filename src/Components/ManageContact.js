import React,{useEffect, useState} from 'react'
import Sidebar from '../Common/Sidebar'
import Header from '../Common/Header';
import '../Common/Common.css'
import '../Components/pages.css'
import view from '../assets/images/view.png';
import edit from '../assets/images/edit.png';
import deleteIcon from '../assets/images/trash.png';
import axios from 'axios';

const ManageContact = () => {
    const [togglemenu, setTogglemenu] = useState(false);
    const [titleHeader] = useState("Manage Contact");
    const[contactDetails,setContactDetails]=useState([]);
    const handleMenu = () => {
      setTogglemenu(!togglemenu);
    };
    useEffect(()=>{
        const fetchData=async ()=>{
            await axios.get("http://localhost:8001/contactDetails").then(res=>setContactDetails(res.data))
        }
        fetchData();
    },[])
  return (
    <>
    <div className='dashboard manage-contact'>
       <Header handleMenu={handleMenu} title={titleHeader}/>
        <div className='page-wrapper'>
            <Sidebar  toggle={togglemenu} />
            <div className='main-page'>
            <div className="overview">
              <h4>Contact detail</h4>
            </div>
            <div className='contact-table-wrapper'>
               <div className='head-row d-flex justify-content-between'>
               <div className='left-side-content'>
                    <h4>List of Contacts</h4>
                </div>
                <div className='right-side-content'>
                <span className='sample-doc'>Sample Document Download</span>
                <span className='bulk-upload mx-2'>Bulk Upload Contact</span>
                <span><button className='btn btn-success'>Bulk Upload Contact</button></span>

                </div>
               </div>
               <div className='filter-row d-flex justify-content-between align-items-center'>
                   <label className='ml-2'>Filter</label>
                   <input type="text" placeholder="Search by User Name..."/>
                   <input type="text" placeholder="Search by Job title..."/>
                   <input type="text" placeholder="Search by Mobile number..."/>
                   <input type="text" placeholder="Search by Email Id"/>

               </div>
               <div className='table-row table-responsive'>
                   <table className='table text-white'>
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
                      {contactDetails.map((e)=>(
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td><span>{e.name}</span></td>
                                <td>{e.jobTitle}</td>
                                <td>{e.mobileNumber}</td>
                                <td>{e.emailId}</td>
                                <td>
                                    <span><img src={view} alt="view" /></span>
                                    <span className='mx-2'><img src={edit} alt="edit" /></span>
                                    <span><img src={deleteIcon} alt="delete" /></span>
                                </td>
                            </tr>
                      ))}
                       
                       </tbody>
                   </table>

               </div>

            </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default ManageContact