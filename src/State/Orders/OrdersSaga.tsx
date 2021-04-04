import { postOrdersList, deleteOrdersId, postOrders, OrderDTO} from "../../Api/Api";
import { put, takeLatest } from "redux-saga/effects";
import { call } from "typed-redux-saga";
import { getType } from "typesafe-actions";
import {
    getOrdersAsync, postOrderAsync, deleteOrderAsync,
} from "./OrdersReducer";
import { buyProductSync } from "State/Products/ProductsReducer";


const API_URL = process.env.REACT_APP_API_URL;

function* getOrders(
    action: ReturnType<typeof getOrdersAsync.request>,
): Generator {
    try {
      const response = yield* call(postOrdersList, action.payload);
      if (response.status === 200) {
        let newOrders = [];
        const orders = response.json;
        
          for (const key in orders) {
            if (!action.payload.allOrders) {
              let newOrder = orders[key];
              newOrder.orderId = key;
              newOrders.push(newOrder);
            } else {
              for (const ord in orders[key]) {
                console.log(ord);
              }
            }
          }
        
        yield put(getOrdersAsync.success(newOrders));
      } else {
        yield put(getOrdersAsync.failure(new Error()));
      }
    } catch (err) {
      yield put(getOrdersAsync.failure(err));
    }
  }

export function* getOrdersSaga() {
    yield takeLatest(getType(getOrdersAsync.request), getOrders);
  }

function* postOrder(
  action: ReturnType<typeof postOrderAsync.request>,
): Generator {
  try {
   // const token = localStorage.getItem("jwtToken")
    const response = yield* call(postOrders, action.payload);
    if (response.status === 200) {
      yield put(postOrderAsync.success(response.json));
    } else {
      yield put(postOrderAsync.failure(new Error()));
    }
  } catch (err) {
    yield put(postOrderAsync.failure(err));
  }
}

export function* postOrderSaga() {
  yield takeLatest(getType(postOrderAsync.request), postOrder);
}

function* deleteOrder(
    action: ReturnType<typeof deleteOrderAsync.request>,
  ): Generator {
    try {
      const response = yield* call(deleteOrdersId, action.payload);
      if (response.status === 200) {
        yield put(deleteOrderAsync.success(action.payload));
      } else {
        yield put(deleteOrderAsync.failure(new Error()));
      }
    } catch (err) {
      yield put(deleteOrderAsync.failure(err));
    }
  }
export function* deleteOrderSaga() {
    yield takeLatest(getType(deleteOrderAsync.request), deleteOrder);
  }



