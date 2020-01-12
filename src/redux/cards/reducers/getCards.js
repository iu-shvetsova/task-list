export const getCardsRequest = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const getCardsSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    cards: action.cardsInfo.tasks,
    totalCardsCount: parseInt(action.cardsInfo.total_task_count),
    pageNumber: action.pageNumber,
    sortField: action.sortField,
    sortDirection: action.sortDirection
  };
};
