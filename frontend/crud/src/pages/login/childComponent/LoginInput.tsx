import { useEffect, useState } from "react";
import { loginInputArray } from "../../../utilities/Arrays";
import type { LoginPayload } from "../../../utilities/interfaces";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { fetchUsersRequest } from "../../../redux slices/userInfoSlice";
import { toast } from "react-toastify";
import {
  fetchLoginUserRequest,
  loadingLoginUser,
  setLoginError,
} from "../../../redux slices/loginUserSlice";

import { createUseStyles } from "react-jss";

export const cssStyle = createUseStyles({
  loginWrapper: {
    width: "100%",
    height: "100dvh",
  },
  loginMainContainer: {
    width: "100%",
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "50px 20px",
  },
  loginFormContainer: {
    padding: "30px 20px",
    border: "1px solid green",
    borderRadius: "10px",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 2px 8px rgba(0, 128, 0, 0.15)",
    "@media (max-width: 650px)": {
      width: "100%",
    },
    "& button": {
      height: "40px",
      cursor: "pointer",
      backgroundColor: "green",
      borderRadius: "8px",
      border: "none",
      color: "white",
    },
  },
  loginFormSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  loginLabelSection: {
    textDecoration: "capitalize",
    display: "flex",
    flexDirection: "column",
    gap: "5px",

    "& p": {
      textTransform: "capitalize",
      color: "green",
    },
    "& input": {
      padding: "0px 20px",
      height: "40px",
      borderRadius: "8px",
      border: "1px solid green",
    },
  },
});

export default function LoginInput() {
  const classes = cssStyle();
  const [loginVal, setLoginVal] = useState<LoginPayload>({
    username: "",
    password: "",
  });
  const [errorSms, setErrorSms] = useState<string[]>(
    Array.from({ length: loginInputArray.length }, () => ""),
  );
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.UserInfoData);
  const { userInfo } = useSelector((state: RootState) => state.LoginInfoData);

  // fetch all users
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);
  console.log(users);
  /* handle input change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginVal((prev) => ({ ...prev, [name]: value }));
  };

  /*  hanndle Form */
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loadingLoginUser());
    const existUser = users.find(
      (u) => u.username === loginVal.username || u.email === loginVal.username,
    );

    let newErrors = [...errorSms];
    newErrors = loginInputArray.map((item) => {
      const name = item.name as keyof LoginPayload;
      const value = loginVal[name]?.trim() || "";
      const valuePassword = loginVal["password"]?.trim() || "";
      if (!value) {
        return `Field ${item.label} is required`;
      }
      if (name === "username" && !existUser) {
        return `User is incorrect or does not exist`;
      }
      if (
        name === "password" &&
        existUser?.password !== valuePassword &&
        existUser
      ) {
        return `password is incorrect`;
      }
      return "";
    });
    setErrorSms(newErrors);
    if (newErrors.some((item) => item !== "")) return;
    try {
      const newLoginUser = {
        username: loginVal.username,
        password: loginVal.password,
      };
      dispatch(fetchLoginUserRequest(newLoginUser));

      toast.success("login successfully 🎉");
      setLoginVal({
        username: "",
        password: "",
      });
    } catch (error) {
      dispatch(setLoginError(error as string));

      console.log(error);
    }
  };
  console.log("userinfo", userInfo);

  /*  */
  return (
    <div className={classes.loginMainContainer}>
      <form
        action=""
        onSubmit={handleForm}
        className={classes.loginFormContainer}
      >
        <div className={classes.loginFormSection}>
          {loginInputArray &&
            loginInputArray.map((item, index) => {
              return (
                <label
                  htmlFor={item.name}
                  key={index}
                  className={classes.loginLabelSection}
                >
                  <p>{item.label}</p>
                  <input
                    type={item.type}
                    name={item.name}
                    value={loginVal[item.name as keyof LoginPayload]}
                    onChange={(e) => handleChange(e)}
                  />
                  <p style={{ color: "red" }}>{errorSms[index]}</p>
                </label>
              );
            })}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
