import { Result, ProductDto, ProductSearchFilter } from "../../Api/Api";
import { ActionType, createAction, createAsyncAction, createReducer } from "typesafe-actions";

export type ProductsState = {
  products: ProductDto[];
  isLoading: boolean;
  errorCode: string | null;
}; 

export const getProductsAsync = createAsyncAction(
  "@products/GET_PRODUCTS_REQUEST",
  "@products/GET_PRODUCTS_SUCCESS",
  "@products/GET_PRODUCTS_FAILURE",
)<void, ProductDto[], Error>();

export const postProductAsync = createAsyncAction(
  "@products/POST_PRODUCTS_REQUEST",
  "@products/POST_PRODUCTS_SUCCESS",
  "@products/POST_PRODUCTS_FAILURE",
)<any, ProductDto, Error>();

export const deleteProductAsync = createAsyncAction(
  "@products/DELETE_PRODUCTS_REQUEST",
  "@products/DELETE_PRODUCTS_SUCCESS",
  "@products/DELETE_PRODUCTS_FAILURE",
)<number, number, Error>();

export const editProductAsync = createAsyncAction(
  "@products/EDIT_PRODUCTS_REQUEST",
  "@products/EDIT_PRODUCTS_SUCCESS",
  "@products/EDIT_PRODUCTS_FAILURE",
)<any, ProductDto, Error>();

export const findProductsAsync = createAsyncAction(
  "@products/FIND_PRODUCTS_REQUEST",
  "@products/FIND_PRODUCTS_SUCCESS",
  "@products/FIND_PRODUCTS_FAILURE",
)<ProductSearchFilter, ProductDto[], Error>();

export const buyProductSync = createAction(
  "@products/BUY_PRODUCT"
)<any>();


export type ProductAction = 
  | ActionType<typeof getProductsAsync> 
  | ActionType<typeof postProductAsync>
  | ActionType<typeof deleteProductAsync>
  | ActionType<typeof editProductAsync>
  | ActionType<typeof findProductsAsync>
  | ActionType<typeof buyProductSync>

export const productsReducer = createReducer<ProductsState, ProductAction>({
    products: [],
    isLoading: false,
    errorCode: null,
  })
    .handleAction(getProductsAsync.success, (state, action) => {
      let newProducts = <ProductDto[]>[];
      for (const key in action.payload) {
        let newProduct = action.payload[key];
        newProduct.productID = key;
        newProducts.push(
          newProduct
          // action.payload[key]
        )
        console.log(key);
        //console.log(action.payload[key]);
      }
      return {
        ...state,
        products: newProducts,
        errorCode: null,
        isLoading: false,
      };
    })
    .handleAction(getProductsAsync.request, state => {
      return { ...state, isLoading: true };
    })
    .handleAction(getProductsAsync.failure, (state, action) => {
      return {
        ...state,
        errorCode: action.payload.message,
        isLoading: false,
      }
    })
    .handleAction(postProductAsync.request, state => {
      return { ...state, isLoading: true };
    })
    .handleAction(postProductAsync.success, (state, action) => {
      // const products = [...state.products, action.payload];

      return { 
        ...state,
        isLoading: false 
      };
    })
    .handleAction(postProductAsync.failure, (state, action) => {
      return {
        ...state,
        errorCode: action.payload.message,
        isLoading: false,
      }
    })
    .handleAction(deleteProductAsync.request, state => {
      return { ...state, isLoading: true };
    })
    .handleAction(deleteProductAsync.success, (state, action) => {
      const products = state.products.filter(product => product.productID !== action.payload);

      return { 
        ...state, 
        products: products,
        isLoading: false 
      };
    })
    .handleAction(deleteProductAsync.failure, (state, action) => {
      return {
        ...state,
        errorCode: action.payload.message,
        isLoading: false
      }
    })
    .handleAction(editProductAsync.request, state => {
      return { ...state, isLoading: true };
    })
    .handleAction(editProductAsync.success, (state, action) => {

      const index = state.products.findIndex(i => i.productID === action.payload.productID)
      const products = [...state.products]
      products[index] = action.payload;
      
      return { 
        ...state, 
        products: products,
        isLoading: false 
      };
    })
    .handleAction(editProductAsync.failure, (state, action) => {
      return {
        ...state,
        errorCode: action.payload.message,
        isLoading: false
      }
    })
    .handleAction(findProductsAsync.success, (state, action) => {
      let newProducts = <ProductDto[]>[];
      for (const key in action.payload) {
        let newProduct = action.payload[key];
        newProduct.productID = key;
        newProducts.push(
          newProduct
          // action.payload[key]
        )
        console.log(key);
        //console.log(action.payload[key]);
      }

      return {
        ...state,
        products: newProducts,
        errorCode: null,
        isLoading: false,
      };
    })
    .handleAction(findProductsAsync.request, state => {
      return { ...state, isLoading: true };
    })
    .handleAction(findProductsAsync.failure, (state, action) => {
      return {
        ...state,
        errorCode: action.payload.message,
        isLoading: false,
      }
    })
    .handleAction(buyProductSync, (state, action) => {
      const index = state.products.findIndex(i => i.productID === action.payload)
      const products = [...state.products]
      products[index].quantity -= 1;
      return {
        ...state,
        products: products
      }
    })

    
    