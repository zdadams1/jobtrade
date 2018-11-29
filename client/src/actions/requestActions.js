import axios from "axios";

import {
  GET_ERRORS,
  GET_REQUEST,
  CLEAR_ERRORS,
  REQUEST_LOADING,
  DELETE_REQUEST
} from "./types";

// Get profile by handles
export const getRequests = handle => dispatch => {
  dispatch(setRequestLoading());
  axios
    .get(`/api/requests/${handle}`)
    .then(res =>
      dispatch({
        type: GET_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REQUEST,
        payload: null
      })
    );
};

export const getRequest = request_id => dispatch => {
  dispatch(setRequestLoading());
  axios
    .get(`/api/requests/${request_id}`)
    .then(res =>
      dispatch({
        type: GET_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REQUEST,
        payload: null
      })
    );
};

export const createInviteMessage = (invData, history) => dispatch => {
  axios
    .post(`/api/requests/${invData.handle}`, invData)
    .then(res => history.push("/search"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createRequestMessage = (reqData, history) => dispatch => {
  axios
    .post(`/api/requests/${reqData.handle}`, reqData)
    .then(res => history.push("/search"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment to request
export const addComment = (requestId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/requests/comment/${requestId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Request
export const deleteRequest = id => dispatch => {
  axios
    .delete(`/api/requests/${id}`)
    .then(
      res =>
        dispatch({
          type: DELETE_REQUEST,
          payload: id
        }),
      window.location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setRequestLoading = () => {
  return {
    type: REQUEST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
