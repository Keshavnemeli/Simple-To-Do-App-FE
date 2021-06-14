import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import {
  sendAuthRequest,
  setError,
  updateUser,
} from "../../store/auth-actions";
import AuthContext from "../../store/auth-context";
import getAuthHeaders from "../../utils/utils";
import Loader from "../UI/Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
  },
  avatar1: {
    height: "10rem",
    width: "10rem",
    fontSize: "5rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loader: {
    marginTop: "10px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const nameRef = useRef();
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(setError(false));

    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    if (password && !newPassword) {
      dispatch(
        setError({
          newPassword: "You must enter a new password ",
        })
      );
    }

    if (newPassword && !password) {
      dispatch(
        setError({
          password: "You must enter your current password ",
        })
      );
    }

    if (newPassword && newPassword.length < 6) {
      dispatch(
        setError({
          newPassword: "New password must be more than 6 characters ",
        })
      );
    }

    let formData = {
      name,
      ...(newPassword && { password: newPassword }),
    };

    console.log(formData);

    sendAuthRequest(dispatch, updateUser, "/users/me", "PATCH", formData, {
      Authorization: getAuthHeaders(),
      "Content-Type": "application/json",
    });
  };

  const deleteAccountHandler = () => {
    sendAuthRequest(
      dispatch,
      null,
      "/users/me",
      "DELETE",
      {},
      {
        Authorization: getAuthHeaders(),
        "Content-Type": "application/json",
      }
    );
    history.replace("/");
  };

  return (
    <>
      {state.error?.error && (
        <Alert severity="error">{state.error.error}</Alert>
      )}
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.avatar}>
                <Avatar
                  aria-haspopup="true"
                  className={classes.avatar1}
                  variant="rounded"
                  height="100%"
                >
                  {state.user?.name[0]}
                </Avatar>
              </div>

              <form className={classes.form} onSubmit={formSubmitHandler}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  name="Name"
                  inputRef={nameRef}
                  defaultValue={state.user?.name}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputRef={passwordRef}
                  helperText={state.error?.password}
                  error={state.error?.password ? true : false}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="New Password"
                  label="New Password"
                  type="password"
                  id="New Password"
                  autoComplete="new-password"
                  inputRef={newPasswordRef}
                  helperText={state.error?.newPassword}
                  error={state.error?.newPassword ? true : false}
                />
                {state.loader && <Loader />}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  // className={classes.submit}
                  onClick={deleteAccountHandler}
                >
                  Delete Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
};
export default Profile;
