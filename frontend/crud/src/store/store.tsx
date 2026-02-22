import { configureStore } from "@reduxjs/toolkit";
import userInfoSliceReducer from "../redux slices/userInfoSlice";
import registerUserSliceReducer from "../redux slices/registerUserSlice";
import loginUserSliceReducer from "../redux slices/loginUserSlice";
import deleteUserSliceReducer from "../redux slices/deleteUserSlice";
import addItemsSliceReducer from "../redux slices/addItemsSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux saga/rootSage";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    UserInfoData: userInfoSliceReducer,
    RegisterInfoData: registerUserSliceReducer,
    LoginInfoData: loginUserSliceReducer,
    logoutUser: deleteUserSliceReducer,
    itemInfo: addItemsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Run Saga
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
