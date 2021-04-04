import { Result, OrderDTO, GetOrderListQuery } from "../../Api/Api";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";

export type OrdersState = {
  orders: OrderDTO[];
  isLoading: boolean;
  errorCode: string | null;
};

export const getOrdersAsync = createAsyncAction(
  "@orders/GET_ORDERS_REQUEST",
  "@orders/GET_ORDERS_SUCCESS",
  "@orders/GET_ORDERS_FAILURE",
)<GetOrderListQuery, OrderDTO[], Error>();

export const postOrderAsync = createAsyncAction(
  "@orders/POST_ORDERS_REQUEST",
  "@orders/POST_ORDERS_SUCCESS",
  "@orders/POST_ORDERS_FAILURE",
)<OrderDTO, OrderDTO, Error>();

export const deleteOrderAsync = createAsyncAction(
  "@orders/DELETE_ORDERS_REQUEST",
  "@orders/DELETE_ORDERS_SUCCESS",
  "@orders/DELETE_ORDERS_FAILURE",
)<number, number, Error>();

export type OrderAction =
  | ActionType<typeof getOrdersAsync>
  | ActionType<typeof postOrderAsync>
  | ActionType<typeof deleteOrderAsync>;

export const ordersReducer = createReducer<OrdersState, OrderAction>({
  orders: [],
  isLoading: false,
  errorCode: null,
})
  .handleAction(getOrdersAsync.success, (state, action) => {
    return {
      ...state,
      orders: action.payload,
      errorCode: null,
      isLoading: false,
    };
  })
  .handleAction(getOrdersAsync.request, state => {
    return { ...state, isLoading: true };
  })
  .handleAction(getOrdersAsync.failure, (state, action) => {
    return {
      ...state,
      errorCode: action.payload.message,
      isLoading: false,
    };
  })
  .handleAction(postOrderAsync.success, (state, action) => {
    const orders = [...state.orders, action.payload];
    return {
        ...state,
        orders: orders,
        isLoading: false 
    };
  })
  .handleAction(postOrderAsync.request, state => {
    return { ...state, isLoading: true };
  })
  .handleAction(postOrderAsync.failure, (state, action) => {
    return {
      ...state,
      errorCode: action.payload.message,
      isLoading: false,
    };
  })
  .handleAction(deleteOrderAsync.success, (state, action) => {
    const orders = state.orders.filter(order => order.orderId !== action.payload);
    return {
      ...state,
      orders: orders,
      errorCode: null,
      isLoading: false,
    };
  })
  .handleAction(deleteOrderAsync.request, state => {
    return { ...state, isLoading: true };
  })
  .handleAction(deleteOrderAsync.failure, (state, action) => {
    return {
      ...state,
      errorCode: action.payload.message,
      isLoading: false,
    };
  })
  

