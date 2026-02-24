import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import { useEffect } from "react";
import { fetchUsersRequest } from "../../../redux slices/userInfoSlice";

interface PropsType {
  setShowMobileMenu?: (showMobileMenu: boolean) => void;
}

export const cssStyle = createUseStyles({
  avatarContainer: {
    borderRadius: "50%",
    padding: "15px",
    cursor: "pointer",
    color: "white",
    letterSpacing: "3px",
    "@media (max-width: 1500px)": {
      backgroundColor: "#5ea75e",
    },
    "@media (max-width: 650px)": {
      backgroundColor: "green",
    },
  },
});

export default function UserNameSection({ setShowMobileMenu }: PropsType) {
  const classes = cssStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userStorage = localStorage.getItem("user");
  const storedUser = userStorage ? JSON.parse(userStorage) : null;

  const { token } = useSelector(
    (state: RootState) => state.LoginInfoData.userInfo,
  );

  const user = useSelector((state: RootState) =>
    state.UserInfoData.users.find((u) => u.id === storedUser?.id),
  );
  const username = user?.username
    ? (user.username?.[0]?.toUpperCase() || "") +
      (user.username?.slice(-1)?.toUpperCase() || "")
    : "";
  // fetch all users
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);
  console.log("user", user);
  return (
    <>
      {token && (
        <div
          onClick={() => {
            navigate("/setting-user");
            setShowMobileMenu?.(false);
          }}
          className={classes.avatarContainer}
          title="Update Details"
        >
          <h3>{username}</h3>
        </div>
      )}
    </>
  );
}
