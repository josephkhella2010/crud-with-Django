import { createUseStyles } from "react-jss";
import { taskInput } from "../../../utilities/Arrays";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import type { RootState } from "../../../store/store";
import { fetchUpdateUserItem } from "../../../redux slices/updateUserItemSlice";
import type { TaskInputType } from "../../../utilities/interfaces";

type TextFieldKeys = "title" | "task";

interface PropsType {
  itemId: number | null;
  setShowEditSection: (showEditSection: boolean) => void;
  showEditSection: boolean;
}

export const cssStyle = createUseStyles({
  updateContainer: {
    width: "100%",
    minHeight: "100dvh",
    backgroundColor: "#0000008f",
    position: "fixed",
    top: "0px",
    left: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "30px",
    padding: "20px",
  },
  formMainContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "30px 20px",
    border: "1px solid green",
    borderRadius: "10px",
    width: "50%",
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
  LabelMainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  textInputMainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    "& p": {
      color: "green",
    },
    "& input": {
      height: "40px",
      width: "90%",
      borderRadius: "8px",
      padding: "0px 10px",
      border: "0.5px solid green",
      "@media (max-width: 650px)": {
        width: "100%",
      },
    },
  },
  RadioInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  radioContent: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    "& input": {
      width: "20px",
      height: "20px",
      cursor: "pointer",
      accentColor: "green",
    },
    "& p": {
      color: "green",
    },
  },
  closeSection: {
    borderRadius: "50%",
    backgroundColor: "green",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
  },
  closecontainer: {
    width: "50%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "@media (max-width: 650px)": {
      width: "100%",
    },
  },
});

export default function UpdateItemSection({
  itemId,
  setShowEditSection,
  showEditSection,
}: PropsType) {
  const classes = cssStyle();
  const dispatch = useDispatch();
  const userStorage = localStorage.getItem("user");
  const user = userStorage ? JSON.parse(userStorage) : null;
  const userId = user.id;
  const { users } = useSelector((state: RootState) => state.UserInfoData);

  /* function */
  const findUser = users.find((u) => u.id === userId);

  const filteredItem = findUser?.items?.find((item: any) => item.id === itemId);
  console.log("findUser?.items", filteredItem);
  const [inputVal, setInputVal] = useState<TaskInputType>({
    title: filteredItem?.title || "",
    task: filteredItem?.task || "",
    complete: filteredItem?.complete || false,
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemId === null || !userId) return;

    dispatch(
      fetchUpdateUserItem({
        userId,
        itemId,
        updatedItem: {
          title: inputVal.title ?? "",
          task: inputVal.task ?? "",
          complete: inputVal.complete ?? false,
        },
      }),
    );

    setShowEditSection(false);
  };

  useEffect(() => {
    const handleReszie = () => {
      if (showEditSection) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    handleReszie();
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  /*  */

  return (
    <div className={classes.updateContainer}>
      <div className={classes.closecontainer}>
        <div
          className={classes.closeSection}
          onClick={() => setShowEditSection(false)}
        >
          <IoMdClose />
        </div>
      </div>
      <div className={classes.formMainContainer}>
        <form
          action=""
          className={classes.formContainer}
          onSubmit={handleUpdate}
        >
          {taskInput &&
            taskInput.map((item, index) => {
              return (
                <div key={index} className={classes.LabelMainContent}>
                  {item.textInput?.map((inp, ind) => {
                    return (
                      <label
                        htmlFor={inp.name}
                        key={ind}
                        className={classes.textInputMainContainer}
                      >
                        <p>{inp.label}</p>
                        <input
                          type={inp.type}
                          name={inp.name}
                          placeholder={inp.placeholder}
                          value={inputVal[inp.name as TextFieldKeys]}
                          onChange={(e) =>
                            setInputVal((prev) => ({
                              ...prev,
                              [inp.name]: e.target.value,
                            }))
                          }
                        />
                      </label>
                    );
                  })}
                  <div className={classes.RadioInputContainer}>
                    {item.radioInput?.radioOptions.options.map((ra, i) => {
                      return (
                        <label
                          htmlFor={ra.name}
                          key={i}
                          className={classes.radioContent}
                        >
                          <input
                            type={ra.type}
                            name={ra.name}
                            checked={
                              ra.label === "Yes"
                                ? inputVal.complete == true
                                : inputVal.complete == false
                            }
                            onChange={() =>
                              setInputVal((prev) => ({
                                ...prev,
                                complete: ra.label === "Yes",
                              }))
                            }
                          />
                          <p>{ra.label}</p>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          <button type="submit"> save</button>
        </form>
      </div>
    </div>
  );
}
