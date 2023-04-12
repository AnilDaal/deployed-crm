import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const New = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { employeeId } = useParams();
  console.log(employeeId);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    country: "",
    address: "",
    password: "",
  });

  const loadUserData = useCallback(() => {
    axios
      .get(`https://api.pacifencesolutions.com/api/employee/${employeeId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => alert(err.message));
  }, [token, employeeId]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    axios
      .patch(
        `https://api.pacifencesolutions.com/api/employee/${employeeId}`,
        { ...user },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => navigate(`/employees/${employeeId}`))
      .catch((err) => alert(err.message));
  };
  const [error, setError] = useState(null);

  const countryOptions = [
    {
      label: "India",
      value: "India",
    },
    {
      label: "USA",
      value: "USA",
    },
    {
      label: "UK",
      value: "UK",
    },
    {
      label: "Dubai",
      value: "Dubai",
    },
    {
      label: "Germany",
      value: "Germany",
    },
  ];

  const roleOptions = [
    { value: "Sales" },
    { value: "Operation" },
    { value: "Account" },
  ];

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(user);
  //   axios
  //     .post('http://localhost:5000/employee', { ...user })
  //     .then((res) => navigate('/employee'))
  //     .catch((err) => {
  //       console.log(err.response.data.message.errors);
  //       setError(err.message);
  //     });
  // };
  // console.log(user);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Employee</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="john doe"
                  name="name"
                  onChange={handleChange}
                  required
                  value={user.name}
                  minLength={3}
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
                  required
                  minLength={6}
                />
              </div>
              <div className="formInput">
                <label>Country</label>
                <select
                  id="favColor"
                  value={user.country}
                  onChange={handleChange}
                  name="country"
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
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
