import React, { Component, PropTypes } from 'react';
import TasksItem from './TasksItem';

export default class TasksIndex extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      taskName: null,
    };
  }

  componentWillMount() {
    this.setState({
      tasks: this.props.tasks
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tasks: nextProps.tasks
    });
  }

  _toggleEditing() {
    this.setState({
      editing: !this.state.editing,
      taskName: null,
    });
  }

  _handleCreate(e) {
    if ( e.keyCode === 13 || e.type == 'click') {
      this.props.actions.createTasks({
        name: this.state.taskName,
      });
      this._toggleEditing();
    }
  }

  _handleCreateUpdate(e) {
    this.setState({
      taskName: e.target.value
    });
  }

  _renderTasks() {
    return this.state.tasks.map((task) =>
      <TasksItem
        key={task._id}
        task={task}
        actions={this.props.actions} />
    );
  }

  render () {
    const tasks = this._renderTasks();
    console.log(tasks);
    if ( this.state.editing ) {
      return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col" />
          <div className="mdl-cell mdl-cell--4-col task-menu__lower-left">
            <div className="container mdl-shadow--2dp">
              <div className="bar">
                <div className="wrapper">
                  <i style={{color: '#FFFFFF'}}
                    onClick={() => this._toggleEditing()}
                    className="material-icons mdl-list__item-icon link"
                  >
                    indeterminate_check_box
                  </i>
                </div>
                <div className="background" />
              </div>
              <ul className="mdl-list">
                <li className="mdl-list__item">
                  <span className="mdl-list__item-primary-content">
                    <div className="mdl-textfield mdl-js-textfield">
                      <input
                        className="mdl-textfield__input"
                        type="text"
                        id="name"
                        onKeyDown={(e) => this._handleCreate(e)}
                        onChange={(e) => this._handleCreateUpdate(e)}
                      />
                      <label className="mdl-textfield__label" htmlFor="name">
                        Task name...
                      </label>
                    </div>
                  </span>
                  <span className="mdl-list__item-secondary-action link">
                    <i name='done'
                      onClick={(e) => this._handleCreate(e)}
                      className="material-icons mdl-list__item-icon link"
                    >
                      done
                    </i>
                  </span>
                </li>
                {tasks}
              </ul>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--4-col" />
        </div>
      );
    } else {
      return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col" />
          <div className="mdl-cell mdl-cell--4-col task-menu__lower-left">
            <div className="container mdl-shadow--2dp">
              <div className="bar">
                <div className="wrapper">
                  <i style={{color: '#FFFFFF'}}
                    onClick={() => this._toggleEditing()}
                    className="material-icons mdl-list__item-icon link"
                  >
                    add_box
                  </i>
                </div>
                <div className="background" />
              </div>
              <ul className="mdl-list">
                {tasks}
              </ul>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--4-col" />
        </div>
      );
    }
  }

}
