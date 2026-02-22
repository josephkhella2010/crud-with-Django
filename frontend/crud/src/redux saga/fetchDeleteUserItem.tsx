import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  setLoading,
  setError,
  fetchDeleteUserItemReqest,
} from "../redux slices/deleteUserItemSlice";

import { setDeleteUserItem } from "../redux slices/userInfoSlice";
import { fetchApi } from "../utilities/apiHeader";
import type { itemsType, UserType } from "../utilities/interfaces";
interface AddItemResponse {
  msg: string;
  user: UserType;
  items: itemsType[];
}

function* fetchDeleteUserItem(
  action: PayloadAction<{ userId: number; itemId: number }>,
) {
  try {
    yield put(setLoading());
    const response: AddItemResponse = yield call(
      fetchApi,
      `/delete-user-item/userId=${action.payload.userId}/itemId=${action.payload.itemId}/`,
      "DELETE",
      null,
      true,
    );
    yield put(
      setDeleteUserItem({
        userId: action.payload.userId,
        itemId: action.payload.itemId,
      }),
    );
    toast.success("sucessfully Delete User Item");
  } catch (error: any) {
    console.log(error);
    const message =
      error?.response?.data?.sms ||
      error?.response?.data?.error ||
      "Update failed";
    yield put(setError(message));
  }
}

export function* watchDeleteUserItem() {
  yield takeLatest(fetchDeleteUserItemReqest.type, fetchDeleteUserItem);
}
