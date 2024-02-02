import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

const Header = props => {
  const {history} = props
  const logoutIcon = () => <FiLogOut className="sm-icons" />
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav>
      <Link to="/" className="align-center link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <div className="nav-sm-icons">
        <Link to="/" className="link">
          <li className="list-style">
            <AiFillHome className="sm-icons" />
          </li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="list-style">
            <BsBriefcaseFill className="sm-icons" />
          </li>
        </Link>
        <li className="list-style">
          <button type="button" className="logout-sm-button" onClick={onLogout}>
            {logoutIcon()}
          </button>
        </li>
      </div>
      <ul className="lg-icons-ul">
        <Link to="/" className="link">
          <li className="lg-icons-li">Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="lg-icons-li">Jobs</li>
        </Link>
      </ul>
      <li className="lg-icons-li">
        <button type="button" className="logout-lg-button" onClick={onLogout}>
          Logout
        </button>
      </li>
    </nav>
  )
}

export default withRouter(Header)
