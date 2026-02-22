import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../utilities/interfaces";

import {
  fetchLoading,
  fetchError,
  fetchUpdateUserRequest,
} from "../redux slices/updateUserSlice";
import {
  fetchUsersRequest,
  setUpadteUser,
} from "../redux slices/userInfoSlice"; // <--- import from users slice
import { toast } from "react-toastify";
import { fetchApi } from "../utilities/apiHeader";

async function apiUpdate(userId: number, payload: UserType): Promise<UserType> {
  return await fetchApi<UserType>(
    `update-user/${userId}/`,
    "PUT",
    payload,
    true, // use JWT
  );
}

function* fetchUpdateUser(
  action: PayloadAction<{ id: number; data: UserType }>,
) {
  try {
    yield put(fetchLoading());
    const apiResponse: { sms: string; user: UserType } = yield call(
      apiUpdate,
      action.payload.id,
      action.payload.data,
    );

    // ✅ update Redux store with sms + user
    yield put(setUpadteUser(apiResponse.user));

    // ✅ localStorage only stores user
    localStorage.setItem("user", JSON.stringify(apiResponse.user));

    // optional: show toast
    toast.success("user sucessfully updated");

    // optional: refresh all users
    yield put(fetchUsersRequest());
  } catch (error: any) {
    const message =
      error?.response?.data?.sms ||
      error?.response?.data?.error ||
      "Update failed";
    yield put(fetchError(message));
  }
}

export function* watchUpdateUser() {
  yield takeLatest(fetchUpdateUserRequest.type, fetchUpdateUser);
}
