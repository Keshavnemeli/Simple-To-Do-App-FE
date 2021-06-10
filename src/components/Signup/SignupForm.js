import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { login, sendAuthRequest, setError } from "../../store/auth-actions";
import Loader from "../UI/Loader";
import useStyles from "./SignupFormStyles";

const SignupForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

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
      name: nameRef.current.value,
    };

    const data = await sendAuthRequest(
      dispatch,
      login,
      "/users",
      "POST",
      formData
    );

    if (data && data.token) {
      localStorage.setItem("token", data.token);
      history.replace("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                inputRef={nameRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
                helperText={state.error.email}
                error={state.error.email ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
              />
            </Grid>
          </Grid>
          {state.loader ? (
            <>
              <Loader className={classes.loader} />
              <Button
                className={classes.submit}
                fullWidth
                variant="contained"
                disabled
              >
                Sign up
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
              Sign up
            </Button>
          )}
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default SignupForm;
