import './add-new-task.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
// import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



const New = () => {
  const { token } = useSelector(state => state.auth)
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    title: '',
    description: '',
    assignedDate: '',
    deadline: ''
  });
  const { employeeId } = useParams()

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    axios
      .post(`http://api.furniturelelo.com/api/employee/${employeeId}/addTask`, { ...user, assigndate: user.assignedDate }, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      .then((res) => navigate(`/employees/${employeeId}`))
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message.errors);
        setError(err.message);
      });
  };
  console.log(user);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Task</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  required
                  value={user.title}
                />
              </div>
              <div className="formInput">
                <label>Deascription</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  required
                  value={user.description}
                >
                </textarea>
              </div>
              <div className="formInput">
                <label>Assigned Date</label>
                <input
                  type="date"
                  name='assignedDate'
                  onChange={handleChange}
                  required
                  value={user.assignedDate}
                />
              </div>
              <div className="formInput">
                <label>Deadline</label>
                <input
                  type="date"
                  name='deadline'
                  onChange={handleChange}
                  required
                  value={user.deadline}
                />
              </div>
              <br />
              <button>Save</button>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
