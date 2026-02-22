import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";

export const cssStyle = createUseStyles({
  desktopNavBarContainer: {
    width: "90%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  desktopNavBarList: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    listStyle: "none",
    width: "100%",
    "& li": {
      listStyle: "none",
      cursor: "pointer",
    },
  },
  btnContainer: {
    display: "flex",
    gap: "20px",
    cursor: "pointer",
  },
});

interface PropsType {
  handleDelete: any;
  handleLogOut: any;
}
export default function DesktopNavigation({
  handleDelete,
  handleLogOut,
}: PropsType) {
  const classes = cssStyle();
  const { token } = useSelector(
    (state: RootState) => state.LoginInfoData.userInfo,
  );
  const navigate = useNavigate();
  //console.log(token);
  /* function */
  const handleListClick = (name: string) => {
    if (name === "item" && token) {
      navigate("/add-task");
    }
    if (name === "item" && !token) {
      alert("please login to go to item");
    }
    if (name === "register") {
      navigate("/register");
    }
    if (name === "login") {
      navigate("/login");
    }
  };

  /*  */
  return (
    <div className={classes.desktopNavBarContainer}>
      <ul className={classes.desktopNavBarList}>
        <li onClick={() => handleListClick("item")}>Show Items</li>
        <li onClick={() => handleListClick("register")}> Register</li>
        <li onClick={() => handleListClick("login")}> Login</li>
        {token && (
          <div className={classes.btnContainer}>
            <p onClick={() => handleDelete()}> delete User</p>
            <p onClick={handleLogOut}> logout</p>
          </div>
        )}
      </ul>
    </div>
  );
}
