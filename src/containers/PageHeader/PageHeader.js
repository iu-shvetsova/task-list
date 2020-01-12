import React from "react";
import { connect } from "react-redux";
import "./PageHeader.scss";
import { Button, Icon, Modal } from "antd";
import LoginForm from "./LoginForm/LoginForm";
import { login, logout } from "../../redux/user/actions";
import PropTypes from "prop-types";
import { getCookie } from "../../helpers/cookie";

class PageHeader extends React.Component {
  state = {
    modalVisible: false
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
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

  handleLogin = (username, password) => {
    const { login } = this.props;
    login(username, password).then(() => {
      if (getCookie("token") !== "" && this.state.modalVisible) {
        this.handleModalCancel();
      }
    });
  };

  render() {
    const { logout } = this.props;
    return (
      <header className="page-header">
        <a href="/" className="page-header__link">
          <h1 className="page-header__title">Task List</h1>
        </a>
        <div className="page-header__user-wrapper">
          <p className="page-header__status">
            {getCookie("token") ? (
              <>
                <span className="page-header__username">
                  <Icon type="user" className="page-header__user-icon" />
                  admin
                </span>
                <Button className="page-header__button" onClick={logout}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                Вход не выполнен
                <Button
                  className="page-header__button"
                  onClick={this.showModal}
                >
                  Войти
                </Button>
              </>
            )}
          </p>
        </div>
        <Modal
          title="Вход"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={this.handleModalCancel}
        >
          <LoginForm onLogin={this.handleLogin} />
        </Modal>
      </header>
    );
  }
}

const mapStateToProps = state => {
  const { error, loggedIn } = state.userReducer;
  return {
    error,
    loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password)),
    logout: () => dispatch(logout())
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader);

export { connectedComponent as PageHeader };
