import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../extra/chart/Chart";
import { Link, useParams } from "react-router-dom";
import "./single.scss";

import { useEffect, useState } from "react";
import axios from "axios";

import Task from "../../components/task-management/Task";

const taskObj = {
  title: "CRM Project",
  description: "design a build a crm system...",
  assignedDate: "16/01/2023",
  deadline: "12/02/2023",
};
const taskObj1 = {
  title: "SEO",
  description: "design a build a search engine optimized website...",
  assignedDate: "16/01/2023",
  deadline: "12/02/2023",
};
const taskObj2 = {
  title: "Furniture",
  description: "design a build a furniture website...",
  assignedDate: "16/01/2023",
  deadline: "12/02/2023",
};

const Single = () => {
  const [singleCustomer, setSingleCustomer] = useState({});
  const { customerId } = useParams();

  useEffect(() => {
    const fetchSingleCustomer = async () => {
      const { data } = await axios.get(
        `https://api.pacifencesolutions.com/api/customer/${customerId}`
      );
      setSingleCustomer(data);
    };
    fetchSingleCustomer();
  }, [customerId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to={`/customers/edit/${customerId}`}>
              <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={`https://picsum.photos/seed/${customerId}/300/200`}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{singleCustomer.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{singleCustomer.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{singleCustomer.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{singleCustomer.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{singleCustomer.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{singleCustomer.role}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        {/* <div className="bottom">
          <div className="task-div">
            <h1 className="title">Completed Task</h1>
            <Task taskObj={taskObj} />
            <Task taskObj={taskObj} />

          
          </div>

          <div className="task-div">
            <h1 className="title">Running</h1>
            <Task taskObj={taskObj1} />
      
          </div>

          <div className="task-div">
            <h1 className="title">Comming Soon</h1>
            <Task taskObj={taskObj2} />
      
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Single;
//"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
