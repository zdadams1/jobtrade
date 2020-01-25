import {
  ADD_JOBITEM,
  GET_JOBITEMS,
  GET_JOBITEM,
  DELETE_JOBITEM,
  JOBITEM_LOADING
} from '../actions/types';

const initialState = {
  jobitems: [],
  jobitem: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case JOBITEM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_JOBITEMS:
      return {
        ...state,
        jobitems: action.payload,
        loading: false
      };
    case GET_JOBITEM:
      return {
        ...state,
        jobitem: action.payload,
        loading: false
      };
    case ADD_JOBITEM:
      return {
        ...state,
        jobitems: [action.payload, ...state.jobitems]
      };
    case DELETE_JOBITEM:
      return {
        ...state,
        jobitems: state.jobitems.filter(
          jobitem => jobitem._id !== action.payload
        )
      };
    default:
      return state;
  }
}
