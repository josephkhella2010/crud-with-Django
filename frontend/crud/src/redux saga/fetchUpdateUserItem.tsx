import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TaskInputType, UserType } from "../utilities/interfaces";
import { fetchUpdateUserItem } from "../redux slices/updateUserItemSlice";
import { setUpdateUserItem } from "../redux slices/userInfoSlice"; // <--- import from users slice
import { toast } from "react-toastify";
import { fetchApi } from "../utilities/apiHeader";
import {
  clearLoading,
  setError,
  setLoading,
} from "../redux slices/loadingAndErrorSlice";
interface ApiResponse {
  msg: string;
  user: UserType; // or your UserType
}

function* fetchDeleteUserItem(
  action: PayloadAction<{
    userId: number;
    itemId: number;
    updatedItem: TaskInputType;
  }>,
) {
  try {
    yield put(setLoading());
    const response: ApiResponse = yield call(
      fetchApi,
      `/update-user-item/userId=${action.payload.userId}/itemId=${action.payload.itemId}/`,
      "PUT",
      action.payload.updatedItem,
      true,
    );
    yield put(
      setUpdateUserItem({
        userId: action.payload.userId,
        itemId: action.payload.itemId,
        updatedItem: action.payload.updatedItem,
      }),
    );

    localStorage.setItem("user", JSON.stringify(response.user));
    toast.success("user successfully  updated items");
    yield put(clearLoading());
  } catch (error: any) {
    console.log(error);
    const message =
      error?.response?.data?.sms ||
      error?.response?.data?.error ||
      "Update failed";
    yield put(setError(message));
  }
}

export function* watchFetchUpdateUserItem() {
  yield takeLatest(fetchUpdateUserItem.type, fetchDeleteUserItem);
}
