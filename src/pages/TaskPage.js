import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Tasks from "../components/Tasks/Tasks";
import { TaskContextProvider } from "../store/task-context";

const TaskPage = () => {
  return (
    <TaskContextProvider>
      <Header />
      <Tasks />
      <Footer />
    </TaskContextProvider>
  );
};

export default TaskPage;
