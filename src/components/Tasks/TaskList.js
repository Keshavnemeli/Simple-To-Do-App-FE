import { makeStyles } from "@material-ui/core";
import TaskListItem from "./TaskListItem";

const useStyles = makeStyles((theme) => ({
  toDolist: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
  },
  listItem: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
}));

const TaskList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.toDolist}>
      {props.taskList.map((item) => (
        <TaskListItem
          key={item.id}
          id={item.id}
          description={item.description}
          completed={item.completed}
        />
      ))}
    </div>
  );
};
export default TaskList;
