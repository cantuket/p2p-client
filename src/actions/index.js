import axios from 'axios'
import { UNAUTH_USER,
         AUTH_USER,
         AUTH_ERROR,
         FETCH_MESSAGE,
         CREATE_LISTING,
         FETCH_LISTINGS,
         FETCH_LISTING 
} from './types'
const ROOT_URL = 'http://104.198.77.63:3090'
// const ROOT_URL = 'http://localhost:3090'

export function signinUser({email, password}) {

  return function (dispatch) {

    // submit email and password to server
    const request = axios.post(`${ROOT_URL}/signin`, {email, password})
    request
      .then(response => {
        // -Save the JWT token
       //localStorage.setItem('email',response.data.email)
        localStorage.setItem('token', response.data.token)
        // -if request is good, we need to update state to indicate user is authenticated
        dispatch({type: AUTH_USER})
      })
      // If request is bad...
      // -Show an error to the user
      .catch(() => {
        dispatch(authError('bad login info'))
      })

  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return {
    type: UNAUTH_USER
  }
}

export function signupUser({email, password, passwordConfirmation}) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password, passwordConfirmation})
      .then(response => {
        dispatch({type: AUTH_USER})
        localStorage.setItem('token', response.data.token)
      })
      .catch(({response}) => {
        dispatch(authError(response.data.error))
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}

export const createListing = (values, history) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/api/create-listing`, 
      values, 
      { headers: { authorization: localStorage.getItem('token')}});
  
  history.push('/listings');  
  dispatch({type: CREATE_LISTING,payload: res.data});
}

export const fetchListings = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/api/listings`,
   { headers: { authorization: localStorage.getItem('token')}});

  dispatch({type: FETCH_LISTINGS, payload: res.data});
}

export const fetchSingleListing = (listingId) => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/api/listing/${listingId}`,
   { headers: { authorization: localStorage.getItem('token')}});

   dispatch({type: FETCH_LISTING, payload: res.data});
}

export const updateListing = (values) => async dispatch => {  
  
  console.log(values);

  const res = await axios.post(`${ROOT_URL}/api/update-listing`, 
      values, 
      { headers: { authorization: localStorage.getItem('token')}});

  dispatch({type: FETCH_LISTING,payload: res.data});
}


export const addItem = (values, listingId) => async dispatch => {  
  
  const res = await axios.post(`${ROOT_URL}/api/add-item`, 
      {values, listingId:listingId},
      { headers: { authorization: localStorage.getItem('token')}});

  dispatch({type: FETCH_LISTING,payload: res.data});
}
