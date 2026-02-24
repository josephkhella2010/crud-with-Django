/* import { call, put, takeLatest } from "redux-saga/effects";

import {
  loadingDeleteUser,
  setDeleteError,
  fetchDeleteUsersRequest,
  setDeleteUser,
} from "../redux slices/deleteUserSlice";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const token = localStorage.getItem("token") || null;
async function deleteUserApi(id: number) {
  const response = await axios.delete(
    `https://crud-with-django-ix73.onrender.com/api/delete-user/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

function* fetchDeleteUser(action: PayloadAction<number>) {
  try {
    yield put(loadingDeleteUser());
    // call API
    yield call(deleteUserApi, action.payload);
    yield put(setDeleteUser());
    toast.success("user Deleted sucessfully");
  } catch (error: any) {
    const message =
      error?.response?.data?.sms ||
      error?.response?.data?.error ||
      "Login failed";
    yield put(setDeleteError(message));
  }
}

export function* watchDeleteUser() {
  yield takeLatest(fetchDeleteUsersRequest.type, fetchDeleteUser);
}
 */
import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  fetchDeleteUsersRequest,
  setDeleteUser,
} from "../redux slices/deleteUserSlice";

import { fetchApi } from "../utilities/apiHeader";
import { toast } from "react-toastify";
import { clearLoading, setError, setLoading } from "../redux slices/loadingAndErrorSlice";

/* 🧠 Worker */
function* fetchDeleteUser(action: PayloadAction<number>) {
  try {
    yield put(setLoading());

    // ✅ Use shared API helper (JWT automatically included)
    yield call(
      fetchApi,
      `delete-user/${action.payload}/`, // endpoint
      "DELETE", // method
      undefined, // no body
      true, // requires JWT
    );

    yield put(setDeleteUser());

    toast.success("User Deleted successfully");
        yield put(clearLoading());
    
  } catch (error: any) {
    const message =
      error?.response?.data?.sms ||
      error?.response?.data?.error ||
      "Delete failed";

    yield put(setError(message));
  }
}

/* 👀 Watcher */
export function* watchDeleteUser() {
  yield takeLatest(fetchDeleteUsersRequest.type, fetchDeleteUser);
}
