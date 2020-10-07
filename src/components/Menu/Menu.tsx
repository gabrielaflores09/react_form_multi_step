// Extermal deps
import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

// Internal deps
import useStyles from "./MenuStyle";

const Menu = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Multi-Step Form
        </Typography>
        <Typography variant="body2">React</Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Menu;
