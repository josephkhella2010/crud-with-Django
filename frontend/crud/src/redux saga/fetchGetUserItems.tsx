import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  setLoading,
  setError,
  fetchUserItems,
} from "../redux slices/getUserItemsSlice";

import { setGetUserItems } from "../redux slices/userInfoSlice";
import { fetchApi } from "../utilities/apiHeader";
import type { itemsType, UserType } from "../utilities/interfaces";
interface AddItemResponse {
  msg: string;
  user: UserType;
  items: itemsType[];
}
function* fetchGetUserItems(action: PayloadAction<{ userId: number }>) {
  try {
    yield put(setLoading());
    const response: AddItemResponse = yield call(
      fetchApi,
      `/get-user-item/${action.payload.userId}/`,
      "GET",
      null,
      true,
    );
    yield put(
      setGetUserItems({
        id: action.payload.userId, // use the userId you already know
        item: response.items || [], // safe fallback
      }),
    );
  } catch (error: any) {
    const message =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      "Add item failed";
    yield put(setError(message));
  }
}

export function* WatchGetUserItem() {
  yield takeLatest(fetchUserItems.type, fetchGetUserItems);
}
