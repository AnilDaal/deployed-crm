import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const CustomerTable = () => {
  const { token } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    status: "Pending",
    country: "",
    address: "",
  });
  const [employeeData, setEmployeeData] = useState([]);

  const fetchData = useCallback(async () => {
    // const { token } = JSON.parse(localStorage.getItem('user'))
    // console.log(token)

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NlMzc2NWI4OGVkODM1YmFhOTk1MjAiLCJpYXQiOjE2NzQ0NTg5ODEsImV4cCI6MTY3NDcxODE4MX0.F1RlkqHpxfbHhLIEM3MFuPWOqxJQTCXQFSHwfBHuD6g'
    try {
      const { data } = await axios.get(
        "http://api.pacifencesolutions.com/api/customer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('i ran by delete handler')
      console.log(data);
      if (data) {
        setEmployeeData(data);
      }
      console.log("Data is :", data);
    } catch (err) {
      console.log("error is in the house ", err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    axios
      .delete(
        `http://api.pacifencesolutions.com/api/customer/${id.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => fetchData())
      .catch((err) => alert(err.message));

    // await axios.delete(`http://host:5000/employee/${id}`)

    // setEmployeeData([])
    // await fetchData()

    // axios.delete(`http://localhost:5000/employee/${id.toString()}`)
    //   .then((res) => fetchData())
    //   .catch(err => console.log(err))
    // console.log(id)
    // try {
    //   const { data } = await axios.delete(`http://localhost:5000/employee/${id}`)
    //   const filteredData = employeeData.filter(d => d._id !== data._id)
    //   setEmployeeData(filteredData)
    //   console.log(employeeData)
    // } catch (err) {
    //   console.log(err)
    // }
  };
  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    console.log(employeeData);
    console.log(user);
  };
  const filteredData = employeeData.filter((emp) =>
    emp.name.toLowerCase().includes(user.name.toLowerCase())
  );

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell x">
              <label
                htmlFor="filter"
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Filter via name
              </label>
              <input
                id="filter"
                type="text"
                onChange={handleChange}
                name="name"
                value={user.name}
              />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableHead>
          <TableRow>
            {/* <TableCell className="tableCell x">ID</TableCell> */}
            <TableCell className="tableCell x">Employee Name</TableCell>
            <TableCell className="tableCell x">Email</TableCell>
            <TableCell className="tableCell x">Status</TableCell>
            {/* <TableCell className="tableCell">Age</TableCell> */}
            <TableCell className="tableCell x">Country</TableCell>
            <TableCell className="tableCell x">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => {
            return (
              <TableRow key={row._id}>
                {/* <TableCell className="tableCell">{row._id}</TableCell> */}
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {/* <img src={row.img} alt="" className="image" /> */}
                    {row.name}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                <TableCell className={`tableCell `}>
                  <div className={`status ${row.status}`}>{row.status}</div>
                </TableCell>

                <TableCell className="tableCell">{row.country}</TableCell>
                <TableCell className="tableCell">
                  <Link to={`/customers/${row._id}`}>
                    <button className="view">View</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(row._id)}
                    className="delete"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
