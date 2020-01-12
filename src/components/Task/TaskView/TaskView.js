import React from "react";
import PropTypes from "prop-types";
import "./TaskView.scss";
import { Button, Icon } from "antd";

const TaskView = ({ username, email, text, status, onEditClick, editable }) => {
  return (
    <div className="task-view">
      {editable && (
        <Button
          size="small"
          className="task-view__button"
          onClick={onEditClick}
        >
          <Icon type="edit" />
          <span className="visually-hidden">Редактировать</span>
        </Button>
      )}
      <div className="task-view__outer-wrapper">
        <p className="task-view__author">{username}</p>
        <a className="task-view__email" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
      <p className="task-view__text">{text}</p>
      <p
        className={`task-view__status ${
          status ? "task-view__status--finished" : ""
        }`}
      >
        {status ? "Завершено" : "Не выполнено"}
      </p>
    </div>
  );
};

TaskView.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  onEditClick: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired
};

export default TaskView;
