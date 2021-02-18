import axios from 'axios'
import history from '../history'

const storage = () => window.localStorage
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
// just trying to imitate stuff
const SET_GUEST = 'SET_GUEST'


/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
// just trying to imitate stuff
const setGuest = auth => ({type: SET_GUEST, auth})

/**
 * THUNK CREATORS
 */
// what are you
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

// probably don't need this becuase can just use is loggin is false 
export const guestUser = (guest) => async dispatch => {
  // console.log('in guest User Thunk');
  // console.log(guest);
//   return async(dispatch) => {
    
//     dispatch(setGuest(guest));
// }
  
}

export const logout = () => {
  storage().removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
