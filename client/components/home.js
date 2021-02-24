import React from 'react'
import {connect} from 'react-redux'

// Displays Home page
export const Home = props => {
  const firstName = props.auth.firstName
  const lastName = props.auth.lastName

  return (
    <div>
      <h3>Welcome, { firstName ? firstName : 'New User' } { lastName ? lastName : null }</h3>
    </div>
  )
}

const mapState = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapState)(Home)
