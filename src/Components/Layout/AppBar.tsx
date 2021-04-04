import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Toolbar, IconButton, AppBar as MuiAppBar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Resources, useResource } from "Translations/Resources";
import MenuIcon from "@material-ui/icons/Menu";
import headerImg from "Assets/Images/header.jpg";

interface AuthState {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

type Props = {
  title: string | null;
  drawerWidth: number;
  user: AuthState | null;
};

const useStyles = (drawerWidth: number) =>
  makeStyles(theme =>
    createStyles({
      root: {
        position: "static",
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        cursor: "cursor",
      },
      header: {
        position: "relative",
        backgroundImage: `url(${headerImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderBottom: "6px solid #d33500",
        display: "flex",
        alignItems: "center",
        height: "40vh",
        justifyContent: "center"
      },
      toolbar: {
        justifyContent: "space-between",
        height: "50px",
        backgroundColor: "rgba(0,0,0,.5)",
        borderBottom: "2px solid #fff",
        position: "fixed",
        width: "100%",
        zIndex: 2
      },
      logo: {
        maxWidth: "140px",
        position: "absolute",
        left: "10%",
        top: "5%",
      },
      titleName: {
        fontSize: "2rem",
        fontWeight: 500,
      },
    }),
  );

const AppBar: React.FunctionComponent<Props> = props => {
  const classes = useStyles(props.drawerWidth)();
  const dispatch = useDispatch();
  const { t } = useResource();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <MuiAppBar className={classes.root}>
        <div className={classes.header}>
          {props.title ? (
            <h1 className={classes.titleName}>{props.title}</h1>
          ) : (
            ""
          )}
        </div>
        <Toolbar className={classes.toolbar}>
          <IconButton>
            <Link
              to={
                props.user
                  ? `/${t(Resources.Routes.Products)}`
                  : `/${t(Resources.Routes.Users)}`
              }
            >
            </Link>
          </IconButton>
          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            {props.user === null ? (
              <MenuIcon className={classes.menuButton} />
            ) : (
              <h4 className={classes.menuButton}> {props.user.email}</h4>
            )}
            {isMenuOpen && props.children}
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    </>
  );
};

export { AppBar };
