import * as types from '../constants';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

function updateTaskById(state, task_id, attrs) {
  let {tasks} = state;
  tasks = tasks.map((task) => {
    if (task._id === task_id) {
      return {...task, ...attrs};
    }
    return task;
  });
  return {tasks};
}

export default function (state = initialState, action) {
  switch (action.type) {

    case types.FETCH_TASKS: {
      return {...state,
        isLoading: true,
        error: null,
      };
    }
    case types.FETCH_TASKS_SUCCESS:
      return {...state,
        tasks: action.tasks,
        isLoading: false,
        error: null,
      };
    case types.FETCH_TASKS_ERROR:
      return {...state,
        isLoading: false,
        error: action.error,
      };

    case types.UPDATE_TASKS: {
      return {...state,
        isLoading: true,
        error: null,
      };
    }
    case types.UPDATE_TASKS_SUCCESS: {
      return {...state,
        ...updateTaskById(state, action.task._id, action.task),
        isLoading: false,
        error: null,
      };
    }
    case types.UPDATE_TASKS_ERROR:
      return {...state,
        isLoading: false,
        error: action.error,
      };

    case types.DELETE_TASKS: {
      return {...state,
        isLoading: true,
        error: null,
      };
    }
    case types.DELETE_TASKS_SUCCESS: {
      const index = state.tasks.findIndex(function(record) {
        record._id === action.task._id;
      });
      return {...state,
        tasks: [
          ...state.tasks.slice(0, index).slice(index + 1),
        ],
        isLoading: false,
        error: null,
      };
    }
    case types.DELETE_TASKS_ERROR:
      return {...state,
        isLoading: false,
        error: action.error,
      };

    case types.CREATE_TASKS: {
      return {...state,
        isLoading: true,
        error: null,
      };
    }
    case types.CREATE_TASKS_SUCCESS:
      return {...state,
        tasks: [
          ...state.tasks.concat([action.task])
        ],
        isLoading: false,
        error: null,
      };
    case types.CREATE_TASKS_ERROR:
      return {...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
