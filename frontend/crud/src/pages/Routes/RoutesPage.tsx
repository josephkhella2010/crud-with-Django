import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../home/HomePage";
import AboutPage from "../about/AboutPage";
import RegisterPage from "../register Page/RegisterPage";
import LoginPage from "../login/LoginPage";
import { ToastContainer } from "react-toastify";
import UpdateUserInfo from "../update user info/UpdateUserInfo";
import TodoPage from "../Todo Page/TodoPage";
import ItemDetailsPage from "../Item Details/ItemDetailsPage";
import NavigationContainer from "../navigation/NavigationContainer";

export default function RoutesPage() {
  return (
    <div>
      <ToastContainer />{" "}
      <Router>
        <NavigationContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/update-profile" element={<UpdateUserInfo />} />
          <Route path="/add-task" element={<TodoPage />} />
          <Route path="/item-details/:id" element={<ItemDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}
