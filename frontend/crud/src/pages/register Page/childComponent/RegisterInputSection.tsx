import { useEffect, useState } from "react";
import { registerInputArray } from "../../../utilities/Arrays";
import type {
  registerInputType,
  UsersResponse,
} from "../../../utilities/interfaces";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisterUserRequest } from "../../../redux slices/registerUserSlice";
import type { RootState } from "../../../store/store";
import { fetchUsersRequest } from "../../../redux slices/userInfoSlice";
import { createUseStyles } from "react-jss";

export const cssStyle = createUseStyles({
  registerMainContainer: {
    width: "100%",
    height: "calc(100dvh - 60px)",
    /*     backgroundColor: "blue",
     */ display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 20px",
  },
  registerFormContainer: {
    border: "1.4px solid green",
    padding: "40px 25px",
    borderRadius: "13px",
    textTransform: "capitalize",
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
      width: "200px",
      borderRadius: "10px",
      outline: "none",
      border: "none",
      cursor: "pointer",
      backgroundColor: "green",
      color: "white",
      textTransform: "capitalize",
    },
  },
  registerLableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    /*     backgroundColor: "yellow",
     */ width: "100%",
    height: "100%",
  },
  registerLableSection: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    "& p": {
      color: "green",
    },
    "& input": {
      width: "90%",
      height: "40px",
      padding: "0px 10px",
      borderRadius: "5px",
      border: "0.5px solid black",
      outline: "none",
    },
  },
});

export default function RegisterInputSection() {
  const classes = cssStyle();
  const [registerInputVal, setRegisterInputVal] = useState<registerInputType>({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [errorSms, setErrorSm] = useState<string[]>(
    Array.from({ length: registerInputArray.length }, () => ""),
  );
  const { user } = useSelector((state: RootState) => state.RegisterInfoData);
  const { users } = useSelector(
    (state: RootState): UsersResponse => state.UserInfoData,
  );
  const dispatch = useDispatch();

  /* function*/

  /* get users */
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  /* value input function */
  const handleRegisterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInputVal((prev) => ({ ...prev, [name]: value }));
  };

  /* form function */
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors = [...errorSms];
    /*    newErrors = registerInputArray.map((item) => {
      const name = item.name as keyof registerInputType;
      const value = registerInputVal[name]?.trim();

      // 1️⃣ Required check FIRST
      if (!value) {
        return `Please ${item.label} is required`;
      }

      // 2️⃣ Password match check ONLY if repassword has value
      if (
        name === "repassword" &&
        registerInputVal.password !== registerInputVal.repassword
      ) {
        return "Passwords do not match";
      }

      return "";
    });
    setErrorSm(newErrors);

    if (newErrors.some((err) => err !== "")) return; */
    newErrors = registerInputArray.map((item) => {
      const name = item.name as keyof registerInputType;
      const value = String(registerInputVal[name] || "").trim();

      if (!value) {
        return `${item.label} is required`;
      }

      if (
        name === "repassword" &&
        registerInputVal.password &&
        registerInputVal.password !== registerInputVal.repassword
      ) {
        return "Passwords do not match";
      }

      return "";
    });

    setErrorSm(newErrors);

    if (newErrors.some((err) => err)) return;

    const findUser = users.find(
      (u) =>
        u.email === registerInputVal.email ||
        u.username === registerInputVal.username,
    );

    if (findUser) {
      toast.error("User already exists");
      return;
    }
    try {
      const newUser = {
        username: registerInputVal.username,
        email: registerInputVal.email,
        password: registerInputVal.password,
        repassword: registerInputVal.repassword,
      };
      dispatch(fetchRegisterUserRequest(newUser));
      setRegisterInputVal({
        username: "",
        email: "",
        password: "",
        repassword: "",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("registered user", user);
  /*  */
  return (
    <div className={classes.registerMainContainer}>
      <form
        action=""
        onSubmit={handleFormSubmit}
        className={classes.registerFormContainer}
      >
        <div className={classes.registerLableContainer}>
          {registerInputArray &&
            registerInputArray.map((item, index) => {
              return (
                <label
                  htmlFor={item.name}
                  key={index}
                  className={classes.registerLableSection}
                >
                  <p>{item.label}</p>
                  <input
                    type={item.type}
                    placeholder={item.placeholder}
                    name={item.name}
                    id={item.name}
                    value={
                      registerInputVal[item.name as keyof registerInputType]
                    }
                    onChange={(e) => {
                      handleRegisterValue(e);
                    }}
                  />
                  <p style={{ color: "red" }}>{errorSms[index]}</p>
                </label>
              );
            })}
        </div>
        <button type="submit"> register</button>
      </form>
    </div>
  );
}
