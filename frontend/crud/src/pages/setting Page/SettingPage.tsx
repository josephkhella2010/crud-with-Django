import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { FaUserEdit, FaUserTie } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { fetchDeleteUsersRequest } from "../../redux slices/deleteUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setlogoutUser } from "../../redux slices/loginUserSlice";
import type { RootState } from "../../store/store";

export const cssStyle = createUseStyles({
  settingMainContainer: {
    width: "100%",
    height: "100dvh",
  },
  settingContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "100px 20px",
  },
  settingSection: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    border: "1px solid green",
    padding: "50px",
    boxShadow: "0 2px 8px rgba(0, 128, 0, 0.15)",
    borderRadius: 10,
    "& h1": {
      display: "flex",
      gap: "8px",
      cursor: "pointer",
      textAlign: "center",
    },
  },
  settingListSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    listStyle: "none",
    "& li:nth-of-type(3)": {
      "& span": {
        "&:hover": {
          color: "red",
        },
      },
    },
    "& li": {
      display: "flex",
      gap: "8px",
      cursor: "pointer",
      fontSize: "20px",
      "& span": {
        "&:hover": {
          color: "#2ace2a",
        },
      },
    },
  },
});
export default function SettingPage() {
  const classes = cssStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.LoginInfoData);

  /*  functions */
  /* logout */
  function handleLogOut() {
    dispatch(setlogoutUser());
    toast.success("logout successfully 🎉");
  }
  /* delete */
  function handleDelete() {
    if (!userInfo?.user?.id) return;

    dispatch(fetchDeleteUsersRequest(userInfo.user.id));
    dispatch(setlogoutUser());
  }

  /*  */

  return (
    <div className={classes.settingMainContainer}>
      <div className={classes.settingContainer}>
        <div className={classes.settingSection}>
          <h1>
            <FaUserGear />
            User Setting
          </h1>
          <ul className={classes.settingListSection}>
            <li
              onClick={() => navigate("/update-profile")}
              style={{ color: "green" }}
            >
              <FaUserEdit style={{ color: "green" }} />
              <span> Update User</span>
            </li>

            <li
              style={{ color: "green" }}
              onClick={() => navigate("/user-info")}
            >
              <FaUserTie />
              <span> User Information</span>
            </li>
            <li
              onClick={() => {
                handleDelete();
                navigate("/");
              }}
              style={{ color: "green" }}
            >
              <AiOutlineUsergroupDelete />
              <span> Delete User</span>
            </li>
            <li
              onClick={() => {
                handleLogOut();
                navigate("/#/");
              }}
              style={{ color: "green" }}
            >
              <IoIosLogOut />
              <span> Logout User </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
