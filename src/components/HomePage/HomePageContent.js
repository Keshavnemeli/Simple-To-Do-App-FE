import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import useStyles from "./HomePageContentStyles";
import Loader from "../UI/Loader";
import Alert from "@material-ui/lab/Alert";

const HomePageContent = () => {
  const { state } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <>
      {state.error?.error && (
        <Alert severity="error">{state.error.error}</Alert>
      )}
      <CssBaseline />
      <main>
        <div className={classes.container}>
          <Container maxWidth="md">
            <Typography
              className={classes.title}
              variant="h1"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Simple To-Do List App
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              A really simple To-Do list app made using React, Express and
              sequelize.
            </Typography>
            {state.loader ? (
              <Loader />
            ) : state.token ? (
              <div>
                <Grid container justify="center">
                  <Grid item>
                    <Link to="/tasks">
                      <Button variant="contained" color="primary">
                        go to Task App
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link to="/login">
                      <Button variant="contained" color="primary">
                        LogIn
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup">
                      <Button variant="outlined" color="primary">
                        SignUp
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            )}
          </Container>
        </div>
      </main>
    </>
  );
};

export default HomePageContent;
