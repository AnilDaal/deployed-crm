import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Table from '../../components/table/Table';
import './employee.scss';
const EmployeePage = () => {
  return (
    <div className="home">
      <Sidebar />

      <div className="home-container">
        <Navbar />
        <div className="addNew">
          <Link to="/employees/new">
            <button>Add New</button>
          </Link>
        </div>
        <Table />
      </div>
    </div>
  );
};

export default EmployeePage;
