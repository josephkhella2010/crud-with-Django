import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";

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
  const { token } = useSelector(
    (state: RootState) => state.LoginInfoData.userInfo,
  );
  const userStorage = localStorage.getItem("user");

  const user = userStorage ? JSON.parse(userStorage) : null;
  console.log(token, user);
  const username =
    user?.username.slice(0, 1).toUpperCase() +
    user?.username.slice(-1).toUpperCase();
  const navigate = useNavigate();
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
