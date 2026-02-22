import { all } from "redux-saga/effects";
import { watchFetchUser } from "./fetchGetUser";
import { watchRegisterUserSaga } from "./fetchRegisterUser";
import { watchLoginUserSaga } from "./fetchLogInUser";
import { watchDeleteUser } from "./fetchDeleteUser";
import { watchUpdateUser } from "./fetchUpdateUser";
import { watchAddItem } from "./fetchAddItem";
import { WatchGetUserItem } from "./fetchGetUserItems";
import { watchDeleteUserItem } from "./fetchDeleteUserItem";
import { watchFetchUpdateUserItem } from "./fetchUpdateUserItem";

export default function* rootSaga() {
  yield all([
    watchFetchUser(),
    watchRegisterUserSaga(),
    watchLoginUserSaga(),
    watchDeleteUser(),
    watchUpdateUser(),
    watchAddItem(),
    WatchGetUserItem(),
    watchDeleteUserItem(),
    watchFetchUpdateUserItem(),
  ]);
}
