import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../home/HomePage";
import AboutPage from "../about/AboutPage";
import RegisterPage from "../register Page/RegisterPage";
import LoginPage from "../login/LoginPage";
import { ToastContainer } from "react-toastify";
import UpdateUserInfo from "../update user info/UpdateUserInfo";
import TodoPage from "../Todo Page/TodoPage";
import ItemDetailsPage from "../Item Details/ItemDetailsPage";
import NavigationContainer from "../navigation/NavigationContainer";
import SettingPage from "../setting Page/SettingPage";
import UserInfoPage from "../UserInfoPage/UserInfoPage";
import { createUseStyles } from "react-jss";
import LoadingPage from "../loadingPage/LoadingPage";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export const cssStyle = createUseStyles({
  mainWrapper: {
    padding: "60px 0px 0px 0px",
    position: "relative",
  },
});

export default function RoutesPage() {
  const classes = cssStyle();
  const { loading } = useSelector((state: RootState) => state.loadingData);
  return (
    <div>
      <Router>
        <ToastContainer />
        <NavigationContainer />
        <div className={classes.mainWrapper}>
          {loading && <LoadingPage />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/update-profile" element={<UpdateUserInfo />} />
            <Route path="/add-task" element={<TodoPage />} />
            <Route path="/item-details/:id" element={<ItemDetailsPage />} />
            <Route path="/setting-user" element={<SettingPage />} />
            <Route path="/user-info" element={<UserInfoPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
