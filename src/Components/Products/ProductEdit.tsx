import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CategoryDTO, ProductDto } from "Api/Api";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  postProductAsync,
  editProductAsync,
} from "State/Products/ProductsReducer";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

type Props = {
  onCancel: () => void;
  product: ProductDto | null;
  categories: CategoryDTO[];
};

const useStyles = makeStyles({
  newForm: {
    margin: "10px 0 10px 0",
    padding: "0 10px",
    width: "100%",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  name: {
    width: "35%",
  },
  category: {
    width: "45%",
    padding: "0",
    height: "40px",
  },
  quantity: {
    width: "30%",
  },
  priceDiscount: {
    width: "10%",
  },
  button: {
    padding: "6px 16px",
    border: "none",
    borderRadius: "5%",
    color: "orange",
    lineHeight: "2",
    minWidth: "120px",
    fontSize: "13px",
    fontWeight: 400,
  },
  buttonSuccess: {
    color: "#fff",
    backgroundColor: "#00d5ff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "orange",
    },
  },
  redBorder: {
    border: "1px solid red",
  },
  buttonCancel: {
    borderColor: "hsla(197,3%,45%,.616)",
    color: "hsla(197,3%,45%,.616)",
    backgroundColor: "#fff",
  },
  fileInput: {
    display: "none",
  },
});

export type FormData = {
  productName: string;
  productPrice: number;
  productQuantity: number;
  productPicture: any;
  productPriceDiscount: number;
  productCategory: number;
};

const ProductEdit: React.FunctionComponent<Props> = props => {
  const classes = useStyles();
  const [isPicture, setIsPicture] = React.useState(false);
  const [isDiscount, setIsDiscount] = React.useState(false);
  const [isNew, setIsNew] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.product) {
      if (props.product.discountPrice) {
        setIsDiscount(true);
      }
      if (!props.product.isNew) {
        setIsNew(false);
      }
    }
  }, []);

  const handleSubmitData = (data: FormData) => {
    let newProduct = {
      productID: props.product ? props.product.productID : 0,
      createdBy: props.product ? props.product.createdBy : 0,
      updatedBy: props.product ? props.product.updatedBy : 0,
      isDeleted: props.product ? props.product.isDeleted : false,
      name: data.productName,
      price: data.productPrice,
      quantity: data.productQuantity,
      discountPrice: isDiscount ? data.productPriceDiscount : 0,
      isNew: isNew,
      categoryID: Number(data.productCategory),
      imageURL: props.product?.imageURL ? props.product.imageURL : "null",
      image: "null"
    };

    const formData = new FormData();
    Object.entries(newProduct).map(([key, val]) =>
      formData.append(key, val.toString()),
    );

    // Firebase doesn't accept FormData -> send original object
    if (props.product) {
      // dispatch(editProductAsync.request(formData));
      dispatch(editProductAsync.request(newProduct));
    } else {
      // formData.append("image", data.productPicture[0]);
      // dispatch(postProductAsync.request(formData));
      newProduct.image = data.productPicture[0];
      dispatch(postProductAsync.request(newProduct));
    }
  };

  const validationSchema: yup.ObjectSchema = yup.object({
    productName: yup.string().min(3).required().defined(),
    productPrice: yup.number().required().positive().integer().defined(),
    productQuantity: yup.number().required().positive().integer().defined(),
    productPriceDiscount: isDiscount
      ? yup.number().positive().integer().defined()
      : yup.mixed(),
  });

  const { register, control, handleSubmit, errors } = useForm({
    validationSchema,
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    if (data.productPicture[0] === undefined) {
      if (props.product) {
        handleSubmitData(data);
        return;
      }
      setIsPicture(false);
      return;
    } else if (data.productPicture[0].type !== "image/png") {
      setIsPicture(false);
      return;
    }
    handleSubmitData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.newForm}>
      <Controller
        type="text"
        size="small"
        className={classes.name}
        variant="outlined"
        control={control}
        as={TextField}
        name="productName"
        id="productName"
        defaultValue={props.product ? props.product.name : ""}
        error={errors.productName !== undefined}
      />
      <label
        className={[classes.button, [!isPicture ? classes.redBorder : ""]].join(
          " ",
        )}
        htmlFor="productPicture"
      >
        {!isPicture ? "Vybrat soubor" : "Soubor vybrán"}
      </label>
      <input
        accept="image/png"
        type="file"
        ref={register()}
        className={classes.fileInput}
        name="productPicture"
        id="productPicture"
        onChange={() => setIsPicture(true)}
        defaultValue=""
      />
      <Controller
        type="number"
        size="small"
        variant="outlined"
        className={isDiscount ? classes.priceDiscount : ""}
        control={control}
        as={TextField}
        name="productPrice"
        id="productPrice"
        defaultValue={props.product ? props.product.price : ""}
        InputProps={{
          endAdornment: <InputAdornment position="start">Kč</InputAdornment>,
        }}
        error={errors.productPrice !== undefined}
      />

      {isDiscount && (
        <>
          <h3>→</h3>
          <Controller
            type="number"
            size="small"
            className={classes.priceDiscount}
            variant="outlined"
            control={control}
            as={TextField}
            name="productPriceDiscount"
            id="productPriceDiscount"
            defaultValue={
              props.product?.discountPrice ? props.product.discountPrice : ""
            }
            InputProps={{
              endAdornment: <InputAdornment position="start">Kč</InputAdornment>,
            }}
          />
        </>
      )}

      <Controller
        type="number"
        size="small"
        className={classes.quantity}
        variant="outlined"
        control={control}
        as={TextField}
        name="productQuantity"
        id="productQuantity"
        defaultValue={props.product ? props.product.quantity : ""}
        InputProps={{
          endAdornment: <InputAdornment position="start">ks</InputAdornment>,
        }}
        error={errors.productQuantity !== undefined}
      />

      <Controller
        className={classes.category}
        variant="outlined"
        control={control}
        defaultValue={props.product ? props.product.categoryID : ""}
        as={<Select className={classes.category} />}
        name="productCategory"
        id="productCategory"
      >
        {props.categories.map(C => (
          <MenuItem key={C.categoryID} value={C.categoryID}>
            {C.name}
          </MenuItem>
        ))}
      </Controller>

      <FormControlLabel
        label="Novinka"
        control={<Checkbox checked={isNew} onChange={() => setIsNew(!isNew)} />}
      />

      <FormControlLabel
        label="Sleva"
        control={
          <Checkbox
            checked={isDiscount}
            onChange={() => setIsDiscount(!isDiscount)}
          />
        }
      />

      <input
        type="submit"
        value="Uložit"
        className={[classes.button, classes.buttonSuccess].join(" ")}
      />
      <button
        onClick={props.onCancel}
        className={[classes.button, classes.buttonCancel].join(" ")}
      >
        Zahodit
      </button>
    </form>
  );
};

export { ProductEdit };
