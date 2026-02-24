import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerInputArray } from "../../../utilities/Arrays";
import type { updateInputType, UserType } from "../../../utilities/interfaces";
import { fetchUpdateUserRequest } from "../../../redux slices/updateUserSlice";
import type { AppDispatch, RootState } from "../../../store/store";
import { fetchUsersRequest } from "../../../redux slices/userInfoSlice";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

export const cssStyle = createUseStyles({
  updatePageMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "20px 20px",
  },
  formMainContainer: {
    gap: "20px",
    width: "50%",
    border: "1px solid green",
    display: "flex",
    flexDirection: "column",
    padding: "30px 20px",
    boxShadow: "0 2px 8px rgba(0, 128, 0, 0.15)",
    borderRadius: "10px",
    textDecoration: "capitalize",

    "& p": {
      textTransform: "capitalize",
      color: "green",
    },
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
  labelSection: {
    textDecoration: "capitalize",
    display: "flex",
    flexDirection: "column",
    gap: "5px",

    "& p": {
      textTransform: "capitalize",
      color: "green",
    },
    "& input": {
      border: "1px solid green",
      height: "40px",
      padding: "0 10px",
      borderRadius: "8px",
      width: "100%",
    },
  },
});

export default function UpdateUserInput() {
  const classes = cssStyle();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // subscribe to users array
  const users = useSelector((state: RootState) => state.UserInfoData.users);

  // const token = localStorage.getItem("token");
  // get the logged-in user from localStorage
  const userStorage: UserType | null = JSON.parse(
    sessionStorage.getItem("user") || "null",
  );

  const [updateInputsVal, setUpdateInputsVal] = useState<updateInputType>({
    username: "",
    email: "",
    password: "",
  });

  // sync component state when users array changes
  useEffect(() => {
    if (userStorage) {
      // find the current user in the users array
      const currentUser =
        users.find((u: any) => u.id === userStorage.id) || userStorage;

      setUpdateInputsVal({
        username: currentUser.username,
        email: currentUser.email,
        password: currentUser.password,
      });
    }
  }, [users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateInputsVal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userStorage?.id) return;

    // dispatch update if no errors
    dispatch(
      fetchUpdateUserRequest({
        id: userStorage.id,
        data: updateInputsVal as UserType,
      }),
    );
    navigate("/");
  };

  /* get users */
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  return (
    <div className={classes.updatePageMainContainer}>
      <form onSubmit={handleSubmit} className={classes.formMainContainer}>
        {registerInputArray.map((item, index) => {
          if (item.label === "confirm password") return null;
          return (
            <div key={index}>
              <label key={index} className={classes.labelSection}>
                <p>{item.label}</p>
                <input
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  value={
                    updateInputsVal[item.name as keyof updateInputType] || ""
                  }
                  onChange={handleChange}
                />
              </label>
              {/*               <p style={{ color: "red" }}>{errors[index]}</p>
               */}{" "}
            </div>
          );
        })}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
