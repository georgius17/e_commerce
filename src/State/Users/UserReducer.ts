import { Result, UserDto } from "Api/Api";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";

export type UsersState = {
  users: UserDto[];
  userDetail: UserDto | null;
  isLoading: boolean;
  errorCode: string | null;
};

export const getUsersAsync = createAsyncAction(
  "@user/GET_USERS_REQUEST",
  "@user/GET_USERS_SUCCESS",
  "@user/GET_USERS_FAILURE",
)<void, UserDto[], Error>();

export const getUsersDetailAsync = createAsyncAction(
  "@user/GET_USER_DETAIL_REQUEST",
  "@user/GET_USER_DETAIL_SUCCESS",
  "@user/GET_USER_DETAIL_FAILURE",
)<number, UserDto, Error>();

export const deleteUsersAsync = createAsyncAction(
  "@user/DELETE_USER_REQUEST",
  "@user/DELETE_USER_SUCCESS",
  "@user/DELETE_USER_FAILURE",
)<number, Result, Error>();

export type UserAction =
  | ActionType<typeof getUsersAsync>
  | ActionType<typeof getUsersDetailAsync>;

export const userReducer = createReducer<UsersState, UserAction>({
  users: [],
  userDetail: null,
  isLoading: false,
  errorCode: null,
})
  .handleAction(getUsersAsync.success, (state, action) => {
    return {
      ...state,
      users: action.payload,
      errorCode: null,
      isLoading: false,
    };
  })
  .handleAction(getUsersAsync.request, state => {
    return { ...state, isLoading: true };
  })
  .handleAction(getUsersAsync.failure, (state, action) => {
    return {
      ...state,
      errorCode: action.payload.message,
      isLoading: false,
    };
  })
  .handleAction(getUsersDetailAsync.success, (state, action) => {
    return {
      ...state,
      userDetail: action.payload,
    };
  });
