import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

// Displays both Login and Signup pages
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        { name === 'signup' ? 
          <div>
            <label htmlFor="name">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div> :
          null
        }
        { name === 'signup' ? 
          <div>
            <label htmlFor="name">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div> :
          null
        }
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName ? evt.target.firstName.value : null
      const lastName = evt.target.lastName ? evt.target.lastName.value : null
      dispatch(authenticate(email, password, firstName, lastName, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
