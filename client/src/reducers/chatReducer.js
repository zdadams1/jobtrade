import { GET_CHAT, CHAT_LOADING } from '../actions/types';

const initialState = {
  chat: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHAT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CHAT:
      return {
        ...state,
        chat: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
