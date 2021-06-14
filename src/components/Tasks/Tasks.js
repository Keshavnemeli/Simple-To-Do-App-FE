import {
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import {
  fetchTasks,
  setError,
  setLoader,
  setSearchDispatch,
  setCompleted,
} from "../../store/task-actions";
import TaskContext from "../../store/task-context";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import Loader from "../UI/Loader";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },

  container: {
    marginTop: theme.spacing(5),
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "8px 15px 8px 32px",
  },
  ageSelect: {
    minWidth: 120,
  },
  addButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%",
    // alignSelf: "center",
  },
}));

const Tasks = () => {
  const { state: taskState, dispatch: taskDispatch } = useContext(TaskContext);
  const { state: authState } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const classes = useStyles();

  useEffect(() => {
    fetchTasks({
      dispatch: taskDispatch,
      completed: taskState.completed,
      search: taskState.search,
      page: taskState.page,
    });

    return () => {
      setOpenModal(false);
      taskDispatch(setLoader(false));
      taskDispatch(setError(null));
    };
  }, [
    taskDispatch,
    taskState.completed,
    taskState.search,
    taskState.page,
    // taskState.limit,
    taskState.isUpdated,
  ]);

  useEffect(() => {
    const timer = setTimeout(
      () => taskDispatch(setSearchDispatch(search)),
      500
    );

    return () => clearTimeout(timer);
  }, [search, taskDispatch]);

  return (
    <div>
      {authState.error?.error && (
        <Alert severity="error">{authState.error.error}</Alert>
      )}
      {!authState.error?.error && taskState.error?.error && (
        <Alert severity="error">{taskState.error.error}</Alert>
      )}
      <div className={classes.modal}>
        <Modal
          open={openModal}
          BackdropComponent={Backdrop}
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <div>
            <AddTaskModal setOpenModal={setOpenModal} />
          </div>
        </Modal>
      </div>
      <div className={classes.addButton}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
          disabled={taskState.loader || authState.loader}
        >
          Add Task
        </Button>
      </div>
      <Container className={classes.container} component="main" maxWidth="sm">
        <Card variant="outlined">
          <CssBaseline />

          <CardContent>
            <Typography
              color="textSecondary"
              className={classes.title}
              component="h1"
              variant="h3"
            >
              Tasks
            </Typography>

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                className={classes.ageSelect}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={taskState.completed === null ? "" : taskState.completed}
                onChange={(event) => {
                  taskDispatch(
                    setCompleted(
                      event.target.value === "" ? null : event.target.value
                    )
                  );
                }}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={true}>Completed</MenuItem>
                <MenuItem value={false}>InComplete</MenuItem>
              </Select>
              <TextField
                id="searchTask"
                label="Search"
                // value={}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />{" "}
            </FormControl>

            {taskState.loader || authState.loader ? (
              <Loader />
            ) : (
              <TaskList taskList={taskState.taskList} />
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Tasks;
