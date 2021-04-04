import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { OrderDTO } from "../../Api/Api";
import { useDispatch } from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";
import { deleteOrderAsync } from "../../State/Orders/OrdersReducer";

type Props = {
  orders: OrderDTO[];
  user: any;
  admin: boolean;
};

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    tableLayout: "fixed",
    boxShadow: "none",
  },
  tableHeadRow: {
    cursor: "pointer",
    borderTop: "1px solid rgba(224, 224, 224, 1);",
  },
  tableBodyCell: {
    border: "none",
  },
  orangeIcon: {
    color: "#ff7b00",
    width: "25px",
    height: "25px",
    transform: "scaleX(-1)",
    marginLeft: theme.spacing(2),
    cursor: "pointer",
    paddingBottom: theme.spacing(0.25),
  },
  bold: {
    fontWeight: 600,
  },
  priceColumn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const OrdersTable: React.FunctionComponent<Props> = props => {
  const classes = useStyles();
  const moment = require("moment");

  const dispatch = useDispatch();

  const deleteIcon = (dateCreated: any, id: any) => {
    const dateNow = moment();
    const hourDif = dateNow.diff(dateCreated, "hours");
    
      return (
        <ClearIcon
          onClick={() => deleteHandler(id)}
          className={classes.orangeIcon}
        />
      );
    
  };

  const deleteHandler = (id: number) => {
    dispatch(deleteOrderAsync.request(id));
  };

  return (
    <div>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              <TableCell align="center">Datum</TableCell>
              <TableCell align="center">Čas</TableCell>
              <TableCell align="center">Produkt</TableCell>
              <TableCell align="center">Cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.orders.map(order => {
              return (
                <TableRow key={order.orderId}>
                  <TableCell className={classes.tableBodyCell} align="center">
                    {moment(order.dateCreated).format("DD.MM.YYYY")}
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    {moment(order.dateCreated).format("HH:mm")}
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    {order.name}
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    <div className={classes.priceColumn}>
                      <p>{order.price} Kč </p>
                      {deleteIcon(order.dateCreated, order.orderId)}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className={classes.tableHeadRow}>
              <TableCell
                className={[classes.tableBodyCell, classes.bold].join(" ")}
                align="center"
              >
                Cena celkem:
              </TableCell>
              <TableCell className={classes.tableBodyCell}> </TableCell>
              <TableCell className={classes.tableBodyCell}> </TableCell>
              <TableCell
                className={[classes.tableBodyCell, classes.bold].join(" ")}
                align="center"
              >
                {props.orders?.reduce(
                  (accumulator, current) => accumulator + current.price,
                  0,
                )}{" "}
                Kč
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export { OrdersTable };
