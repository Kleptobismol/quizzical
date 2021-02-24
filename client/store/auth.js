import axios from 'axios'
import history from '../history'

//  -----------
// | CONSTANTS |
//  -----------
const storage = () => window.localStorage
const TOKEN = 'token'

// Action names
const SET_AUTH = 'SET_AUTH'

//  ---------
// | ACTIONS |
//  ---------
const setAuth = auth => ({type: SET_AUTH, auth})

//  -------- 
// | THUNKS |
//  -------- 

// Fetches existing user data
export const me = () => async dispatch => {
  const token = storage().getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

// Handles login authentication and fetches user data
export const authenticate = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    storage().setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

// Handles logout
export const logout = () => {
  storage().removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

//  ---------
// | REDUCER |
//  ---------
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
