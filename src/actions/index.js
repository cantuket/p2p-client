import axios from 'axios'
import {
  UNAUTH_USER,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  CREATE_LISTING,
  FETCH_LISTINGS,
  FETCH_LISTING
} from './types'
// const ROOT_URL = 'http://104.198.77.63:3090'
const ROOT_URL = 'http://localhost:3090'

export function signinUser({email, password}) {
  return function (dispatch) {
    const request = axios.post(`${ROOT_URL}/signin`, {email, password})
    request.then(response => {
      localStorage.setItem('token', response.data.token)
      dispatch({type: AUTH_USER})
    }).catch(() => {
      dispatch(authError('bad login info'))
    })
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return {type: UNAUTH_USER}
}

export function signupUser({email, password, passwordConfirmation}) {
  return function (dispatch) {
    axios
      .post(`${ROOT_URL}/signup`, {email, password, passwordConfirmation})
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
  return {type: AUTH_ERROR, payload: error}
}

export function fetchMessage() {
  return function (dispatch) {
    axios
      .get(ROOT_URL, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        dispatch({type: FETCH_MESSAGE, payload: response.data.message})
      })
  }
}

export const createListing = (values, history) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/api/create-listing`, values, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  history.push('/listings');
  dispatch({type: CREATE_LISTING, payload: res.data});
}

export const fetchListings = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/api/listings`, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  dispatch({type: FETCH_LISTINGS, payload: res.data});
}


export const fetchAllListings = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/api/all-listings`, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });
  dispatch({type: FETCH_LISTINGS, payload: res.data});
}


export const fetchSingleListing = (listingId) => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/api/listing/${listingId}`, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  dispatch({type: FETCH_LISTING, payload: res.data});
}

export const updateListing = (values) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/api/update-listing`, values, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  dispatch({type: FETCH_LISTING, payload: res.data});
}

export const addItem = (values, listingId) => async dispatch => {

  const res = await axios.post(`${ROOT_URL}/api/add-item`, {
    values,
    listingId: listingId
  }, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  dispatch({type: FETCH_LISTING, payload: res.data});
}

export const deleteItem = (itemId, listingId) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/api/delete-item`, {
    itemId: itemId,
    listingId: listingId
  }, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  dispatch({type: FETCH_LISTING, payload: res.data});
}

export const deleteListing = (listingId, history) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/api/delete-listing`, {
    listingId: listingId
  }, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });
  history.push('/listings');
  dispatch({type: FETCH_LISTING, payload: res.data});
}

export const updateItem = (imageData, image, values, itemId, listingId) => async dispatch => {
  console.log(values);
  let data = {};
  if (imageData !== null) {
    data = {
      imageData,
      imageName:image.name,
      imagetype:image.type,
      values,
      itemId,
      listingId
    }
  } else {
    data = {
      values,
      itemId,
      listingId
    }
  }
  const res = await axios.post(`${ROOT_URL}/api/update-item`, data, {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  dispatch({type: FETCH_LISTING, payload: res.data});
}




  // var image = new FormData();
  // image.append('fname', 'test.jpg');
  // image.append('data', values.uploadfile);
 
  // function dataURLtoBlob(dataurl) {
  //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  //     while(n--){
  //         u8arr[n] = bstr.charCodeAt(n);
  //     }
  //     return new Blob([u8arr], {type:mime});
  // }
  // var blob = dataURLtoBlob(image);