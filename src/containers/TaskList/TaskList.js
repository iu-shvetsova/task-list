import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./TaskList.scss";
import { Pagination, Spin } from "antd";
import { getCards, editCard } from "../../redux/cards/actions";
import Task from "../../components/Task/Task";
import SortList from "../../components/SortList/SortList";
import { sortTitles } from "../../constants/sort.constants";
import { getCookie } from "../../helpers/cookie";

class TaskList extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    getCards: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    totalCardsCount: PropTypes.number.isRequired
  };

  componentWillMount() {
    const { getCards } = this.props;
    getCards();
  }

  handlePaginationItemClick = page => {
    const { sortField, sortDirection, getCards } = this.props;
    getCards(page, sortField, sortDirection);
  };

  onSortChange = sortInfo => {
    const { pageNumber, getCards } = this.props;
    const [sortField, sortDirection] = sortInfo.split("_");
    getCards(pageNumber, sortField, sortDirection);
  };

  handleEdit = (id, cardData) => {
    const {
      pageNumber,
      sortField,
      sortDirection,
      editCard,
      getCards
    } = this.props;

    editCard(id, cardData).then(() => {
      getCards(pageNumber, sortField, sortDirection);
    });
  };

  render() {
    const {
      loading,
      cards,
      totalCardsCount,
      sortField,
      sortDirection,
      pageNumber
    } = this.props;

    if (loading) {
      return (
        <div className="task-list">
          <Spin />
        </div>
      );
    }

    return (
      <div className="task-list">
        <SortList
          className="task-list__sort"
          sortItems={sortTitles}
          onSortItemChange={this.onSortChange}
          currentItem={`${sortField}_${sortDirection}`}
        />
        <ul className="task-list__wrapper">
          {cards.map((item, index) => (
            <li key={index} className="task-list__item">
              <Task
                taskData={item}
                editable={getCookie("token") !== ""}
                onEdit={this.handleEdit}
              />
            </li>
          ))}
        </ul>
        <Pagination
          current={pageNumber}
          defaultPageSize={3}
          total={totalCardsCount}
          onChange={this.handlePaginationItemClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    loading,
    cards,
    totalCardsCount,
    pageNumber,
    sortField,
    sortDirection
  } = state.cardsReducer;

  const { loggedIn } = state.userReducer;

  return {
    loading,
    loggedIn,
    cards,
    totalCardsCount,
    pageNumber,
    sortField,
    sortDirection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCards: (pageNumber, sortField, sortDirection) =>
      dispatch(getCards(pageNumber, sortField, sortDirection)),
    editCard: (id, cardData) => dispatch(editCard(id, cardData))
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);

export { connectedComponent as TaskList };
