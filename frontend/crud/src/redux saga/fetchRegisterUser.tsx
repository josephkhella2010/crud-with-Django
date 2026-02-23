import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../utilities/interfaces";

import {
  fetchRegisterUserRequest,
  fetchRegisterUserSuccess,
  fetchUserFailed,
} from "../redux slices/registerUserSlice";

import { setAddUser } from "../redux slices/userInfoSlice";
import { fetchApi } from "../utilities/apiHeader";

/* 🧠 Worker */
function* fetchApiRegisterUserSaga(action: PayloadAction<Partial<UserType>>) {
  try {
    // ✅ Correctly call generic API
    const newUser: UserType = yield call(
      fetchApi,
      "register-user/", // endpoint
      "POST", // method
      action.payload, // data
      false, // register doesn't need JWT
    );

    yield put(fetchRegisterUserSuccess(newUser));

    // update users list
    yield put(setAddUser(newUser));
  } catch (error: any) {
    yield put(fetchUserFailed(error.response?.data?.sms || error.message));
  }
}

/* 👀 Watcher */
export function* watchRegisterUserSaga() {
  yield takeLatest(fetchRegisterUserRequest.type, fetchApiRegisterUserSaga);
}
