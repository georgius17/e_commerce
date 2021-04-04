import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "@redux-saga/core/effects";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  authReducer,
  AuthAction,
  AuthState,
  resetUser,
} from "State/Auth/AuthReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loginUserSaga, signUpUserSaga } from "./Auth/AuthSaga";
import {
  getUsersSaga,
  getUserDetailSaga,
  deleteUserSaga,
} from "./Users/UserSaga";
import { nameof } from "Utils/ObjectUtils";
import { userReducer, UserAction } from "./Users/UserReducer";
import { logError } from "ErrorService";
import { getType } from "typesafe-actions";
import { productsReducer, ProductAction, editProductAsync } from "./Products/ProductsReducer";
import { getProductsSaga, postProductSaga, deleteProductSaga, editProductSaga, findProductsSaga, updateProductSaga } from "./Products/ProductsSaga";
import { ordersReducer, OrderAction } from "./Orders/OrdersReducer";
import { getOrdersSaga, postOrderSaga, deleteOrderSaga } from "./Orders/OrdersSaga";
import { getCategoriesSaga } from "./Categories/CategoriesSaga";
import { postOrdersList } from "Api/Api";
import { categoriesReducer } from "./Categories/CategoriesReducer";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: [nameof<AuthState>("isLoading"), nameof<AuthState>("errorCode")],
};

/**
 * Create global state of application
 */
const combinedReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  users: userReducer,
  products: productsReducer,
  orders: ordersReducer,
  categories: categoriesReducer
});

/**
 * Type of global application state
 */
export type RootStateType = ReturnType<typeof combinedReducer>;

/**
 * All changes, that global application state can handle
 */
export type RootActionType = AuthAction | UserAction | ProductAction | OrderAction;

const rootReducer = (state: RootStateType, action: RootActionType) => {
  if (action.type === getType(resetUser)) {
    state = (undefined as unknown) as RootStateType;
    /*
      This lines violate redux rules, they are creating effects
      But this is safest way to erase all data
      We are reseting whole application state on logout 
    */
    localStorage.clear();
    window.location.reload();
  }

  return combinedReducer(state, action);
};
const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfo) => {
    logError(error, errorInfo);
  },
});

const middlewares = [sagaMiddleware];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

function* rootSaga() {
  yield all([
    loginUserSaga(),
    getUsersSaga(),
    getUserDetailSaga(),
    deleteUserSaga(),
    getProductsSaga(),
    postProductSaga(),
    deleteProductSaga(),
    editProductSaga(),
    findProductsSaga(),
    getOrdersSaga(),
    postOrderSaga(),
    deleteOrderSaga(),
    getCategoriesSaga(),
    signUpUserSaga(),
    updateProductSaga()
  ]);
}

sagaMiddleware.run(rootSaga);

export const useApplicationStore = () => {
  (window as any).applicationStore = store;
  let persistor = persistStore(store as any);
  return { store, persistor };
};
