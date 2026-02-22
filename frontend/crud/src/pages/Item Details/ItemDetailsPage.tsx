import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../store/store";
import { fetchUsersRequest } from "../../redux slices/userInfoSlice";
import ItemInfo from "./childComponent/ItemInfo";
import { createUseStyles } from "react-jss";

export const cssStyle = createUseStyles({
  itemDetailsWrapper: {
    width: "100%",
    minHeight: "100dvh",
  },
});
export default function ItemDetailsPage() {
  const classes = cssStyle();
  const { id } = useParams();
  const { users } = useSelector((state: RootState) => state.UserInfoData);
  const userStorage = localStorage.getItem("user");
  const user = userStorage ? JSON.parse(userStorage) : {};
  const dispatch = useDispatch();
  const itemId = Number(id);

  /* get all users and then filter */
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);
  console.log(users);
  const getUser = users.find((u) => u.username === user.username);
  const getUserItem = getUser?.items;
  if (!getUser) return;
  console.log("getUserItem", getUserItem);
  const filteredUserItem = getUserItem?.filter((i) => i.id === itemId);

  /*  */
  console.log(id);
  return (
    <div className={classes.itemDetailsWrapper}>
      <ItemInfo filteredUserItem={filteredUserItem} />
    </div>
  );
}
