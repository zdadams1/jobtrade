import {
  ADD_JOBITEM,
  GET_JOBS,
  GET_JOB,
  DELETE_JOB,
  JOB_LOADING
} from '../actions/types';

const initialState = {
  jobitems: [],
  jobitem: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case JOB_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_JOBS:
      return {
        ...state,
        jobitems: action.payload,
        loading: false
      };
    case GET_JOB:
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
    case DELETE_JOB:
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
