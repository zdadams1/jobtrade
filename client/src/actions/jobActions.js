import axios from 'axios';

import {
  GET_ERRORS,
  GET_JOB,
  GET_JOBS,
  CLEAR_ERRORS,
  JOB_LOADING,
  DELETE_JOB
} from './types';

// Get item
export const getJob = id => dispatch => {
  dispatch(setJobLoading());
  axios
    .get(`/api/job-items/${id}`)
    .then(res =>
      dispatch({
        type: GET_JOB,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOB,
        payload: null
      })
    );
};

export const getJobs = locname => dispatch => {
  dispatch(setJobLoading());
  axios
    .get(`/api/job-items/${locname}`)
    .then(res =>
      dispatch({
        type: GET_JOBS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: null
      })
    );
};

export const createJob = (jobData, history) => dispatch => {
  axios
    .post(`/api/job-items/`, jobData)
    .then(res => history.push(`/jobs/${jobData.locname}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Request
export const deleteJob = id => dispatch => {
  axios
    .delete(`/api/job-items/${id}`)
    .then(
      res =>
        dispatch({
          type: DELETE_JOB,
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
export const setJobLoading = () => {
  return {
    type: JOB_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
