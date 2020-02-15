import {
  GET_ITEM,
  GET_ITEMS,
  ITEM_LOADING,
  DELETE_ITEM
} from '../actions/types';

const initialState = {
  item: null,
  items: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ITEM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ITEM:
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    case GET_ITEMS:
      return {
        ...state,
        requests: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
}
