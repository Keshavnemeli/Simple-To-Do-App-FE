import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="relative" color={props.color}>
      <Toolbar>
        <AssignmentTurnedInIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          To-Do list App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
