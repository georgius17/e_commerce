import { FieldError } from "react-hook-form";
import { omit } from "lodash";

export type FieldErrorProps = {
  fieldError: FieldError | undefined;
};

export function useFieldError(props: FieldErrorProps) {
  const hasError = !!props.fieldError;
  const errorMessage = hasError
    ? props.fieldError?.message?.toString()
    : undefined;

  const originalProps = omit(props, "fieldError");

  return {
    hasError,
    errorMessage,
    originalProps,
  };
}
