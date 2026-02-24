import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { fetchAddItem } from "../redux slices/addItemsSlice";

import { setAddItem } from "../redux slices/userInfoSlice";
import { fetchApi } from "../utilities/apiHeader";
import type { itemsType, UserType } from "../utilities/interfaces";
import { setLoginUser } from "../redux slices/loginUserSlice";
import {
  clearLoading,
  setError,
  setLoading,
} from "../redux slices/loadingAndErrorSlice";

interface AddItemResponse {
  msg: string;
  user: UserType;
  task: itemsType;
}

function* sagaAddItem(
  action: PayloadAction<{ userId: number; item: itemsType }>,
) {
  try {
    yield put(setLoading());

    const response: AddItemResponse = yield call(
      fetchApi,
      `/add-item/${action.payload.userId}/`,
      "POST",
      action.payload.item,
      true,
    );

    yield put(
      setAddItem({
        id: response.user.id,
        item: response.task,
      }),
    );
    yield put(
      setLoginUser({
        user: response.user,
        token: sessionStorage.getItem("token") || "",
      }),
    );
    localStorage.setItem("user", JSON.stringify(response.user));
    toast.success(response.msg || "Item added");
    yield put(clearLoading());
  } catch (error: any) {
    const message =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      "Add item failed";
    yield put(setError(message));
  }
}

export function* watchAddItem() {
  yield takeLatest(fetchAddItem.type, sagaAddItem);
}
