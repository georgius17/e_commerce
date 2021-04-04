import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useFieldError, FieldErrorProps } from "Hooks/useFieldError";

type Props = TextFieldProps & FieldErrorProps;

const EmailInput: React.FunctionComponent<Props> = props => {
  const { hasError, errorMessage, originalProps: muiProps } = useFieldError(
    props,
  );

  return (
    <TextField
      variant={"outlined" as any}
      margin="normal"
      required
      fullWidth
      id="email"
      name="email"
      autoComplete="email"
      error={hasError}
      helperText={errorMessage}
      {...muiProps}
    />
  );
};

export { EmailInput };
