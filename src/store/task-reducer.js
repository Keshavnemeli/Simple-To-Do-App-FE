const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        taskList: action.payload ? action.payload : [],
        totalCount: action.payload?.length,
      };
    case "SET_IS_UPDATED":
      return {
        ...state,
        isUpdated: { updated: action.payload },
      };
    case "SET_LOADER":
      return {
        ...state,
        loader: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default taskReducer;
