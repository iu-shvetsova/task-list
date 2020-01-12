import React from "react";
import PropTypes from "prop-types";
import TaskView from "./TaskView/TaskView";
import TaskEdit from "./TaskEdit/TaskEdit";

class Task extends React.Component {
  state = {
    isEdit: false
  };

  static propTypes = {
    id: PropTypes.number,
    onEdit: PropTypes.func.isRequired,
    taskData: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired
  };

  handleToggleEditMode = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  handleSave = cardData => {
    const { id } = this.props.taskData;
    const { onEdit } = this.props;

    onEdit(id, cardData);

    this.setState({
      isEdit: !this.state.false
    });
  };

  render() {
    const { taskData, editable } = this.props;

    return this.state.isEdit ? (
      <TaskEdit
        {...taskData}
        onSaveClick={this.handleSave}
        onCancelClick={this.handleToggleEditMode}
      />
    ) : (
      <TaskView
        {...taskData}
        editable={editable}
        onEditClick={this.handleToggleEditMode}
      />
    );
  }
}

export default Task;
