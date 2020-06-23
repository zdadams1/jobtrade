import axios from 'axios';

import { GET_ERRORS, GET_CHAT, CHAT_LOADING } from './types';

export const addUserToChat = locData => dispatch => {
  axios
    .post('/api/chat', locData)

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get profile by handle
export const getChatByName = locname => dispatch => {
  dispatch(setChatLoading());
  console.log('hit', locname);
  axios
    .get(`/api/chat/${locname}`)
    .then(res =>
      dispatch({
        type: GET_CHAT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Add message to chat
export const addMessageToChat = msgData => dispatch => {
  axios
    .post(`/api/chat/${msgData.locname}`, msgData)
    .then(res =>
      dispatch({
        type: GET_CHAT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Profile loading
export const setChatLoading = () => {
  return {
    type: CHAT_LOADING
  };
};
