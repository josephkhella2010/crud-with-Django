import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchUsersRequest } from "../../redux slices/userInfoSlice";
import HomePageSectionOne from "./childComponent/HomePageSectionOne";
import { createUseStyles } from "react-jss";
export const cssStyle = createUseStyles({
  homePageMainWrapper: {
    backgroundColor: "red",
    width: "100%",
    minHeight: "100dvh",
  },
  homePageWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function HomePage() {
  const classes = cssStyle();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.UserInfoData);

  /* fetch All Users */
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  console.log(users);
  return (
    <div className={classes.homePageMainWrapper}>
      <div className={classes.homePageWrapper}>
        <HomePageSectionOne />
      </div>
    </div>
  );
}
