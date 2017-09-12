import {
  FETCH_LISTINGS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_LISTINGS:
      return action.payload;
    default:
  }

  return state;
}
