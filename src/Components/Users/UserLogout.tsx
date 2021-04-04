import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { resetUser } from "State/Auth/AuthReducer";

const UserLogout: React.FunctionComponent = _ => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetUser());
  }, [dispatch]);

  return (
    <>
      <Redirect to="/prihlaseni" />
    </>
  );
};

export { UserLogout };
