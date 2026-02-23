import { createUseStyles } from "react-jss";
import DesktopNavigation from "./childComponent/DesktopNavigation";
import MobileNavigation from "./childComponent/MobileNavigation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const cssStyle = createUseStyles({
  navBarWrapper: {
    backgroundColor: "green",
    width: "100%",
    padding: "0px 20px",
    height: "60px",
    position: "fixed",
    zIndex: "100",
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

  /*  */
  return (
    <div className={classes.navBarWrapper}>
      <div className={classes.navBarMainContainer}>
        <div className={classes.navBarContainer}>
          <div
            className={classes.logoContainer}
            onClick={() => {
              navigate("/");
              setShowMobileMenu(false);
            }}
          >
            <img src="/foto/logo.png" alt="not found" />
          </div>
          {isMobile ? (
            <MobileNavigation
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
            />
          ) : (
            <DesktopNavigation />
          )}
        </div>
      </div>
    </div>
  );
}
