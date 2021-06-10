import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    justifyContent: "center",
  },
}));

export default function Loader(props) {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${props.className}`}>
      <CircularProgress />
    </div>
  );
}
