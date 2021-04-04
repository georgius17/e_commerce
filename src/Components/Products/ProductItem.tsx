import * as React from "react";
import { ProductDto } from "Api/Api";
import { makeStyles } from "@material-ui/core/styles";
import { postOrderAsync } from "State/Orders/OrdersReducer";
import { useDispatch, useSelector } from "react-redux";
import { editProductAsync } from "State/Products/ProductsReducer";
import productImg from "Assets/Images/bag_icon.jpg";
import { RootStateType } from "State/Store";
import { Redirect, useHistory } from "react-router-dom";
import { Resources, useResource } from "Translations/Resources";

type Props = {
  product: ProductDto;
};


const useStyles = makeStyles({
  productItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "90%",
    maxHeight: "350px",
    whiteSpace: "nowrap",
    position: "relative",
    margin: "1px",
    boxShadow:
      "0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2)",
  },
  picture: {
    maxWidth: "50%",
    height: "150px",
    marginTop: "20px",
  },
  stockSection: {
    width: "100%",
    color: "#7cb342",
    marginLeft: "20px",
  },
  buySection: {
    width: "100%",
    borderTop: "2px solid #f8f8f8",
    padding: "12px",
    display: "flex",
    justifyContent: "space-beween",
    alignItems: "center",
  },
  price: {
    float: "left",
    fontWeight: 700,
    color: "red",
    width: "50%",
  },
  buttonSection: {
    width: "50%",
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
  },
  discountIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#ff0",
    fontSize: ".75rem",
    width: "60px",
    height: "60px",
    position: "absolute",
    right: "5px",
    top: "5px",
    fontWeight: 700,
  },
  newIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "7px",
    border: "none",
    backgroundColor: "#2475b0",
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "rotate(15deg)",

    "&::before": {
      content: '""',
      width: "50px",
      height: "50px",
      borderRadius: "7px",
      border: "none",
      backgroundColor: "#2475b0",
      transform: "rotate(30deg)",
      position: "absolute",
      top: 0,
      left: 0,
    },
    "&::after": {
      content: '""',
      width: "50px",
      height: "50px",
      borderRadius: "7px",
      border: "none",
      backgroundColor: "#2475b0",
      transform: "rotate(60deg)",
      position: "absolute",
      top: 0,
      left: 0,
    },
  },
  topAdd: {
    top: "80px",
  },
  uppercase: {
    color: "#fff",
    fontWeight: 700,
    zIndex: 3,
    letterSpacing: "1.1px",
    transform: "rotate(-15deg)",
    fontSize: "15px",
  },
});

const ProductItem: React.FunctionComponent<Props> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((e: RootStateType) => e.auth.user);
  const history = useHistory();
  const { t } = useResource();

  const postOrderHandler = (product: ProductDto) => {
    if (!user) {
      history.push(`/${t(Resources.Routes.Login)}`);
      return;
    }
    const query = {
      name: product.name,
      price: product.price,
      productId: product.productID,
    };
    let updatedProduct = product;
    updatedProduct.quantity -= 1;
    dispatch(postOrderAsync.request(query));
    dispatch(editProductAsync.request(updatedProduct));

  };

  const formatDiscount = (product: ProductDto) => {
    if (!product.discountPrice) return;
    if (product.discountPrice < product.price) {
      return `-${(100 - (product.discountPrice * 100) / product.price).toFixed(
        0,
      )}`;
    } else {
      return `+${((product.discountPrice * 100) / product.price - 100).toFixed(
        0,
      )}`;
    }
  };

  return (
    <div className={classes.productItem}>
      {props.product.imageURL ? (
        <img
          className={classes.picture}
          src={productImg}
        />
      ) : (
        "Pic"
      )}
      <h3>{props.product.name} </h3>
      {props.product.discountPrice ? (
        <div className={classes.discountIcon}>
          {" "}
          {formatDiscount(props.product)}%
        </div>
      ) : (
        ""
      )}
      {props.product.isNew ? (
        <div
          className={[
            classes.newIcon,
            [props.product.discountPrice ? classes.topAdd : ""],
          ].join(" ")}
        >
          <span className={classes.uppercase}>NEW</span>
        </div>
      ) : (
        ""
      )}
      <div className={classes.stockSection}>
        Skladem {props.product.quantity} ks
      </div>
      <div className={classes.buySection}>
        <p className={classes.price}>{props.product.price} Kč</p>
        <div className={classes.buttonSection}>
          <button
            onClick={() => postOrderHandler(props.product)}
            className={classes.button}
          >
            Koupit{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProductItem };
