import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { AssignmentTurnedInOutlined } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import TaskContext from "../../store/task-context";
import { addTask, setError, setLoader } from "../../store/task-actions";
import Loader from "../UI/Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddTaskModal = (props) => {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const { state, dispatch } = useContext(TaskContext);

  const submitHandler = (event) => {
    event.preventDefault();
    addTask({
      dispatch,
      data: {
        description,
      },
    });
    props.setOpenModal(false);
  };

  useEffect(() => {
    return () => {
      dispatch(setLoader(false));
      dispatch(setError(null));
    };
  }, [dispatch]);

  return (
    <>
      <div className={classes.paper}>
        <div className={classes.content}>
          <CssBaseline />
          <Avatar className={classes.avatar}>
            <AssignmentTurnedInOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add a Task
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="off"
                  name="description"
                  variant="outlined"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  autoFocus
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
            {state.loader ? <Loader /> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={state.loader}
              className={classes.submit}
            >
              Add
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTaskModal;
