import "./company-page.scss"
import { Link } from 'react-router-dom'

const CompanyPage = () => {
  return (
    <div className="front-page">
      <div className='left'>
        <img src="https://pacifencesolutions.com/wp-content/uploads/2021/11/300x300-px.png" alt="" />
      </div>
      <div className='right'>
        <h1>Welcome to <span>Pacifence Solutions</span></h1>
        <h4>Login to CRM</h4>
        <div>
          <Link to='/admin-login'><button>Admin</button></Link>
          <Link to='/employee-login'><button>Employee</button></Link>
        </div>
      </div>
    </div>
  )
}

export default CompanyPage