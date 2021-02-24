import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup, Home, AllQuizzes } from './components'
import { me } from './store'

// Defines routes to allow for single page app traversal
class Routes extends Component {
  componentDidMount() {
    this.props.init()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={ Home } />
            <Route path="/community-quizzes" component={ AllQuizzes } />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={ Login } />
            <Route path="/signup" component={ Signup } />
          </Switch>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    init() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
