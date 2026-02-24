import { call, put, takeLatest } from "redux-saga/effects";
import { setUsers, fetchUsersRequest } from "../redux slices/userInfoSlice";
import type { UsersResponse } from "../utilities/interfaces";
import { fetchApi } from "../utilities/apiHeader";
import { clearLoading, setError, setLoading } from "../redux slices/loadingAndErrorSlice";

function* fetchApiUser() {
  try {
    yield put(setLoading());
    const response: UsersResponse = yield call(() =>
      fetchApi<UsersResponse>("/users", "GET", {}, true),
    );
    const { users } = response;
    yield put(setUsers(users));
        yield put(clearLoading());
    
  } catch (error) {
    yield put(setError((error as Error).message));
  }
}

export function* watchFetchUser() {
  yield takeLatest(fetchUsersRequest.type, fetchApiUser);
}
