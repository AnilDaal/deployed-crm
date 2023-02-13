import { DeliveryDining, HealthAndSafety, LogoDevSharp, Logout, MoneyOffCsredRounded, NotificationAdd, PrecisionManufacturingOutlined, ProductionQuantityLimits, SatelliteAltSharp, SettingsAccessibility, SupervisedUserCircleOutlined } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import "./sidebar.scss"
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store';
const Sidebar = () => {
  const dispatch = useDispatch()
  const logoutHandler = () => {

    dispatch(logout())
  }
  return (
    <div className='sidebar'>
      <div className='top'>
        <span className='logo'>light-admin</span>
      </div>

      <hr />
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <NavLink to='/dashboard' className='nav-container'>
            <DashboardIcon />
            <span>Dashboard</span>

          </NavLink>
          <p className='title'>LISTS</p>
          <NavLink to='/employees' className={({ isActive }) => (isActive ? 'active nav-container' : 'inactive nav-container')}>  <ProductionQuantityLimits /><span>Employees</span></NavLink>
          <NavLink to='/customers' className={({ isActive }) => (isActive ? 'active nav-container' : 'inactive nav-container')}> <SupervisedUserCircleOutlined /><span>Customers</span></NavLink>
          <NavLink to='/projects' className={({ isActive }) => (isActive ? 'active nav-container' : 'inactive nav-container')}><MoneyOffCsredRounded /><span>Projects</span></NavLink>
          {/* <li><DeliveryDining /><span>Delivery</span></li>
          <p className='title'>SERVICE</p><li><SatelliteAltSharp /><span>Stats</span></li>
          <li><NotificationAdd /><span>Notifications</span></li>
          <li><HealthAndSafety /><span>System Health</span></li>
          <p className='title'>YAGAMI</p>
          <li><LogoDevSharp /><span>Logs</span></li>
          <li><SettingsAccessibility /><span>Settings</span></li>
          <p className='title'>USER</p><li><PrecisionManufacturingOutlined /><span>Profile</span></li> */}

          <button onClick={logoutHandler} className='logout'>Logout</button>
        </ul>
      </div>
      {/* <div className='bottom'>color mode themes</div> */}
    </div>
  )
}

export default Sidebar