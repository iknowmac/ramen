
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as task_actions from '../actions/task_actions';
import { TasksIndex } from '../components';

class TasksContainer extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.fetchTasks();
  }

  render () {
    const { tasks, actions } = this.props;
    return (
      <TasksIndex
        tasks={tasks}
        actions={actions} />
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({}, task_actions,), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
