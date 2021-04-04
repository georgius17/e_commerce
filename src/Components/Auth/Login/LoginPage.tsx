import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Resources, useResource, useServerError } from "Translations/Resources";
import { LoginForm, FormData } from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, signUpUserAsync } from "State/Auth/AuthReducer";
import { RootStateType } from "State/Store";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/featured/?finances)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const LoginPage: React.FunctionComponent = _ => {
  const { t } = useResource();
  const classes = useStyles();
  const location = useLocation<{ from: string }>();
  const { from } = location.state || {
    from: { pathname: `/${t(Resources.Routes.Products)}` },
  };
  const [isLogin, setIsLogin] = React.useState(true);

  const dispatch = useDispatch();
  const { translateError } = useServerError(
    Resources.Login.Error,
    Resources.Login.Error.General,
  );
  const { isLoading, user, errorCode } = useSelector(
    (e: RootStateType) => e.auth,
  );
  const history = useHistory();

  React.useEffect(() => {
    if (!isLoading && !!user) {
      history.replace(from);
    }
  }, [isLoading, user, t, history, from]);

  const onSubmit = ({ login, password }: FormData) => {
    if (isLogin) {
      dispatch(loginUserAsync.request({ login, password }));
    } else {
      dispatch(signUpUserAsync.request({ login, password }));
    }
  };

  return (
    <Grid justify="center" container component="main" className={classes.root}>
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t(Resources.Login.FormTitle)}{" "}
          </Typography>
          <FormControlLabel
        control={
          <Switch
            onChange={() => setIsLogin(!isLogin)}
            name="checkedB"
            color="primary"
          />
        }
        label={isLogin ? "Přihlášení" : "Registrace"}
      />
          <LoginForm
            serverError={translateError(errorCode)}
            isLoading={isLoading}
            onSubmit={onSubmit}
            isLogin={isLogin}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export { LoginPage };
