import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";
import HeaderMenu from "./HeaderMenu";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  headerMenu: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { state } = useContext(AuthContext);
  const history = useHistory();

  return (
    <AppBar
      className={""}
      position="relative"
      color={state.token ? "primary" : "default"}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>
          <AssignmentTurnedInIcon className={classes.icon} />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            onClick={() => {
              history.push("/");
            }}
          >
            To-Do list App
          </Typography>
        </div>
        {state.token && (
          <div className={classes.headerMenu}>
            <HeaderMenu letter={state.user?.name[0]} />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
