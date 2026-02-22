import { createUseStyles } from "react-jss";
import DesktopNavigation from "./childComponent/DesktopNavigation";
import MobileNavigation from "./childComponent/MobileNavigation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDeleteUsersRequest } from "../../redux slices/deleteUserSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toast } from "react-toastify";
import { setlogoutUser } from "../../redux slices/loginUserSlice";

export const cssStyle = createUseStyles({
  navBarWrapper: {
    backgroundColor: "green",
    width: "100%",
    padding: "0px 20px",
    height: "60px",
  },
  navBarMainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "60px",
  },
  navBarContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px",
    position: "relative",
    height: "60px",
  },

  logoContainer: {
    width: "40px",
    height: "40px",
    cursor: "pointer",
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
  rightnavBarContainer: {
    width: "90%",
    backgroundColor: "yellow",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
});
export default function NavigationContainer() {
  const classes = cssStyle();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.LoginInfoData);
  /* functions */
  /* if  */

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 650) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  /*  */
  /* delete */
  function handleDelete() {
    if (!userInfo?.user?.id) return;

    dispatch(fetchDeleteUsersRequest(userInfo.user.id));
  }
  /* logout */
  function handleLogOut() {
    dispatch(setlogoutUser());
    toast.success("logout successfully 🎉");
  }

  /*  */
  return (
    <div className={classes.navBarWrapper}>
      <div className={classes.navBarMainContainer}>
        <div className={classes.navBarContainer}>
          <div className={classes.logoContainer} onClick={() => navigate("/")}>
            <img src="/foto/logo.png" alt="not found" />
          </div>
          {isMobile ? (
            <MobileNavigation
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
              handleDelete={handleDelete}
              handleLogOut={handleLogOut}
            />
          ) : (
            <DesktopNavigation
              handleDelete={handleDelete}
              handleLogOut={handleLogOut}
            />
          )}
        </div>
      </div>
    </div>
  );
}
