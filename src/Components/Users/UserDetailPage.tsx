import * as React from "react";
import { useResource, Resources } from "Translations/Resources";
import { AuthenticatedLayout } from "Components/Layout/AuthenticatedLayout";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersDetailAsync } from "State/Users/UserReducer";
import { RootStateType } from "State/Store";

type RouteProps = {
  id: string;
};

type Props = {};

const UserDetailPage: React.FunctionComponent<Props> = props => {
  const { t } = useResource();
  const { params } = useRouteMatch<RouteProps>();
  const userID = Number(params.id);
  const dispatch = useDispatch();
  const userDetail = useSelector((e: RootStateType) => e.users.userDetail);

  React.useEffect(() => {
    dispatch(getUsersDetailAsync.request(userID));
  }, [userID, dispatch]);
  console.log(userDetail);

  return (
    <>
      <AuthenticatedLayout title={t(Resources.Users.Title)}>
        Hello {userID}
      </AuthenticatedLayout>
    </>
  );
};

export { UserDetailPage };
