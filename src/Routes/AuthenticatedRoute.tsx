import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useResource, Resources } from "Translations/Resources";
import { AppUser } from "State/Auth/AuthReducer";

interface AuhorizedRouteProps extends RouteProps {
  user: AppUser | null;
}

const AuthenticatedRoute: React.FunctionComponent<AuhorizedRouteProps> = ({
  children,
  user,
  ...rest
}) => {
  const { t } = useResource();
  const isAuthenticated = !!user;
 
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/${t(Resources.Routes.Login)}`
            }}
          />
        )
      }
    />
  );
};

export { AuthenticatedRoute };
