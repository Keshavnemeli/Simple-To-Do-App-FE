import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router";
import { sendAuthRequest, login, setError } from "../../store/auth-actions";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Loader from "../UI/Loader";
import useStyles from "./LoginFormStyles";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    dispatch(setError(""));
    if (!emailRef.current.value.includes("@")) {
      dispatch(
        setError({
          email: "email must contain @",
        })
      );
      return;
    }

    if (!(passwordRef.current.value.length > 6)) {
      dispatch(
        setError({
          password: "password must contain more than 6 characters",
        })
      );
      return;
    }

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const data = await sendAuthRequest(
      dispatch,
      login,
      "/users/login",
      "POST",
      formData
    );
    if (data && data.token) {
      localStorage.setItem("token", data.token);
      history.replace("/");
    }
  };

  console.log(state.error);
  return (
    <>
      {state.error.error && <Alert severity="error">{state.error.error}</Alert>}
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={formSubmitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
              helperText={state.error.email}
              error={state.error.email ? true : false}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
              helperText={state.error.password}
              error={state.error.password ? true : false}
              gutterBottom
            />
            {state.loader ? (
              <>
                <Loader className={classes.loader} />
                <Button
                  className={classes.submit}
                  fullWidth
                  variant="contained"
                  disabled
                >
                  Sign In
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            )}
            <Grid container>
              <Grid item>
                <Link to="/signup">{" Don't have an account? Sign Up "}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;
