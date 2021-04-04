import * as React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Resources, useResource } from "Translations/Resources";
import { useForm } from "react-hook-form";
import { EmailInput } from "Components/Inputs/EmailInput";
import { PasswordInput } from "Components/Inputs/PasswordInput";
import { nameof } from "Utils/ObjectUtils";
import * as yup from "yup";
import { Typography } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

type Props = {
  isLoading: boolean;
  serverError: string | null;
  onSubmit: (formData: FormData) => void;
  isLogin: boolean;
};

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  serverError: {
    color: red[500],
  },
}));

export type FormData = {
  login: string;
  password: string;
};

const LoginForm: React.FunctionComponent<Props> = props => {
  const classes = useStyles();
  const { t } = useResource();

  const { isLoading, serverError } = props;
  const validationSchema: yup.ObjectSchema<FormData> = yup
    .object({
      login: yup
        .string()
        .defined()
        .required(t(Resources.Validation.Required))
        .email(t(Resources.Validation.InvalidEmail)),
      password: yup
        .string()
        .defined()
        .required(t(Resources.Validation.Required)),
    })
    .defined();

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    validationSchema,
    mode: "onChange",
  });

  React.useEffect(() => {
    if (serverError) {
      setError("login", "");
    }
  }, [serverError, setError]);

  const onSubmit = (data: FormData) => {
    props.onSubmit(data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <EmailInput
        autoFocus
        name={nameof<FormData>("login")}
        label={t(Resources.Login.Login.Label)}
        inputRef={register}
        fieldError={errors.login}
        disabled={isLoading}
      />
      <PasswordInput
        name={nameof<FormData>("password")}
        label={t(Resources.Login.Password.Label)}
        inputRef={register}
        fieldError={errors.login}
        disabled={isLoading}
      />
      <Typography variant="subtitle1" className={classes.serverError}>
        {serverError}
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isLoading}
      >
      {props.isLogin ? "Přihlásit" : "Registrovat"}
      </Button>
    </form>
  );
};

export { LoginForm };
