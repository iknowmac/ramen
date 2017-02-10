import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

export default class TasksItem extends Component {

  static propTypes = {
    task: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  componentWillMount() {
    const { task } = this.props;
    this.setState({
      task: task,
      name: task.name,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      task: nextProps.task,
    });
  }

  _toggleEditing() {
    if (this.state.task.completed) {
      return;
    }
    this.setState({ editing: !this.state.editing });
  }

  _handleDelete(task) {
    const res = confirm(`Are you sure you want to delete "${task.name}"?`);
    if (res) {
      this.props.actions.deleteTasks(task);
    }
  }

  _handleRename(e) {
    if ( e.keyCode === 13 || e.type == 'click') {
      this.props.actions.updateTasks({
        _id: this.state.task._id,
        name: this.state.name,
      });
      this._toggleEditing();
    }
  }

  _handleRenameUpdate(e) {
    this.setState({
      name: e.target.value
    });
  }

  _toggleCompleted() {
    const { task } = this.state;
    if (task.completed) {
      this.props.actions.updateTasks({
        _id: task._id,
        completed_at: null,
      });
    } else {
      this.props.actions.updateTasks({
        _id: task._id,
        completed_at: new Date,
      });
    }
  }

  render () {
    const { editing, task, name } = this.state;

    if ( editing && !task.completed) {
      return(
        <li className="mdl-list__item">
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-icon link">
              check_box_outline_blank
            </i>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input"
                type="text"
                id="name"
                onKeyDown={(e) => this._handleRename(e)}
                onChange={(e) => this._handleRenameUpdate(e)}
                defaultValue={name ? name : ''}
              />
            </div>
          </span>
          <span className="mdl-list__item-secondary-action link">
            <i name='done'
              onClick={(e) => this._handleRename(e)}
              className="material-icons mdl-list__item-icon link"
            >
              done
            </i>
          </span>
        </li>
      );
    } else {
      return (
        <li className="mdl-list__item">
          <span className="mdl-list__item-primary-content">
            <i onClick={() => this._toggleCompleted()}
              className="material-icons mdl-list__item-icon link"
            >
              {task.completed ? `check_box` : `check_box_outline_blank`}
            </i>
            <span
              className={task.completed ? 'strike-through link' : 'link'}
              onClick={() => this._toggleEditing()}>
              {task.name}
            </span>
          </span>
          <span className="mdl-list__item-secondary-action link">
            <i onClick={() => this._handleDelete(task)}
              className="material-icons mdl-list__item-icon link"
            >
              delete_forever
            </i>
          </span>
        </li>
      );
    }
  }

}
