import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./NewTaskForm.scss";
import { Button, Icon, Modal, Form, Input } from "antd";
import { createCard, getCards } from "../../redux/cards/actions";

const { TextArea } = Input;

class NewTaskForm extends React.Component {
  state = {
    modalVisible: false
  };

  static propTypes = {
    createCard: PropTypes.func.isRequired,
    getCards: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired
  };

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  handleModalCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  handleFormSubmit = e => {
    const {
      form,
      createCard,
      getCards,
      pageNumber,
      sortField,
      sortDirection
    } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        createCard(values).then(() => {
          getCards(pageNumber, sortField, sortDirection);
        });
        this.handleModalCancel();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="new-task">
        <Button
          type="primary"
          className="new-task__button"
          onClick={this.showModal}
        >
          Добавить задачу
          <Icon type="plus" />
        </Button>
        <Modal
          title="Добавление задачи"
          footer={null}
          visible={this.state.modalVisible}
          onCancel={this.handleModalCancel}
        >
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Item label="Имя пользователя" className="new-task__field">
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Обязательное поле!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="E-mail" className="new-task__field">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "Невалидный Email!"
                  },
                  {
                    required: true,
                    message: "Обязательное поле!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Текст задачи" className="new-task__field">
              {getFieldDecorator("text", {
                rules: [
                  {
                    required: true,
                    message: "Обязательное поле!"
                  }
                ]
              })(<TextArea />)}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="new-task__button"
            >
              Добавить
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { pageNumber, sortField, sortDirection } = state.cardsReducer;
  return { pageNumber, sortField, sortDirection };
};

const mapDispatchToProps = dispatch => {
  return {
    createCard: newData => dispatch(createCard(newData)),
    getCards: (pageNumber, sortField, sortDirection) =>
      dispatch(getCards(pageNumber, sortField, sortDirection))
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTaskForm);

const WrappedNewTaskForm = Form.create({ name: "newTask" })(connectedComponent);

export { WrappedNewTaskForm as NewTaskForm };
