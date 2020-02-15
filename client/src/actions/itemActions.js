import axios from 'axios';

import {
  GET_ERRORS,
  GET_ITEM,
  CLEAR_ERRORS,
  ITEM_LOADING,
  DELETE_ITEM
} from './types';

// Get item
export const getItem = id => dispatch => {
  dispatch(setItemLoading());
  axios
    .get(`/api/item/${id}`)
    .then(res =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ITEM,
        payload: null
      })
    );
};

export const getMarket = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get(`/api/item/`)
    .then(res =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ITEM,
        payload: null
      })
    );
};

export const createItem = (itemData, history) => dispatch => {
  axios
    .post(`/api/item/`, itemData)
    .then(res => history.push(`/jobs/${itemData.locname}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Request
export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/item/${id}`)
    .then(
      res =>
        dispatch({
          type: DELETE_ITEM,
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
export const setItemLoading = () => {
  return {
    type: ITEM_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
