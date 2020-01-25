import axios from 'axios';

import {
  ADD_JOBITEM,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_JOBITEMS,
  GET_JOBITEM,
  JOBITEM_LOADING,
  DELETE_JOBITEM
} from './types';

// Create Job Item
export const createJobItem = (jobItemData, history) => dispatch => {
  axios
    .post('/api/job-items', jobItemData)
    .then(res => history.push('/profile'))

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all Job Items by location
export const getJobItemsByLocation = location => dispatch => {
  dispatch(setJobItemsLoading());
  axios
    .get(`/api/job-items/${location}`)
    .then(res =>
      dispatch({
        type: GET_JOBITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBITEMS,
        payload: null
      })
    );
};

// Get all Job Items for user
export const getGroups = user_id => dispatch => {
  dispatch(setJobItemsLoading());
  axios
    .get(`/api/profile/job-items/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_JOBITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBITEMS,
        payload: null
      })
    );
};

// Get Job Item
export const getJobItem = jobitem_id => dispatch => {
  dispatch(setJobItemsLoading());
  axios
    .get(`/api/job-items/${jobitem_id}`)
    .then(res =>
      dispatch({
        type: GET_JOBITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBITEM,
        payload: null
      })
    );
};

// Delete Job Item
export const deleteJobItem = id => dispatch => {
  axios
    .delete(`/api/job-item/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_JOBITEM,
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

// Set loading state
export const setJobItemsLoading = () => {
  return {
    type: JOBITEM_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
