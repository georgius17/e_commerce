import * as React from "react";
import { AuthenticatedLayout } from "../../Components/Layout/AuthenticatedLayout";
import { useResource, Resources } from "../../Translations/Resources";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../State/Store";
import { getOrdersAsync } from "../../State/Orders/OrdersReducer";
import { GetOrderListQuery } from "../../Api/Api";
import { OrdersTable } from "./OrdersTable";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

type Props = {
  admin: boolean;
};

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    tableLayout: "fixed",
    boxShadow: "none",
  },
  dateBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    width: "50%",
  },
  dateControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "40%",
  },
}));

const OrdersPage: React.FunctionComponent<Props> = props => {
  const { t } = useResource();
  const { isLoading, orders } = useSelector((e: RootStateType) => e.orders);
  const user = useSelector((e: RootStateType) => e.auth.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [searchDate, setSearchDate] = React.useState<GetOrderListQuery>({
    dateFrom: null,
    dateTo: null,
    allOrders: false,
  });
  const moment = require("moment");

  const dateSubmitHandler = (e: string, type: string) => {
    const dateInput = moment(e).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    if (type === "dateFrom") {
      if (
        searchDate.dateTo &&
        moment(searchDate.dateTo).diff(dateInput, "days") < 0
      ) {
        setSearchDate({
          ...searchDate,
          dateFrom: searchDate.dateTo,
          dateTo: dateInput,
        });
        return;
      }
      setSearchDate({ ...searchDate, dateFrom: dateInput });
    } else if (type === "dateTo") {
      if (
        searchDate.dateFrom &&
        moment(searchDate.dateFrom).diff(dateInput, "days") > 0
      ) {
        setSearchDate({
          ...searchDate,
          dateFrom: dateInput,
          dateTo: searchDate.dateFrom,
        });
        return;
      }
      setSearchDate({ ...searchDate, dateTo: dateInput });
    }
  };

  React.useEffect(() => {
    dispatch(getOrdersAsync.request(searchDate));
  }, [searchDate]);

  React.useEffect(() => {
    setSearchDate({
      dateFrom: moment()
        .startOf("month")
        .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
      dateTo: moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
      //allOrders: props.admin ? true : false,
      allOrders: false
    });
  }, [props.admin]);

  return (
    <AuthenticatedLayout
      title={
        props.admin
          ? t(Resources.Orders.AdminTitle)
          : t(Resources.Orders.UserTitle)
      }
    >
      <div className={classes.dateBar}>
        <div className={classes.dateControl}>
          <InputLabel htmlFor="dateFrom">Od</InputLabel>
          <TextField
            id="dateFrom"
            variant="outlined"
            size="small"
            type="date"
            value={moment(searchDate.dateFrom).format("YYYY-MM-DD")}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => dateSubmitHandler(e.target.value, "dateFrom")}
          />
        </div>
        <div className={classes.dateControl}>
          <InputLabel htmlFor="dateTo">Do</InputLabel>
          <TextField
            id="dateTo"
            variant="outlined"
            size="small"
            type="date"
            value={moment(searchDate.dateTo).format("YYYY-MM-DD")}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => dateSubmitHandler(e.target.value, "dateTo")}
          />
        </div>
      </div>
      {!isLoading && (
        <OrdersTable orders={orders} user={user} admin={props.admin} />
      )}
    </AuthenticatedLayout>
  );
};

export { OrdersPage };
