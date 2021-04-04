import { getProductsList, deleteProductsId, postProductsSearch, postProducts, putProducts} from "../../Api/Api";
import { put, takeLatest } from "redux-saga/effects";
import { call } from "typed-redux-saga";
import { getType } from "typesafe-actions";
import {
    getProductsAsync, postProductAsync, deleteProductAsync, editProductAsync, findProductsAsync, buyProductSync
} from "./ProductsReducer";
import { ProductDto } from "Api/Api";
import db from "../../Api/Base";

const API_URL = process.env.REACT_APP_API_URL;
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;

function* getProducts(): Generator {
    try {
      const response = yield* call(getProductsList);
      if (response.status === 200) {
        yield put(getProductsAsync.success(response.json));
      } else {
        yield put(getProductsAsync.failure(new Error()));
      }
    } catch (err) {
      yield put(getProductsAsync.failure(err));
    }
  }

export function* getProductsSaga() {
    yield takeLatest(getType(getProductsAsync.request), getProducts);
  }

function* postProduct(
  action: ReturnType<typeof postProductAsync.request>,
): Generator {
  try {
    const response = yield* call(postProducts, action.payload);
    if (response.status === 200) {
      yield put(postProductAsync.success(response.json));
    } else {
      yield put(postProductAsync.failure(new Error()));
    }
  } catch (err) {
    yield put(postProductAsync.failure(err));
  }
}

export function* postProductSaga() {
  yield takeLatest(getType(postProductAsync.request), postProduct);
}

export function* updateProductSaga() {
  yield takeLatest(getType(postProductAsync.success), getProducts);
}

function* deleteProduct(
    action: ReturnType<typeof deleteProductAsync.request>,
  ): Generator {
    try {
      const response = yield* call(deleteProductsId, action.payload);
      if (response.status === 200) {
        yield put(deleteProductAsync.success(action.payload));
      } else {
        yield put(deleteProductAsync.failure(new Error()));
      }
    } catch (err) {
      yield put(deleteProductAsync.failure(err));
    }
  }
export function* deleteProductSaga() {
    yield takeLatest(getType(deleteProductAsync.request), deleteProduct);
  }

function* editProduct(
    action: ReturnType<typeof editProductAsync.request>,
  ): Generator {
    try {
      const response = yield* call(putProducts, action.payload);
      if (response.status === 200) {
        yield put(editProductAsync.success(response.json));
      } else {
        yield put(editProductAsync.failure(new Error()));
      }
    } catch (err) {
      yield put(editProductAsync.failure(err));
    }
  }

export function* editProductSaga() {
    yield takeLatest(getType(editProductAsync.request), editProduct);
  }

function* findProducts(
  action: ReturnType<typeof findProductsAsync.request>
): Generator {
    try {
      const response = yield* call(postProductsSearch, action.payload);
      if (response.status === 200) {
        yield put(findProductsAsync.success(response.json));
      } else {
        yield put(findProductsAsync.failure(new Error()));
      }
    } catch (err) {
      yield put(findProductsAsync.failure(err));
    }
  }

export function* findProductsSaga() {
    yield takeLatest(getType(findProductsAsync.request), findProducts);
  }


