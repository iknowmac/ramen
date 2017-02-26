import * as types from '../constants';
import fetch from 'isomorphic-fetch';

// fetch actions.
export function fetchTasks() {
  return (dispatch) => {
    dispatch(fetchTasksRequest());
    return fetch('http://localhost:3001/tasks')
    .then((res) => res.json())
    .then((json) => dispatch(fetchTasksSuccess(json)))
    .catch((err) => dispatch(fetchTasksError(err)));
  };
}
export function fetchTasksRequest() {
  return {
    type: types.FETCH_TASKS,
  };
}
export function fetchTasksSuccess(tasks) {
  return {
    type: types.FETCH_TASKS_SUCCESS,
    tasks,
  };
}
export function fetchTasksError(error) {
  return {
    type: types.FETCH_TASKS_ERROR,
    error,
  };
}

// update actions.
export function updateTasks(attrs) {
  return (dispatch) => {
    dispatch(updateTasksRequest());
    return fetch(`http://localhost:3001/task/${attrs._id}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ task: attrs }),
    })
    .then((res) => res.json())
    .then((json) => dispatch(updateTasksSuccess(json)))
    .catch((err) => dispatch(updateTasksError(err)));
  };
}
export function updateTasksRequest() {
  return {
    type: types.UPDATE_TASKS,
  };
}
export function updateTasksSuccess(task) {
  return {
    type: types.UPDATE_TASKS_SUCCESS,
    task,
  };
}
export function updateTasksError(error) {
  return {
    type: types.UPDATE_TASKS_ERROR,
    error,
  };
}

// delete actions.
export function deleteTasks(attrs) {
  return (dispatch) => {
    dispatch(deleteTasksRequest());
    return fetch(`http://localhost:3001/task/${attrs._id}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((json) => dispatch(deleteTasksSuccess(json)))
    .catch((err) => dispatch(deleteTasksError(err)));
  };
}
export function deleteTasksRequest() {
  return {
    type: types.DELETE_TASKS,
  };
}
export function deleteTasksSuccess(task) {
  return {
    type: types.DELETE_TASKS_SUCCESS,
    task,
  };
}
export function deleteTasksError(error) {
  return {
    type: types.DELETE_TASKS_ERROR,
    error,
  };
}

// create actions.
export function createTasks(attrs) {
  return (dispatch) => {
    dispatch(createTasksRequest());
    return fetch('http://localhost:3001/tasks', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: { name: attrs.name } }),
    })
    .then((res) => res.json())
    .then((json) => dispatch(createTasksSuccess(json)))
    .catch((err) => dispatch(createTasksError(err)));
  };
}
export function createTasksRequest() {
  return {
    type: types.CREATE_TASKS,
  };
}
export function createTasksSuccess(task) {
  return {
    type: types.CREATE_TASKS_SUCCESS,
    task,
  };
}
export function createTasksError(error) {
  return {
    type: types.CREATE_TASKS_ERROR,
    error,
  };
}
