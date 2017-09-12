import {
  CREATE_LISTING,
  FETCH_LISTING
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case CREATE_LISTING:
      return { ...state };
    case FETCH_LISTING:
      return {...state, listing:action.payload};
    default:
  }

  return state;
}
