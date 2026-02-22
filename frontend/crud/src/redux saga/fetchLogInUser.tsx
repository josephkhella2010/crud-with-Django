import { call, put, takeLatest } from "redux-saga/effects";
import {
  loadingLoginUser,
  setLoginError,
  setLoginUser,
  fetchLoginUserRequest,
} from "../redux slices/loginUserSlice";
import type { LoginPayload, UserType } from "../utilities/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "../utilities/apiHeader";

// Response type from backend
export type LoginResponse = {
  user: UserType;
  token: string;
};

// Worker saga: handles login
function* fetchLoginUser(action: PayloadAction<LoginPayload>) {
  try {
    yield put(loadingLoginUser());

    // Call API with flat payload
    const response: LoginResponse = yield call(
      fetchApi<LoginResponse>,
      "/login-user/",
      "POST",
      action.payload,
      false, 
    );

    const { user, token } = response;

    // Store user and token in Redux
    yield put(setLoginUser({ user, token }));
  } catch (error: any) {
    // Extract error message from backend
    const message =
      error?.response?.data?.sms ||
      error?.response?.data?.error ||
      "Login failed";

    yield put(setLoginError(message));
  }
}

// Watcher saga: listens for login requests
export function* watchLoginUserSaga() {
  yield takeLatest(fetchLoginUserRequest.type, fetchLoginUser);
}
