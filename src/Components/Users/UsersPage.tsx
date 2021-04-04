import * as React from "react";
import { AuthenticatedLayout } from "Components/Layout/AuthenticatedLayout";
import { useResource, Resources } from "Translations/Resources";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "State/Users/UserReducer";
import { RootStateType } from "State/Store";
import { UsersTable } from "Components/Users/UsersTable";
import { Redirect } from "react-router-dom";

const UsersPage: React.FunctionComponent = _ => {
  const { t } = useResource();
  const { isLoading, users } = useSelector((e: RootStateType) => e.users);
  const user = useSelector((e: RootStateType) => e.auth.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsersAsync.request());
  }, [dispatch]);

  return (
    <AuthenticatedLayout title={t(Resources.Users.Title)}>
      {!isLoading && <UsersTable users={users} />}
      {user !== null ? <Redirect to="/produkty" /> : ""}
    </AuthenticatedLayout>
  );
};

export { UsersPage };
