import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'


// Displays Navbar
const Navbar = ({handleClick, isLoggedIn}) => (
  <div className='text-center'>
    {isLoggedIn ? (
      <div className='nav nav-tabs justify-content-around navbar-custom'>
        {/* The navbar will show these links after you log in */}
        <h1> Quizzical </h1>
        <Link className='nav-link nav-link-custom' to="/home">Home</Link>
        <Link className='nav-link nav-link-custom' to="/quizzes/create">Create Quiz</Link>
        <Link className='nav-link nav-link-custom' to='/quizzes/community'>Community Quizzes</Link>
        <Link className='nav-link nav-link-custom' to='/quizzes/taken'>Taken Quizzes</Link>
        <a className='nav-link nav-link-custom' href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    ) : (
      <div className='nav nav-tabs justify-content-around'>
        {/* The navbar will show these links before you log in */}
        <h1> Quizzical </h1>
        <Link className='nav-link nav-link-custom' to="/login">Login</Link>
        <Link className='nav-link nav-link-custom' to="/signup">Sign Up</Link>
      </div>
    )}
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
