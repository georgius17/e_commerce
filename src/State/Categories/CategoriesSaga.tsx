import { getCategoriesList } from "../../Api/Api";
import { put, takeLatest } from "redux-saga/effects";
import { call } from "typed-redux-saga";
import { getType } from "typesafe-actions";
import { getCategoriesAsync } from "./CategoriesReducer";

const API_URL = process.env.REACT_APP_API_URL;

function* getCategories(
  action: ReturnType<typeof getCategoriesAsync.request>,
): Generator {
  try {
    const response = yield* call(getCategoriesList);
    if (response.status === 200) {
      yield put(getCategoriesAsync.success(response.json));
    } else {
      yield put(getCategoriesAsync.failure(new Error()));
    }
  } catch (err) {
    yield put(getCategoriesAsync.failure(err));
  }
}

export function* getCategoriesSaga() {
  yield takeLatest(getType(getCategoriesAsync.request), getCategories);
}
