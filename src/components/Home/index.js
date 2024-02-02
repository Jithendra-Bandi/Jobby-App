import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const findJobsButton = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Find The Job That Fits Your Life</h1>
        <p className="light-color-para">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="clear-link-decoration">
          <button
            type="button"
            className="home-button"
            onClick={findJobsButton}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
