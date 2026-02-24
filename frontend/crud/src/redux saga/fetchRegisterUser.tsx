import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../utilities/interfaces";

import {
  fetchRegisterUserRequest,
  fetchRegisterUserSuccess,
} from "../redux slices/registerUserSlice";

import { setAddUser } from "../redux slices/userInfoSlice";
import { fetchApi } from "../utilities/apiHeader";
import { clearLoading, setError, setLoading } from "../redux slices/loadingAndErrorSlice";

/* 🧠 Worker */
function* fetchApiRegisterUserSaga(action: PayloadAction<Partial<UserType>>) {
  try {
    yield put(setLoading());
    const newUser: UserType = yield call(
      fetchApi,
      "register-user/",
      "POST",
      action.payload,
      false,
    );

    yield put(fetchRegisterUserSuccess(newUser));

    // update users list
    yield put(setAddUser(newUser));
        yield put(clearLoading());
    
  } catch (error: any) {
    yield put(setError(error.response?.data?.sms || error.message));
  }
}

/* 👀 Watcher */
export function* watchRegisterUserSaga() {
  yield takeLatest(fetchRegisterUserRequest.type, fetchApiRegisterUserSaga);
}
