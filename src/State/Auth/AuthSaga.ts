import { loginUserAsync, signUpUserAsync } from "./AuthReducer";
import { put, takeLatest } from "redux-saga/effects";
import { postAuthLogin, postAuthSignUp } from "Api/Api";
import { getType } from "typesafe-actions";
import { call } from "typed-redux-saga";

function* loginUser(
  action: ReturnType<typeof loginUserAsync.request>,
): Generator {
  try {
    const response = yield* call(postAuthLogin, action.payload);
    if (response.status === 200) {
      localStorage.setItem("jwtToken", `${response.json.localId}`);
      yield put(loginUserAsync.success(response.json));
    } else {
      yield put(loginUserAsync.failure(new Error(response.json.errorMessage)));
    }
  } catch (err) {
    yield put(loginUserAsync.failure(err));
  }
}
export function* loginUserSaga() {
  yield takeLatest(getType(loginUserAsync.request), loginUser);
}

function* signUpUser(
  action: ReturnType<typeof signUpUserAsync.request>,
): Generator {
  try {
    const response = yield* call(postAuthSignUp, action.payload);
    if (response.status === 200) {
      localStorage.setItem("jwtToken", `Bearer ${response.json.idToken}`);
      yield put(signUpUserAsync.success(response.json));
    } else {
      yield put(signUpUserAsync.failure(new Error(response.json.errorMessage)));
    }
  } catch (err) {
    yield put(signUpUserAsync.failure(err));
  }
}
export function* signUpUserSaga() {
  yield takeLatest(getType(signUpUserAsync.request), signUpUser);
}
