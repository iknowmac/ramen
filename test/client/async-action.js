require("babel-core/register");
require("babel-polyfill");

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/app/js/actions/task_actions';
import * as types from '../../src/app/js/constants';
import nock from 'nock';
const expect = require('chai').expect;

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('Async Actions', () => {

  afterEach(function(next) {
    nock.cleanAll();
    next();
  });

  it('FETCH_TASKS should return FETCH_TASKS_SUCCESS', () => {
    nock('http://localhost:3001').get('/tasks')
      .reply(200, { tasks: [ { name: "Go grocery shopping",} ] } );

    const expectedActions = [
      { type: types.FETCH_TASKS },
      {
        type: types.FETCH_TASKS_SUCCESS,
        tasks: { tasks: [ { name: "Go grocery shopping",} ] },
      }
    ];

    const store = mockStore({ tasks: { tasks: [] } });

    return store.dispatch(actions.fetchTasks()).then(() => {
      expect(store.getActions()).eql(expectedActions);
    });
  });

});
