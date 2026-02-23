import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchUsersRequest } from "../../redux slices/userInfoSlice";

export const cssStyle = createUseStyles({
  userInfoMainContainer: {
    width: "100%",
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    padding: "100px 20px",
  },
  userInfoContainer: {
    gap: 30,
    border: "1px solid green",
    display: "flex",
    padding: 50,
    boxShadow: "0 2px 8px rgba(0, 128, 0, 0.15)",
    borderRadius: 10,
    flexDirection: "column",
    height: "fit-content",
    width: "35%",
    "@media (max-width: 1000px)": {
      width: "50%",
    },
    "@media (max-width: 650px)": {
      width: "100%",
    },
    "& h2": {
      textAlign: "center",
    },
  },
});
export default function UserInfoPage() {
  const classes = cssStyle();
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.UserInfoData);
  const StorageUser = localStorage.getItem("user");
  const user = StorageUser ? JSON.parse(StorageUser) : null;
  const findUser = users.find((u) => u.id === user.id);

  console.log("findUser", findUser);

  /* function*/

  /* get users */
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);
  return (
    <div className={classes.userInfoMainContainer}>
      <div className={classes.userInfoContainer}>
        <h2> User Information</h2>
        <h3>
          {" "}
          Name: <span>{findUser?.username}</span>
        </h3>
        <h3>
          Email: <span>{findUser?.email} </span>
        </h3>
      </div>
    </div>
  );
}
