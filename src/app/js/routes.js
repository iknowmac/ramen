import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import { App } from './components';
import TasksContainer from './containers/TasksContainer';
import NotFound from './views/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TasksContainer} />
    <Route path="/tasks" component={TasksContainer} />
    <Route path="404" component={NotFound} />
    <Redirect from="*" to="404" />
  </Route>
);
