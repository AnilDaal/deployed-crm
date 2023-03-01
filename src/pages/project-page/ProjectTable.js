import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const categories = [
  { value: "All" },
  { value: "Sales" },
  { value: "Operation" },
  { value: "Account" },
];

const ProjectTable = () => {
  const { token } = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    country: "",
    category: "All",
  });
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(
        "http://api.pacifencesolutions.com/api/employee/1/getTask",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      const sortDataTask = data.map((t) => {
        const [x] = t.comming;
        return x;
      });
      setTasks(sortDataTask);
    };
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    console.log(projectData);
    console.log(user);
  };
  const filteredDataByTitle = tasks.filter((emp) => {
    return emp.title.toLocaleLowerCase().includes(user.name.toLowerCase());

    // emp.title.toLowerCase().includes(user.title.toLowerCase())
  });

  const filteredDataByCategory = filteredDataByTitle.filter((p) => {
    console.log(p);
    if (user.category === "All") return true;
    if (p.category === user.category) return true;
    // return user.category === 'All'
    // if (p.category === 'All') return true
    // else if (p.category === user.category) return true
  });
  console.log(filteredDataByCategory);
  console.log(filteredDataByTitle);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="input-row">
            <TableCell className="tableCell x">
              <label
                htmlFor="name-filter"
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
                id="name-filter"
                type="text"
                onChange={handleChange}
                name="name"
                value={user.name}
              />
            </TableCell>
            <TableCell className="tableCell x">
              <label
                htmlFor="category"
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Filter via category
              </label>
              {/* <input id='filter' type="text" onChange={handleChange} name='name' value={user.name} /> */}
              <select
                id="category"
                value={user.category}
                onChange={handleChange}
                name="category"
                required
              >
                {categories.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableHead>
          <TableRow>
            {/* <TableCell className="tableCell x">ID</TableCell> */}
            <TableCell className="tableCell x">Title</TableCell>
            <TableCell className="tableCell x">Description</TableCell>
            <TableCell className="tableCell x">Category</TableCell>
            {/* <TableCell className="tableCell">Age</TableCell> */}
            <TableCell className="tableCell x">AssignedTo</TableCell>
            {/* <TableCell className="tableCell x">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDataByCategory.map((row) => {
            return (
              <TableRow key={row._id}>
                {/* <TableCell className="tableCell">{row._id}</TableCell> */}
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {/* <img src={row.img} alt="" className="image" /> */}
                    {row.title}
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  {row.description.substring(0, 20)}...
                </TableCell>
                <TableCell className="tableCell">{row.category}</TableCell>

                <TableCell className="tableCell">{row.username}</TableCell>
                <TableCell className="tableCell">
                  <Link to={`/employees/${row.employeeId}`}>
                    <button className="view">View</button>
                  </Link>
                  {/* <button onClick={() => handleDelete(row._id)} className='delete'>Delete</button> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
