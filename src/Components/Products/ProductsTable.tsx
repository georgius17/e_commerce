import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CategoryDTO, ProductDto } from "Api/Api";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ProductEdit } from "Components/Products/ProductEdit";
import { ProductRow } from "Components/Products/ProductRow";
import { deleteProductAsync } from "State/Products/ProductsReducer";
import { useDispatch } from "react-redux";

type Props = {
  products: ProductDto[];
  categories: CategoryDTO[];
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    tableLayout: "fixed",
    boxShadow: "none",
  },
  tableRow: {
    cursor: "pointer",
  },
  addIcon: {
    float: "right",
    margin: "10px",
    color: "#ff7b00",
    width: "30px",
    height: "30px",
  },
});

const ProductsTable: React.FunctionComponent<Props> = props => {
  const classes = useStyles();
  const [isAddForm, setIsAddForm] = useState(false);
  const [editList, setEditList] = useState<Array<number>>([]);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteProductAsync.request(id));
  };

  return (
    <div>
      <TableContainer>
        <AddCircleIcon
          onClick={() => setIsAddForm(!isAddForm)}
          className={classes.addIcon}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell align="center">Produkt</TableCell>
              <TableCell> </TableCell>
              <TableCell align="right">Cena za ks</TableCell>
              <TableCell align="right">Aktuální množství</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAddForm && (
              <TableRow>
                <td colSpan={5}>
                  <ProductEdit
                    onCancel={() => setIsAddForm(false)}
                    product={null}
                    categories={props.categories}
                  />
                </td>
              </TableRow>
            )}
            {props.products
              .filter(product => !product.isDeleted)
              .map(product => {
                if (editList.indexOf(product.productID) == -1) {
                  return (
                    <ProductRow
                      key={product.productID}
                      onDelete={() => handleDelete(product.productID)}
                      onEditStart={() =>
                        setEditList([...editList, product.productID])
                      }
                      onEditCancel={() => {}}
                      edit={false}
                      product={product}
                      categories={props.categories}
                    />
                  );
                } else
                  return (
                    <ProductRow
                      key={product.productID}
                      onDelete={() => {}}
                      onEditStart={() => {}}
                      onEditCancel={() =>
                        setEditList(
                          editList.filter(id => id !== product.productID),
                        )
                      }
                      edit={true}
                      product={product}
                      categories={props.categories} 
                    />
                  );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export { ProductsTable };
