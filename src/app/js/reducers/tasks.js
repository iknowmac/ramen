import * as types from '../constants';

const initialState = {
  records: [],
  isLoading: false,
  error: null,
};

function updateTaskById(state, task_id, attrs) {
  let {records} = state;
  records = records.map((task) => {
    if (task._id === task_id) {
      return {...task, ...attrs};
    }
    return task;
  });
  return {records};
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
        records: action.records,
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
      const index = state.records.findIndex(function(record) {
        record._id === action.task._id;
      });
      return {...state,
        records: [
          ...state.records.slice(0, index).slice(index + 1),
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
        records: [
          ...state.records.concat([action.task])
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
