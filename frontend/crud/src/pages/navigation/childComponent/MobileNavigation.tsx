import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import UserNameSection from "./UserNameSection";

interface PropsType {
  showMobileMenu: boolean;
  setShowMobileMenu: (showMobileMenu: boolean) => void;
}

export const cssStyle = createUseStyles({
  mobileNavBarContainer: {},
  mobileMainNavBarListContainer: {
    width: "100%",
    height: "100dvh",
    left: "100%",
    top: "60px",
    position: "fixed",
    transition: "left 0.4s linear",
    backgroundColor: "#57aa73",
    fontFamily: "emoji",
  },
  mobileNavBarArrowContainer: {
    padding: "50px 20px 0px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "30px",
  },

  mobileNavBarArrowIcon: {
    cursor: "pointer",
  },
  hamMenuContainer: {
    width: "40px",
    height: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    opacity: "1",
    cursor: "pointer",
  },

  hamMenuLine: {
    width: "80%",
    height: "3px",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  mobileNavBarList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100dvh",
    gap: "30px",
    listStyle: "none",
    width: "100%",
    padding: "50px 20px",

    "& li": {
      listStyle: "none",
      cursor: "pointer",
      color: "white",
      fontSize: "25px",
    },
  },
  showMenu: {
    left: "0%",
  },
  showHamMenu: {
    opacity: "0",
    pointerEvents: "none",
  },
});

export default function MobileNavigation({
  showMobileMenu,
  setShowMobileMenu,
}: PropsType) {
  const classes = cssStyle();
  const { token } = useSelector(
    (state: RootState) => state.LoginInfoData.userInfo,
  );

  const navigate = useNavigate();
  /* function */
  const handleListClick = (name: string) => {
    if (name === "item" && token) {
      navigate("/add-task");
    }
    if (name === "item" && !token) {
      setShowMobileMenu(false);
      alert("please login to go to item");
    }
    if (name === "register") {
      navigate("/register");
    }
    if (name === "login") {
      navigate("/login");
    }
    setShowMobileMenu(false);
  };
  useEffect(() => {
    const handleResize = () => {
      if (showMobileMenu) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    handleResize();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);
  return (
    <div className={classes.mobileNavBarContainer}>
      <div
        className={`${classes.hamMenuContainer}   ${showMobileMenu ? classes.showHamMenu : ""}`}
        onClick={() => setShowMobileMenu(true)}
      >
        <div className={classes.hamMenuLine}></div>
        <div className={classes.hamMenuLine}></div>
      </div>
      <div
        className={`${classes.mobileMainNavBarListContainer}   ${showMobileMenu ? classes.showMenu : ""}`}
      >
        <div className={classes.mobileNavBarArrowContainer}>
          <FaArrowLeft
            className={classes.mobileNavBarArrowIcon}
            onClick={() => setShowMobileMenu(false)}
            style={{ color: "white", fontSize: "22px", cursor: "pointer" }}
            title="Back"
          />

          <UserNameSection setShowMobileMenu={setShowMobileMenu} />
        </div>

        <ul className={`${classes.mobileNavBarList} `}>
          <li onClick={() => handleListClick("item")}>Show Items</li>
          <li onClick={() => handleListClick("register")}> Register</li>
          <li onClick={() => handleListClick("login")}> Login</li>
        </ul>
      </div>
    </div>
  );
}
