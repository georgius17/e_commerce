import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { CategoryDTO, ProductDto } from "Api/Api";
import { ProductEdit } from "Components/Products/ProductEdit";
import BuildIcon from "@material-ui/icons/Build";
import ClearIcon from "@material-ui/icons/Clear";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(theme => ({
  tableRow: {
    cursor: "pointer",
  },
  editCell: {
    padding: "0",
    borderBottom: "1px solid rgba(224, 224, 224, 1);",
  },
  picture: {
    maxWidth: "60px",
  },
  orangeIcon: {
    color: "#ff7b00",
    width: "25px",
    height: "25px",
    transform: "scaleX(-1)",
  },
  categories: {
    display: "flex",
    color: "grey",
  },
  prices: {
    display: "flex",
    justifyContent: "flex-end",
  },
  lineThrough: {
    textDecoration: "line-through",
    marginRight: theme.spacing(1),
  },
}));

type Props = {
  edit: boolean;
  product: ProductDto;
  onEditCancel: () => void | null;
  onEditStart: () => void | null;
  onDelete: () => void | null;
  categories: CategoryDTO[];
};

const ProductRow: React.FunctionComponent<Props> = props => {
  const classes = useStyles();

  return props.edit ? (
    <TableRow key={props.product.productID} className={classes.tableRow}>
      <td colSpan={5} className={classes.editCell}>
        <ProductEdit
          product={props.product}
          onCancel={props.onEditCancel}
          categories={props.categories}
        />
      </td>
    </TableRow>
  ) : (
    <TableRow key={props.product.productID} className={classes.tableRow}>
      <TableCell component="th" scope="row">
        {props.product.name}{" "}
        <div className={classes.categories}>
          {props.product.isNew && "#Novinka "}
          {props.product.discountPrice && "#Sleva "}
          {props.categories
            .filter(c => c.categoryID == props.product.categoryID)
            .map(ca => ca.name)}
        </div>
      </TableCell>
      <TableCell align="right">
        {props.product.imageURL ? (
          <img
            className={classes.picture}
            src={API_URL + props.product.imageURL}
          />
        ) : (
          "Pic"
        )}
      </TableCell>
      <TableCell align="right">
        <div className={classes.prices}>
          <p className={props.product.discountPrice ? classes.lineThrough : ""}>
            {props.product.price} Kč
          </p>
          {props.product.discountPrice ? (
            <p>{props.product.discountPrice} Kč</p>
          ) : (
            ""
          )}
        </div>
      </TableCell>
      <TableCell align="right">{props.product.quantity} Ks</TableCell>
      <TableCell align="right">
        <BuildIcon className={classes.orangeIcon} onClick={props.onEditStart} />
        <ClearIcon className={classes.orangeIcon} onClick={props.onDelete} />
      </TableCell>
    </TableRow>
  );
};

export { ProductRow };
