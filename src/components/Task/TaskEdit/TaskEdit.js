import React from "react";
import PropTypes from "prop-types";
import "./TaskEdit.scss";
import { Button, Input, Checkbox } from "antd";

const { TextArea } = Input;

class TaskEdit extends React.Component {
  state = {
    textInputValue: this.props.text,
    statusInputValue: this.props.status
  };

  static propTypes = {
    onSaveClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  };

  handleTextInputChange = evt => {
    this.setState({
      textInputValue: evt.target.value
    });
  };

  handleStatusInputChange = evt => {
    this.setState({
      statusInputValue: evt.target.checked
    });
  };

  handleSaveClick = () => {
    const { onSaveClick } = this.props;
    const newCardData = {
      text: this.state.textInputValue,
      status: this.state.statusInputValue
    };

    onSaveClick(newCardData);
    this.props.onCancelClick();
  };

  render() {
    const { username, email, onCancelClick } = this.props;
    const { textInputValue, statusInputValue } = this.state;

    return (
      <div className="task-edit">
        <div className="task-edit__buttons-wrapper">
          <Button
            size="small"
            className="task-edit__button"
            onClick={onCancelClick}
          >
            Отмена
          </Button>
          <Button
            type="primary"
            size="small"
            className="task-edit__button"
            onClick={this.handleSaveClick}
          >
            Сохранить
          </Button>
        </div>
        <div className="task-edit__outer-wrapper">
          <p className="task-edit__author">{username}</p>
          <a className="task-edit__email" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
        <TextArea
          className="task-edit__text"
          rows="1"
          value={textInputValue}
          onChange={this.handleTextInputChange}
        />
        <p
          className={`task-edit__status ${
            statusInputValue ? "task-edit__status--finished" : ""
          }`}
        >
          <Checkbox
            className="task-edit__checkbox"
            onChange={this.handleStatusInputChange}
            checked={statusInputValue}
          >
            {statusInputValue ? "Завершено" : "Не выполнено"}
          </Checkbox>
        </p>
      </div>
    );
  }
}

export default TaskEdit;
