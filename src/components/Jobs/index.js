import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'
import TypeLi from '../TypeLi'
import SalaryLi from '../SalaryLi'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const display = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    profileLoading: display.loading,
    jobListLoading: display.loading,
    jobs: [],
    profileDetails: '',
    type: [],
    salary: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobListLoading: display.loading})
    const {type, salary, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type.join(
      ',',
    )}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobs: updatedData, jobListLoading: display.success})
    } else {
      this.setState({jobListLoading: display.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileLoading: display.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
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
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileLoading: display.success,
      })
    } else {
      this.setState({profileLoading: display.failure})
    }
  }

  searchKeyDown = event => {
    if (event.key === 'Enter') this.getJobs()
  }

  searchIcon = () => <FaSearch className="search-icon" />

  searchChange = event => this.setState({searchInput: event.target.value})

  typeChange = (value, isChecked) => {
    const {type} = this.state
    if (isChecked) {
      const updated = [...type, value]
      this.setState({type: updated}, this.getJobs)
    } else {
      const removed = type.filter(each => each !== value)
      this.setState({type: removed}, this.getJobs)
    }
  }

  results = () => {
    const {jobs} = this.state
    return jobs.map(each => <JobItem key={each.id} data={each} />)
  }

  noPosts = () => (
    <div className="no-posts-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-posts-image"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  showJobs = () => {
    const {jobs} = this.state
    if (jobs.length === 0) return <ul>{this.noPosts()}</ul>
    return this.results()
  }

  salaryChange = value => this.setState({salary: value}, this.getJobs)

  profileDisplay = () => {
    const {profileLoading, profileDetails} = this.state
    switch (profileLoading) {
      case display.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case display.success:
        return (
          <div className="profile-div">
            <img
              src={profileDetails.profileImageUrl}
              alt="profile"
              className="profile-image"
            />
            <h1 className="profile-name">{profileDetails.name}</h1>
            <p>{profileDetails.shortBio}</p>
          </div>
        )
      case display.failure:
        return (
          <div className="center-el">
            <button
              type="button"
              className="home-button"
              onClick={this.getProfileDetails}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  jobsDisplay = () => {
    const {jobListLoading} = this.state
    switch (jobListLoading) {
      case display.success:
        return this.showJobs()
      case display.failure:
        return (
          <div className="no-posts-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="no-posts-image"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for.</p>
            <button
              type="button"
              className="home-button"
              onClick={this.getJobs}
            >
              Retry
            </button>
          </div>
        )
      case display.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-div">
          <div className="left-div">
            <div className="search-div left-search">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.searchChange}
                onKeyDown={this.searchKeyDown}
              />
              <div className="search-icon-div">
                <button
                  type="button"
                  data-testid="searchButton"
                  className="clear-button"
                  onClick={this.getJobs}
                >
                  {this.searchIcon()}
                </button>
              </div>
            </div>
            {this.profileDisplay()}
            <hr className="hr" />
            <div className="type-div">
              <h1>Type of Employment</h1>
              <ul className="type-ul padding-zero">
                {employmentTypesList.map(each => (
                  <TypeLi
                    key={each.employmentTypeId}
                    each={each}
                    typeChange={this.typeChange}
                  />
                ))}
              </ul>
            </div>
            <hr className="hr" />
            <div className="type-div">
              <h1>Salary Range</h1>
              <ul className="type-ul padding-zero">
                {salaryRangesList.map(each => (
                  <SalaryLi
                    key={each.salaryRangeId}
                    each={each}
                    salaryChange={this.salaryChange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="right-div">
            <div className="search-div right-search">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.searchChange}
                onKeyDown={this.searchKeyDown}
              />
              <div className="search-icon-div">
                <button
                  type="button"
                  className="clear-button"
                  onClick={this.getJobs}
                  data-testid="searchButton"
                >
                  {this.searchIcon()}
                </button>
              </div>
            </div>
            <ul className="padding-zero">{this.jobsDisplay()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
