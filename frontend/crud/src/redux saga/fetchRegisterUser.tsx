import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import type { UserType } from "../utilities/interfaces";
import { setAddUser } from "../redux slices/userInfoSlice";
import {
  fetchRegisterUserRequest,
  fetchRegisterUserSuccess,
  fetchUserFailed,
} from "../redux slices/registerUserSlice";

// 1️⃣ API call
export async function fetchApiRegisterUser(
  userData: Partial<UserType>,
): Promise<UserType> {
  const response = await axios.post(
    "https://crud-with-django-ix73.onrender.com/api/register-user/",
    userData,
  );
  return response.data;
}

// 2️⃣ Saga worker
function* fetchApiRegisterUserSaga(
  action: ReturnType<typeof fetchRegisterUserRequest>,
) {
  try {
    // Call the API
    const newUser: UserType = yield call(fetchApiRegisterUser, action.payload);

    // Log the newly created user
    console.log("🆕 New user created:", newUser);

    // Dispatch success with the new user
    yield put(fetchRegisterUserSuccess(newUser));

    // Add the user to userInfoSlice
    yield put(setAddUser(newUser));
  } catch (error: any) {
    console.log("Register error:", error.response?.data?.sms || error.message);
    yield put(fetchUserFailed(error.response?.data?.sms || error.message));
  }
}

// 3️⃣ Saga watcher
export function* watchRegisterUserSaga() {
  yield takeLatest(fetchRegisterUserRequest, fetchApiRegisterUserSaga);
}
