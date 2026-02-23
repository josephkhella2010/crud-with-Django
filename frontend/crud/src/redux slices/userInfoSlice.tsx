import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { itemsType, UserType } from "../utilities/interfaces";

interface UserInfoSliceType {
  users: UserType[];
  loading: boolean;
  error: string | null;
  items: itemsType[];
}
const initialState: UserInfoSliceType = {
  users: [],
  loading: false,
  error: null,
  items: [],
};
const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    /*  this is  all users */
    fetchUserLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchUserFailed: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUsersRequest: (state) => {
      // this action is just a trigger for saga
      state.loading = true;
      state.error = null;
    },
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    /* add user  */
    setAddUser: (state, action: PayloadAction<UserType>) => {
      state.users.push(action.payload);
    },
    setUpadteUser: (state, action: PayloadAction<UserType>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);

      if (index !== -1) {
        // update existing user
        state.users[index] = { ...state.users[index], ...action.payload };
      } else {
        // if user not in users array, add it
        state.users.push(action.payload);
      }
      localStorage.setItem("user", JSON.stringify(action.payload));

      state.loading = false;
      state.error = null;

      // update localStorage for sync
    },
    setAddItem: (
      state,
      action: PayloadAction<{ id: number; item: itemsType }>,
    ) => {
      const findUser = state.users.find((u) => u.id === action.payload.id);
      if (!findUser) return;
      if (!findUser.items) {
        findUser.items = [];
      }
      findUser.items.push(action.payload.item);
      state.items = findUser.items;
    },
    setGetUserItems: (
      state,
      action: PayloadAction<{ id: number; item: itemsType[] }>,
    ) => {
      const finUser = state.users.find((u) => u.id === action.payload.id);
      if (!finUser) {
        console.warn(`User with id ${action.payload.id} not found!`);
        return; // Do nothing if user not found
      }
      finUser.items = action.payload.item;
      state.items = action.payload.item;
    },
    setDeleteUserItem: (
      state,
      action: PayloadAction<{ userId: number; itemId: number }>,
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (!user || !user.items) return;
      const userItems = user.items;
      const findItem = userItems.filter((i) => i.id !== action.payload.itemId);
      state.items = findItem;
      user.items = findItem;
      const storagedUser = localStorage.getItem("user");
      const updateUser = storagedUser ? JSON.parse(storagedUser) : null;
      updateUser.items = findItem;
      localStorage.setItem("user", JSON.stringify(updateUser));
    },
    setUpdateUserItem: (
      state,
      action: PayloadAction<{
        userId: number;
        itemId: number;
        updatedItem: { title: string; task: string; complete: boolean };
      }>,
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (!user || !user.items) return;

      user.items = user.items.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, ...action.payload.updatedItem }
          : item,
      );

      state.items = user.items;
    },
  },
});

export const {
  fetchUserLoading,
  setUsers,
  fetchUserFailed,
  fetchUsersRequest,
  setAddUser,
  setUpadteUser,
  setAddItem,
  setGetUserItems,
  setDeleteUserItem,
  setUpdateUserItem,
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
