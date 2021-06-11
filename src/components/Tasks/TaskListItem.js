import {
  Checkbox,
  FormControlLabel,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useContext, useState } from "react";
import { updateTask, deleteTask } from "../../store/task-actions";
import TaskContext from "../../store/task-context";

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
}));

const TaskListItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState("");
  const { dispatch } = useContext(TaskContext);
  const classes = useStyles();
  //     console.log(description);

  const updateDescriptionHandler = () => {
    console.log(description);
    updateTask({
      dispatch,
      id: props.id,
      data: {
        description: description,
      },
    });
    setEditMode(false);
  };

  const updateCompletedHandler = (event) => {
    updateTask({
      dispatch,
      id: props.id,
      data: {
        completed: !props.completed,
      },
    });
  };

  const deleteTaskHandler = () => {
    deleteTask({
      dispatch,
      id: props.id,
      data: {
        completed: !props.completed,
      },
    });
  };

  return (
    <div className={classes.listItem}>
      {editMode ? (
        <>
          <form
            className={classes.desriptionForm}
            noValidate
            autoComplete="off"
          >
            <TextField
              name={props.id.toString()}
              label="Description"
              defaultValue={props.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>

          <div className="task-edit-icons-wrapper">
            <IconButton aria-label="Save" onClick={updateDescriptionHandler}>
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Cancel"
              onClick={() => {
                setEditMode(false);
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </div>
        </>
      ) : (
        <>
          <FormControlLabel
            control={
              <Checkbox
                className="todoCheckbox"
                name={props.description}
                checked={props.completed}
                onChange={updateCompletedHandler}
                inputProps={{ "aria-label": "primary checkbox" }}
                color="primary"
              />
            }
            label={props.description}
          />
          <div>
            <IconButton
              aria-label="Edit"
              onClick={() => {
                setEditMode(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Delete" onClick={deleteTaskHandler}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskListItem;
