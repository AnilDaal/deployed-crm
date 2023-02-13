import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Table from '../../components/table/Table';

import ProjectTable from './ProjectTable';
const EmployeePage = () => {
  return (
    <div className="home">
      <Sidebar />

      <div className="home-container">
        <Navbar />
        <div className="addNew">
          <Link to="/">
            <button>Add New</button>
          </Link>
        </div>
        <ProjectTable />
      </div>
    </div>
  );
};

export default EmployeePage;