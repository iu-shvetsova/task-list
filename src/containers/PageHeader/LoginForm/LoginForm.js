import React from "react";
import PropTypes from "prop-types";
import "./LoginForm.scss";
import { Form, Input, Button } from "antd";

class LoginForm extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  handleSubmit = e => {
    const { form, onLogin } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onLogin(values.username, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Обязательное поле!" }]
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Обязательное поле!" }]
          })(<Input.Password type="password" placeholder="Password" />)}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);

export default WrappedLoginForm;
