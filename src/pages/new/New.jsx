import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
// import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const New = () => {
  const { token } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Sales',
    phone: '',
    country: 'India',
    address: '',
  });

  const countryOptions = [
    {
      label: 'India',
      value: 'India',
    },
    {
      label: 'USA',
      value: 'USA',
    },
    {
      label: 'UK',
      value: 'UK',
    },
    {
      label: 'Dubai',
      value: 'Dubai',
    },
    {
      label: 'Germany',
      value: 'Germany',
    },
  ];

  const roleOptions = [
    { value: 'Sales' },
    { value: 'Operation' },
    { value: 'Account' },
  ];

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    axios
      .post(
        'http://api.furniturelelo.com/api/employee',
        { ...user },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => navigate('/employees'))
      .catch((err) => {
        console.log(err.response.data.message);

        setError(err.response.data.message);
      });
  };
  console.log(user);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Employee</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Name and surname</label>
                <input
                  type="text"
                  placeholder="john doe"
                  name="name"
                  onChange={handleChange}
                  required
                  value={user.name}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  name="email"
                  onChange={handleChange}
                  required
                  value={user.email}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                />
              </div>
              <div className="formInput">
                <label>Country</label>
                <select
                  id="favColor"
                  value={user.country}
                  onChange={handleChange}
                  name="country"
                  required
                >
                  {countryOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  required
                  type="text"
                  placeholder="Elton st. 216 NewYork"
                  name="address"
                  onChange={handleChange}
                  value={user.address}
                />
              </div>
              <div className="formInput">
                <label>Phone No.</label>
                <input
                  required
                  type="text"
                  placeholder="9784823451"
                  name="phone"
                  onChange={handleChange}
                  value={user.phone}
                />
              </div>

              {/* <div className="formInput">
                <label>Status</label>
                <input
                  required
                  type="text"
                  placeholder="Pending..."
                  name="role"
                  onChange={handleChange}
                  value={user.role}
                />
              </div> */}

              <div className="formInput">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={user.role}
                  onChange={handleChange}
                  name="role"
                  required
                >
                  {roleOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="formInput">
                <label>Light Yagami</label>
                <input
                  required
                  type="text"
                  placeholder="Light Yagami"
                  // name="status"
                  // onChange={handleChange}
                  // value={user.status}
                />
              </div> */}

              <br />
              <button>Save</button>
              {error && <div className="error">error</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
