import React from "react";
import {AiOutlineDashboard} from 'react-icons/ai'
import {RiContactsBook2Line} from 'react-icons/ri'
import {BsFileSpreadsheet} from 'react-icons/bs'

const Sidebar = ({toggle}) => {
  return (
    <>
      <div className={toggle?"sidebar-wrapper hide":"sidebar-wrapper"}>
        <ul>
          <li>
            <a>
              <span className="me-2">
              <AiOutlineDashboard size={'30px'} color={"#6B6B6B"}/>
              </span>
              Dashboard
            </a>
          </li>
          <li>
            <a>
              <span className="me-2">
                <RiContactsBook2Line size={'30px'} color={"#6B6B6B"}/>
              </span>
              Manage contact
            </a>
          </li>
          <li>
            <a>
              <span className="me-2">
              <BsFileSpreadsheet size={'30px'} color={"#6B6B6B"}/>
              </span>
              Reports
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
