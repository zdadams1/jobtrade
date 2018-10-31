import {
  ADD_GROUP,
  GET_GROUPS,
  GET_GROUP,
  DELETE_GROUP,
  GROUP_LOADING
} from "../actions/types";

const initialState = {
  groups: [],
  group: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GROUP_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        loading: false
      };
    case GET_GROUP:
      return {
        ...state,
        group: action.payload,
        loading: false
      };
    case ADD_GROUP:
      return {
        ...state,
        groups: [action.payload, ...state.groups]
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group._id !== action.payload)
      };
    default:
      return state;
  }
}
