import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {showError: false, errorMessage: '', username: '', password: ''}

  loginClicked = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else this.setState({showError: true, errorMessage: data.error_msg})
  }

  usernameChange = event => this.setState({username: event.target.value})

  passwordChange = event => this.setState({password: event.target.value})

  render() {
    if (Cookies.get('jwt_token') !== undefined) return <Redirect to="/" />
    const {showError, errorMessage, username, password} = this.state
    return (
      <div className="login-container">
        <form onSubmit={this.loginClicked} className="login-form">
          <div className="login-logo-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo"
            />
          </div>
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={this.usernameChange}
            id="username"
          />
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="input"
            onChange={this.passwordChange}
            id="password"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="error-msg">{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default Login
