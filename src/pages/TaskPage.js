import Tasks from "../components/Tasks/Tasks";
import { TaskContextProvider } from "../store/task-context";

const TaskPage = () => {
  return (
    <TaskContextProvider>
      <Tasks />
    </TaskContextProvider>
  );
};

export default TaskPage;
