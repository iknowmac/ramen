import * as types from '../constants';

// fetch actions.
export function fetchTasks() {
  return async (dispatch) => {
    try {
      let res = await fetch('http://localhost:3001/tasks');
      let records = await res.json();
      dispatch(fetchTasksSuccess(records));
    } catch (err) {
      dispatch(fetchTasksError(err));
    }
  };
}
export function fetchTasksSuccess(records) {
  return {
    type: types.FETCH_TASKS_SUCCESS,
    records: records,
  };
}
export function fetchTasksError(error) {
  return {
    type: types.FETCH_TASKS_ERROR,
    error: error,
  };
}

// update actions.
export function updateTasks(attrs) {
  return async (dispatch) => {
    try {
      let res = await fetch(`http://localhost:3001/task/${attrs._id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({task: attrs}),
      });
      let task = await res.json();
      dispatch(updateTasksSuccess(task));
    } catch (err) {
      dispatch(updateTasksError(err));
    }
  };
}
export function updateTasksSuccess(task) {
  return {
    type: types.UPDATE_TASKS_SUCCESS,
    task: task,
  };
}
export function updateTasksError(error) {
  return {
    type: types.UPDATE_TASKS_ERROR,
    error: error,
  };
}

// delete actions.
export function deleteTasks(attrs) {
  return async (dispatch) => {
    try {
      let res = await fetch(`http://localhost:3001/task/${attrs._id}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
      });
      let task = await res.json();
      dispatch(deleteTasksSuccess(task));
    } catch (err) {
      dispatch(deleteTasksError(err));
    }
  };
}
export function deleteTasksSuccess(task) {
  return {
    type: types.DELETE_TASKS_SUCCESS,
    task: task,
  };
}
export function deleteTasksError(error) {
  return {
    type: types.DELETE_TASKS_ERROR,
    error: error,
  };
}

// create actions.
export function createTasks(attrs) {
  return async (dispatch) => {
    try {
      let res = await fetch(`http://localhost:3001/tasks`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: { name: attrs.name } }),
      });
      let task = await res.json();
      dispatch(createTasksSuccess(task));
    } catch (err) {
      dispatch(createTasksError(err));
    }
  };
}
export function createTasksSuccess(task) {
  return {
    type: types.CREATE_TASKS_SUCCESS,
    task: task,
  };
}
export function createTasksError(error) {
  return {
    type: types.CREATE_TASKS_ERROR,
    error: error,
  };
}
