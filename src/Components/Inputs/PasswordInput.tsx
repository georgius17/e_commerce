import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { FieldErrorProps, useFieldError } from "Hooks/useFieldError";

type Props = TextFieldProps & FieldErrorProps;

const PasswordInput: React.FunctionComponent<Props> = props => {
  const { hasError, errorMessage, originalProps: muiProps } = useFieldError(
    props,
  );

  return (
    <TextField
      variant={"outlined" as any}
      margin="normal"
      required
      fullWidth
      name="password"
      type="password"
      id="password"
      autoComplete="current-password"
      error={hasError}
      helperText={errorMessage}
      {...muiProps}
    />
  );
};

export { PasswordInput };
