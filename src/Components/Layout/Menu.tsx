import * as React from "react";
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import { useResource, Resources } from "Translations/Resources";
import { Link } from "react-router-dom";
import AppsIcon from "@material-ui/icons/Apps";
import { RootStateType } from "State/Store";
import { useSelector } from "react-redux";

type Props = {
  user: any;
};

const useStyles = makeStyles(theme =>
  createStyles({
    root: theme.mixins.toolbar,
    link: {
      color: "inherit",
      textDecoration: "inherit",
    },
    menu: {
      backgroundColor: "white",
      color: "black",
      position: "absolute",
      top: "55px",
      right: "1px"
    },
    menuUser: {
      backgroundColor: "white",
      color: "black",
      position: "absolute",
      top: "90px"
    }
  }),
);
const Menu: React.FunctionComponent<Props> = props => {
  const classes = useStyles();
  const { t } = useResource();
  const user = useSelector((e: RootStateType) => e.auth.user);

  return (
    <>
      <div className={props.user? classes.menuUser : classes.menu}>
        <Divider />
        <List>
        {!props.user && (
            <Link
              className={classes.link}
              to={`/${t(Resources.Routes.Login)}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={t(Resources.MenuItems.Login)} />
              </ListItem>
            </Link>
          )}

          {props.user && props.user.role === "Admin" && (
            <Link
              className={classes.link}
              to={`/sprava/${t(Resources.Routes.Products)}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={t(Resources.MenuItems.ManageProducts)} />
              </ListItem>
            </Link>
          )}

          {props.user && (
            <Link
              className={classes.link}
              to={`/${t(Resources.Routes.Products)}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={t(Resources.MenuItems.Products)} />
              </ListItem>
            </Link>
          )}

          {props.user && (
            <Link
              className={classes.link}
              to={`/${t(Resources.Routes.LogOut)}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={t(Resources.MenuItems.LogOut)} />
              </ListItem>
            </Link>
          )}

          {props.user && props.user.role === "Admin" && (
            <Link
              className={classes.link}
              to={`/${t(Resources.Routes.Orders)}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={t(Resources.MenuItems.AdminOrders)} />
              </ListItem>
            </Link>
          )}

          {props.user && (
            <Link
              className={classes.link}
              to={`/${props.user.userID}/${t(Resources.Routes.Orders)}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={t(Resources.MenuItems.UserOrders)} />
              </ListItem>
            </Link>
          )}

        </List>
        <Divider />
      </div>
    </>
  );
};

export { Menu };
