import './index.css'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {data} = props
  return (
    <Link className="link" to={`jobs/${data.id}`}>
      <li className="item-container">
        <div className="row">
          <img
            src={data.companyLogoUrl}
            alt="company logo"
            className="item-logo"
          />
          <div className="item-title">
            <h1 className="head-small">{data.title}</h1>
            <div className="row">
              <FaStar className="star-icon" />
              <p>{data.rating}</p>
            </div>
          </div>
        </div>
        <div className="between">
          <div className="row">
            <MdLocationOn className="align-self" />
            <p>{data.location}</p>
            <BsBriefcaseFill className="align-self" />
            <p>{data.employmentType}</p>
          </div>
          <h1 className="head-small">{data.packagePerAnnum}</h1>
        </div>
        <hr className="hr" />
        <h1 className="head-small">Description</h1>
        <p>{data.jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
