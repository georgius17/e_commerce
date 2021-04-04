import * as React from "react";
import { ApplicationError } from "Components/Error/ApplicationError";

type State = {
  hasError: boolean;
};

/**
 * This component catches all errors in rendering
 */
class GlobalErrorHandler extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ApplicationError />;
    }
    return this.props.children;
  }
}

export { GlobalErrorHandler };
