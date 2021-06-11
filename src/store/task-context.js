import React, { useReducer } from "react";
import taskReducer from "./task-reducer";

const initialState = {
  taskList: [],
  totalCount: 0,
  isUpdated: {
    updated: true,
  },
  loader: false,
  sort: "ascending",
  search: "",
  page: 1,
  error: {},
};

const TaskContext = React.createContext(initialState);

export const TaskContextProvider = (props) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
