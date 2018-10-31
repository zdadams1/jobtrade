import axios from "axios";

import {
  ADD_GROUP,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_GROUPS,
  GET_GROUP,
  GROUP_LOADING,
  DELETE_GROUP
} from "./types";

// Create Group
export const createGroup = (groupData, history) => dispatch => {
  axios
    .post("/api/groups", groupData)
    .then(res => history.push("/groups"))

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add to group
// takes in groupId and userId
export const addToGroup = (groupId, userId) => dispatch => {
  dispatch(setGroupLoading());
  axios
    .post(`/api/groups/${groupId}`, userId)
    .then(res =>
      dispatch({
        type: GET_GROUP,
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

// Get all Groups for user
export const getGroups = user_id => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/groups/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GROUPS,
        payload: null
      })
    );
};

// Get Group
export const getGroup = group_id => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/groups/${group_id}`)
    .then(res =>
      dispatch({
        type: GET_GROUP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GROUP,
        payload: null
      })
    );
};

// Delete Group
export const deleteGroup = id => dispatch => {
  axios
    .delete(`/api/groups/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_GROUP,
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

// Add Comment
export const addComment = (groupId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/groups/comment/${groupId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_GROUP,
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

// Delete Comment
export const deleteComment = (groupId, commentId) => dispatch => {
  axios
    .delete(`/api/groups/comment/${groupId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_GROUP,
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

// Set loading state
export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
