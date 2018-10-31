import axios from "axios";

import {
  GET_ERRORS,
  GET_REQUEST,
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

export const getRequestById = (user, id) => dispatch => {
  dispatch(setRequestLoading());
  axios
    .get(`/api/requests/${user}/${id}`)
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
    .post(`/api/requests/${invData.handle}`)
    .then(res => history.push("/search"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createRequestMessage = (invData, history) => dispatch => {
  axios
    .post(`/api/requests/${invData.handle}`)
    .then(res => history.push("/search"))
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
    .delete(`/api/profile/requests/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_REQUEST,
        payload: id
      })
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
