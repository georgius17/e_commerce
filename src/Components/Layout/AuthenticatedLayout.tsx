import * as React from "react";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { AppBar } from "./AppBar";
import { Menu } from "./Menu";
import { RootStateType } from "State/Store";
import { useSelector } from "react-redux";
const drawerWidth = 240;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      minHeight: "100vw"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    footer: {
      position: "relative",
      left: "0",
      top: "100vw",
      bottom: "0",
      width: "100%",
      height: "50px",
      backgroundColor: "#828181",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      color: "white",
      padding: "15px",
    },
  }),
);

type Props = {
  title: string | null;
};

const AuthenticatedLayout: React.FunctionComponent<Props> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector((e: RootStateType) => e.auth.user);

  return (
    <div className={classes.root}>
      <AppBar title={props.title} drawerWidth={drawerWidth} user={user}>
        <Menu user={user} />
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
      <div className={classes.footer}>
        {"© " + new Date().getFullYear()}
      </div>
    </div>
  );
};

export { AuthenticatedLayout };
