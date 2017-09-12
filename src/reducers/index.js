import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer from './auth_reducer'
import listingReducer from './listing_reducer'
import listingsReducer from './listings_reducer'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  listings: listingsReducer,
  listing: listingReducer
})

export default rootReducer
