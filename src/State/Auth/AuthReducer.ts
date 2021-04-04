import {
  createReducer,
  ActionType,
  createAction,
  createAsyncAction,
} from "typesafe-actions";
import { AuthResult, AuthRequest } from "Api/Api";

export type AppUser = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type AuthState = {
  user: AppUser | null;
  errorCode: string | null;
  isLoading: boolean;
};

export const resetUser = createAction("@auth/RESET")<void>();

export const loginUserAsync = createAsyncAction(
  "@auth/LOGIN_REQUEST",
  "@auth/LOGIN_SUCCESS",
  "@auth/LOGIN_FAILURE",
)<AuthRequest, AuthResult, Error>();

export const signUpUserAsync = createAsyncAction(
  "@auth/SIGNUP_REQUEST",
  "@auth/SIGNUP_SUCCESS",
  "@auth/SIGNUP_FAILURE",
)<AuthRequest, AuthResult, Error>();

export type AuthAction =
  | ActionType<typeof loginUserAsync>
  | ActionType<typeof signUpUserAsync>
  | ActionType<typeof resetUser>;

export const authReducer = createReducer<AuthState, AuthAction>({
  user: null,
  errorCode: null,
  isLoading: false,
})
  .handleAction(loginUserAsync.request, state => {
    return { ...state, isLoading: true };
  })
  .handleAction(loginUserAsync.success, (state, action) => {
    console.log(action.payload);
    //if (action.payload.isSuccessful) {
      const user: AppUser = {
        email: action.payload.email,
        firstName: action.payload.displayName,
        lastName: "",
        role: "Admin"
      };

      return { ...state, user, errorCode: null, isLoading: false };
  })
  .handleAction(loginUserAsync.failure, (state, action) => {
    return {
      ...state,
      errorCode: action.payload.message,
      isLoading: false,
    };
  })
  .handleAction(resetUser, state => {
    return { ...state, user: null };
  })
  .handleAction(signUpUserAsync.request, state => {
    return { ...state, isLoading: true };
  })
  .handleAction(signUpUserAsync.success, (state, action) => {
    console.log(action.payload);
    //if (action.payload.isSuccessful) {
      const user: AppUser = {
        email: action.payload.email,
        firstName: action.payload.displayName,
        lastName: "",
        role: "admin"
      };

      return { ...state, user, errorCode: null, isLoading: false };
  })
  .handleAction(signUpUserAsync.failure, (state, action) => {
    return {
      ...state,
      errorCode: action.payload.message,
      isLoading: false,
    };
  })
