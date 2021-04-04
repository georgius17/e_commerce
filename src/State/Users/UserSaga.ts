import { deleteUsersId, getUsersId, getUsersList } from "Api/Api";
import { put, takeLatest } from "redux-saga/effects";
import { call } from "typed-redux-saga";
import { getType } from "typesafe-actions";
import {
  deleteUsersAsync, getUsersAsync,
  getUsersDetailAsync
} from "./UserReducer";

function* getUsers(): Generator {
  try {
    const response = yield* call(getUsersList);
    if (response.status === 200) {
      yield put(getUsersAsync.success(response.json));
    } else {
      yield put(getUsersAsync.failure(new Error()));
    }
  } catch (err) {
    yield put(getUsersAsync.failure(err));
  }
}
export function* getUsersSaga() {
  yield takeLatest(getType(getUsersAsync.request), getUsers);
}

function* getUserDetail(
  action: ReturnType<typeof getUsersDetailAsync.request>,
): Generator {
  try {
    const response = yield* call(getUsersId, action.payload);
    if (response.status === 200) {
      yield put(getUsersDetailAsync.success(response.json));
    } else {
      yield put(getUsersDetailAsync.failure(new Error()));
    }
  } catch (err) {
    yield put(getUsersDetailAsync.failure(err));
  }
}
export function* getUserDetailSaga() {
  yield takeLatest(getType(getUsersDetailAsync.request), getUserDetail);
}

function* deleteUser(
  action: ReturnType<typeof deleteUsersAsync.request>,
): Generator {
  try {
    const response = yield* call(deleteUsersId, action.payload);
    if (response.status === 200) {
      yield put(deleteUsersAsync.success(response.json));
    } else {
      yield put(deleteUsersAsync.failure(new Error()));
    }
  } catch (err) {
    yield put(deleteUsersAsync.failure(err));
  }
}
export function* deleteUserSaga() {
  yield takeLatest(getType(getUsersDetailAsync.request), deleteUser);
}
