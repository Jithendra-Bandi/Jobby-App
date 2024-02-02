import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'

const display = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ItemDetails extends Component {
  state = {data: {}, showCase: display.loading}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({showCase: display.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        jobDetails: {
          title: data.job_details.title,
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(each => ({
            imageUrl: each.image_url,
            name: each.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
        },
        similarJobs: data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.setState({data: updatedData, showCase: display.success})
    } else {
      this.setState({showCase: display.failure})
    }
  }

  displaySelection = () => {
    const {showCase} = this.state
    switch (showCase) {
      case display.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case display.failure:
        return this.failure()
      case display.success:
        return this.successDisplay()
      default:
        return null
    }
  }

  successDisplay = () => {
    const {data} = this.state
    const {jobDetails} = data
    return (
      <div className="column">
        <div className="item-container success-container">
          <div className="row">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="item-logo"
            />
            <div className="item-title">
              <h1 className="head-small">{jobDetails.title}</h1>
              <div className="row">
                <FaStar className="star-icon" />
                <p>{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="between">
            <div className="row">
              <MdLocationOn className="align-self" />
              <p className="align-self">{jobDetails.location}</p>
              <BsBriefcaseFill className="align-self" />
              <p className="align-self">{jobDetails.employmentType}</p>
            </div>
            <p className="head-small">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <div className="between">
            <h1 className="head-small">Description</h1>
            <button type="button" className="visit-button">
              <a
                className="anchor"
                href={jobDetails.companyWebsiteUrl}
                target="_main"
              >
                Visit
              </a>
              <FaExternalLinkAlt className="link-icon" />
            </button>
          </div>
          <p>{jobDetails.jobDescription}</p>
          <h1 className="head-small">Skills</h1>
          <ul className="wrap padding-zero">
            {jobDetails.skills.map(each => (
              <li className="skills-li" key={each.name}>
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skills-logo"
                />
                <p className="white">{each.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-div">
            <h1 className="head-small">Life at Company</h1>
            <div className="life-content-div">
              <p className="para-life">
                {jobDetails.lifeAtCompany.description}
              </p>
              <img
                src={jobDetails.lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>
        </div>
        <div className="similar">
          <h1 className="head-small align-left gap">Similar Jobs</h1>
          <ul className="similar-ul padding-zero">
            {data.similarJobs.map(each => (
              <li className="similar-li" key={each.id}>
                <div className="row">
                  <img
                    src={each.companyLogoUrl}
                    alt="similar job company logo"
                    className="similar-image"
                  />
                  <div className="item-title">
                    <h1 className="head-small">{each.title}</h1>
                    <div className="row">
                      <FaStar className="star-icon" />
                      <p>{each.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="head-small">Description</h1>
                <p>{each.jobDescription}</p>
                <div className="row">
                  <MdLocationOn className="align-self" />
                  <p>{each.location}</p>
                  <BsBriefcaseFill className="align-self" />
                  <p>{each.employmentType}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  failure = () => (
    <div className="failure-container">
      <div className="failure-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="white">Oops! Something Went Wrong</h1>
        <p className="light-color-para align-center">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={this.getDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    return (
      <div className="details-container">
        <Header />
        <div className="details-div">{this.displaySelection()}</div>
      </div>
    )
  }
}

export default ItemDetails
