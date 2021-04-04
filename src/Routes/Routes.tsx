import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { LoginPage } from "Components/Auth/Login/LoginPage";
import { useResource, Resources } from "Translations/Resources";
import { AuthenticatedRoute } from "Routes/AuthenticatedRoute";
import { useSelector } from "react-redux";
import { RootStateType } from "State/Store";
import { UsersPage } from "Components/Users/UsersPage";
import { UserLogout } from "Components/Users/UserLogout";
import { ProductsManagePage }  from "Components/Products/ProductsManagePage";
import { ProductsPage } from "Components/Products/ProductsPage";
import { UserDetailPage } from "Components/Users/UserDetailPage";
import { OrdersPage } from "Components/Orders/OrdersPage";
import { Error404Page } from "Components/Error/Error404Page";
import { BrowserRouter as Router, Switch } from "react-router-dom";

const Routes: React.FunctionComponent<RouteProps> = _ => {
  const { t } = useResource();
  const login = `/${t(Resources.Routes.Login)}`;
  const users = `/${t(Resources.Routes.Users)}`; 
  const manageProducts = `/sprava/${t(Resources.Routes.Products)}`;
  const products = `/${t(Resources.Routes.Products)}`;
  const userDetail = `/${t(Resources.Routes.Users)}/${t(Resources.Routes.UserDetail,)}/:id`;
  const userLogout = `/${t(Resources.Routes.LogOut)}`;
  const ordersAdmin = `/${t(Resources.Routes.Orders)}`;
  const ordersUser = `/:id/${t(Resources.Routes.Orders)}`;

  const user = useSelector((e: RootStateType) => e.auth.user);

  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Redirect to={products} />
        </Route>
        <Route path={login}>
          <LoginPage />
        </Route>
        <Route user={user} path={userDetail}>
          <UserDetailPage />
        </Route>
        <Route exact={true} user={user} path={users}>
          <UsersPage />
        </Route>
        <AuthenticatedRoute exact={true} user={user?.role === "Admin" ? user : null} path={manageProducts}>
          <ProductsManagePage />
        </AuthenticatedRoute>

        <AuthenticatedRoute exact={true} user={user} path={userLogout} >
          <UserLogout />
        </AuthenticatedRoute>

        <Route exact={true} user={user} path={products}>
          <ProductsPage />
        </Route>

        <AuthenticatedRoute exact={true} user={user?.role === "Admin" ? user : null} path={ordersAdmin}>
          <OrdersPage admin={true} />
        </AuthenticatedRoute>

        <AuthenticatedRoute exact={true} user={user} path={ordersUser}>
          <OrdersPage admin={false} />
        </AuthenticatedRoute>

        <Route>
          <Error404Page />
        </Route>
      </Switch>
    </Router>
  );
};

export { Routes };
