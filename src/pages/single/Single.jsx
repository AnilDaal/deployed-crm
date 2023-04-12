import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../extra/chart/Chart";
import { Link, useParams } from "react-router-dom";
import "./single.scss";

import { useEffect, useState } from "react";
import axios from "axios";
import Task from "../../components/task-management/Task";
import { useSelector } from "react-redux";

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
  const { token } = useSelector((state) => state.auth);
  const [singleEmployee, setSingleEmployee] = useState({});
  const [tasks, setTasks] = useState([]);
  const { employeeId } = useParams();
  useEffect(() => {
    const fetchSingleEmployee = async () => {
      try {
        const { data } = await axios.get(
          `https://api.pacifencesolutions.com/api/employee/${employeeId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setSingleEmployee(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleEmployee();
  }, [employeeId, token]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          `https://api.pacifencesolutions.com/api/employee/${employeeId}/getTask`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const usersTasks = data.data.filter((t) => t.employeeId === employeeId);
        setTasks(usersTasks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [employeeId, token]);

  console.log(tasks);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to={`/employees/edit/${employeeId}`}>
              <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={`https://picsum.photos/seed/${employeeId}/300/200`}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{singleEmployee.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{singleEmployee.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{singleEmployee.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{singleEmployee.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{singleEmployee.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{singleEmployee.role}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
            <Link to={`/employees/${employeeId}/new-task`}>
              <button className="task-btn">Add Task</button>
            </Link>
          </div>
        </div>
        <div className="bottom">
          <div className="task-div">
            <h1 className="title">Completed Task</h1>
          </div>

          <div className="task-div">
            <h1 className="title">Running</h1>
          </div>

          <div className="task-div">
            <h1 className="title">Comming Soon</h1>
            <div>
              {tasks.map((t) => {
                const [taskObj] = t.task;
                return <Task taskObj={taskObj} key={Task.title} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
//"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
