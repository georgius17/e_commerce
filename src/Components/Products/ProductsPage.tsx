import * as React from "react";
import { AuthenticatedLayout } from "Components/Layout/AuthenticatedLayout";
import { useResource, Resources } from "Translations/Resources";
import {
  getProductsAsync,
  findProductsAsync,
} from "State/Products/ProductsReducer";
import { getCategoriesAsync } from "State/Categories/CategoriesReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "State/Store";
import { ProductItem } from "./ProductItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    overflowX: "hidden",
  },
  container: {
    display: "grid",
    gap: "30px",
    ["@media (min-width:1007px)"]: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
    ["@media (max-width:1006px)"]: {
      gridTemplateColumns: "1fr 1fr",
    },
    ["@media (max-width:600px)"]: {
      gridTemplateColumns: "1fr",
    },
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    margin: "20px",
  },
  button: {
    float: "right",
    padding: "6px 16px",
    border: "none",
    borderRadius: "5%",
    backgroundColor: "#00d5ff",
    color: "#fff",
    lineHeight: "2",
    minWidth: "120px",
    fontSize: "13px",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "#fff",
      color: "orange",
    },
    marginLeft: "15px",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    color: "white",
    margin: ".5rem",
    fontSize: "2rem",
    fontWeight: 500,
  },
  clearButton: {
    position: "absolute",
    left: "67%",
    top: "90px",
    borderRadius: "50%",
    height: "20px",
    width: "20px",
    textAlign: "center",
    padding: "0",
  },
  searchBar: {
    position: "absolute",
    width: "90%",
    top: "20%",
    left: "5%",
    display: "flex",
    flexDirection: "column",
  },
  categoriesContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    color: "white",
    margin: "4px",
    fontWeight: 400,
    cursor: "pointer",
  },
  autocomplete: {
    position: "absolute",
    top: "120px",
    maxHeight: "155px",
    overflow: "auto",
    backgroundColor: "white",
    zIndex: 10,
    width: "50%",
    listStyleType: "none",
    fontSize: "1rem",
    padding: 0,
    border: "1px solid grey",
    margin: 0,
  },
  list: {
    padding: "7px 10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#E0E0E0",
    },
  },
  autoSearchDiv: {
    width: "50%",
  },
});

const ProductsPage: React.FunctionComponent = _ => {
  const { t } = useResource();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchString, setSearchString] = React.useState("");
  const { isLoading, products } = useSelector((e: RootStateType) => e.products);
  const { categories } = useSelector((e: RootStateType) => e.categories);
  const [categoriesFilter, setCategoriesFilter] = React.useState([
    { categoryID: 5, name: "#Novinka" },
    { categoryID: 6, name: "#Sleva" },
    // { categoryID: 7, name: "#MojeOblíbené" },
    // { categoryID: 8, name: "#OblíbenéOstatních" },
  ]);
  const accents = require("remove-accents");

  React.useEffect(() => {
    dispatch(getProductsAsync.request());
    if (categories.length == 0) {
      dispatch(getCategoriesAsync.request());
    }
  }, [dispatch]);

  React.useEffect(() => {
    setCategoriesFilter([...categoriesFilter, ...categories]);
  }, [categories]);

  const searchProducts = (name?: string) => {
    dispatch(
      findProductsAsync.request({
        name: name ? name : searchString,
        filter: null,
      }),
    );
  };

  const cancelSearch = () => {
    setSearchString("");
    dispatch(getProductsAsync.request());
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  const filterSearchProducts = (filter: any) => {
    dispatch(findProductsAsync.request({ name: searchString, filter: filter }));
  };

  return (
    <AuthenticatedLayout title={null}>
      <div className={classes.searchBar}>
        <h2 className={classes.title}>Vyhledejte produkt:</h2>
        <div className={classes.searchContainer}>
          <div className={classes.autoSearchDiv}>
            <TextField
              size="small"
              variant="outlined"
              id="outlined-name"
              className={classes.input}
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
              onKeyDown={e => handleKeyDown(e)}
            />
            {searchString.length !== 0 ? (
              <>
                <button
                  onClick={() => cancelSearch()}
                  className={classes.clearButton}
                >
                  {" "}
                  X
                </button>
                <ul className={classes.autocomplete}>
                  {products
                    .filter(
                      product =>
                        !product.isDeleted &&
                        accents
                          .remove(product.name)
                          .toLowerCase()
                          .includes(accents.remove(searchString).toLowerCase()),
                    )
                    .map(product => {
                      const charIndex = accents
                        .remove(product.name)
                        .toLowerCase()
                        .indexOf(accents.remove(searchString).toLowerCase());
                      const lengthIndex = charIndex + searchString.length;
                      return (
                        <li
                          onClick={() => searchProducts(product.name)}
                          key={product.productID}
                          className={classes.list}
                        >
                          {product.name.slice(0, charIndex)}
                          <b>{product.name.slice(charIndex, lengthIndex)}</b>
                          {product.name.slice(lengthIndex)}
                        </li>
                      );
                    })}
                </ul>
              </>
            ) : (
              ""
            )}
          </div>

          <button onClick={() => searchProducts()} className={classes.button}>
            Vyhledat
          </button>
        </div>

        <div className={classes.categoriesContainer}>
          {categoriesFilter.map(c => (
            <h3
              key={c.categoryID}
              onClick={() => filterSearchProducts(c.categoryID)}
              className={classes.category}
            >
              {c.name}
            </h3>
          ))}
        </div>
      </div>
      {searchString.length > 0 && products.length < 1
        ? `Produkt ${searchString} nebyl nalezen`
        : ""}

      {!isLoading && (
        <div className={classes.container}>
          {products
            .filter(product => !product.isDeleted)
            .map(product => (
              <ProductItem key={product.productID} product={product} />
            ))}
        </div>
      )}
    </AuthenticatedLayout>
  );
};

export { ProductsPage };
