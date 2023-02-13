import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


import EmployeePage from "./pages/employee-page/EmployeePage";
import Single from './pages/single/Single'
import New from './pages/new/New'
import Edit from './pages/edit/Edit'
import Dashboard from './pages/dashboard/Dashboard'
import AdminLogin from './auth/login/AdminLogin'
import EmployeeLogin from './auth/login/EmployeeLogin'
import AddNewTask from './components/task-management/AddNewTask'
import CompanyPage from "./pages/company-page/CompanyPage";
import CustomerPage from './pages/customer-page/CustomerPage'
import NewCustomer from './pages/customer-page/NewCustomer'
import EditCustomer from './pages/customer-page/EditCustomer'
import SingleCustomer from './pages/single/SingleCustomer'
import ProjectPage from './pages/project-page/ProjectPage'
function App() {
  const { isLoggedIn, isAdmin } = useSelector(state => state.auth)
  console.log(isAdmin)
  // const isAdmin = false
  // const [localToken, setLocalToken] = useState(JSON.parse(localStorage.getItem('user')))

  // useEffect(() => {
  //   if (localToken) {

  //   }
  // }, [localToken])

  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>
        <Route path='/' element={!isLoggedIn ? <CompanyPage /> : <Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to='/' />} />
        <Route path='/admin-login' element={!isLoggedIn ? <AdminLogin /> : <Navigate to='/dashboard' />} />
        <Route path='/employee-login' element={!isLoggedIn ? <EmployeeLogin /> : <Navigate to='/dashboard' />} />
        <Route path='/projects' element={isLoggedIn ? <ProjectPage />:<Navigate to='/'/>} />

        <Route path='/customers'>
          <Route index element={isLoggedIn ? <CustomerPage /> : <Navigate to='/' />} />
          <Route path=':customerId' element={isLoggedIn ? <SingleCustomer /> : <Navigate to='/' />} />
          <Route path='new' element={isLoggedIn ? <NewCustomer /> : <Navigate to='/' />} />
          <Route path='edit/:customerId' element={isLoggedIn ? <EditCustomer /> : <Navigate to='/' />} />
        </Route>

        <Route path='/employees'>
          <Route index element={isLoggedIn ? <EmployeePage /> : <Navigate to='/' />} />
          <Route path=':employeeId' element={isLoggedIn ? <Single /> : <Navigate to='/' />} />
          <Route path='new' element={isLoggedIn ? <New /> : <Navigate to='/' />} />
          <Route path='edit/:employeeId' element={isLoggedIn ? <Edit /> : <Navigate to='/' />} />
          <Route path=':employeeId/new-task' element={isLoggedIn ? <AddNewTask /> : <Navigate to='/' />} />
        </Route>
      </Routes>
      {/* 
      {!isAdmin &&
        <Routes>
          <Route path='/' element={!isLoggedIn ? <CompanyPage /> : <Navigate to='/dashboard' />} />
          <Route path='/admin-login' element={!isLoggedIn ? <AdminLogin /> : <Navigate to='/dashboard' />} />
          <Route path='/employee-login' element={!isLoggedIn ? <EmployeeLogin /> : <Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to='/' />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      } */}


    </BrowserRouter>

  );
}

export default App;
