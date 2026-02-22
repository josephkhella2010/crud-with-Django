import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserLoading,
  setUsers,
  fetchUserFailed,
  fetchUsersRequest,
} from "../redux slices/userInfoSlice";
import type { UsersResponse } from "../utilities/interfaces";
import { fetchApi } from "../utilities/apiHeader";

function* fetchApiUser() {
  try {
    yield put(fetchUserLoading());
    const response: UsersResponse = yield call(() =>
      fetchApi<UsersResponse>("/users", "GET", {}, true),
    );
    const { users } = response;
    yield put(setUsers(users));
  } catch (error) {
    yield put(fetchUserFailed((error as Error).message));
  }
}

export function* watchFetchUser() {
  yield takeLatest(fetchUsersRequest.type, fetchApiUser);
}
