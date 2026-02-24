import { useEffect, useState } from "react";
import { taskInput } from "../../../utilities/Arrays";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { fetchUserItems } from "../../../redux slices/getUserItemsSlice";
import { fetchAddItem } from "../../../redux slices/addItemsSlice";
import { fetchUsersRequest } from "../../../redux slices/userInfoSlice";
import { fetchDeleteUserItemReqest } from "../../../redux slices/deleteUserItemSlice";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

interface TaskInputType {
  title: string;
  task: string;
  complete: boolean;
}
type TextFieldKeys = "title" | "task";

interface PropsType {
  handleEdit: (id: number) => void;
}

export const cssStyle = createUseStyles({
  todoMainContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "100px",
    padding: "150px 20px 100px 20px",
  },
  todoFormSection: {
    padding: "30px",
    border: "1px solid green",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRadius: "12px",
    width: "50%",
    boxShadow: "0 2px 8px rgba(0, 128, 0, 0.15);",

    "@media (max-width: 650px)": {
      width: "100%",
    },
    "& button": {
      width: "200px",
      height: "40px",
      cursor: "pointer",
      backgroundColor: "green",
      color: "white",
      borderRadius: "15px",
      border: "none",
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  todoLabelContent: {
    /*     backgroundColor: "yellow",
     */
  },
  todoLabelTextContent: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "&:not(:last-of-type)": {
      marginBottom: "10px",
    },
    "& label": {
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
  todoLabelRadioContent: {
    display: "flex",
    flexDirection: "column",
  },
  todoLabelRadioHeader: {
    marginBottom: "10px",
  },
  todoLabelRadioLabelContent: {
    display: "flex",
    /*     backgroundColor: "green",
     */ gap: "6px",
    alignItems: "center",
    cursor: "pointer",

    "&:not(:last-of-type)": {
      marginBottom: "8px",
    },
    "& p": {
      marginBottom: "10px",
      textAlign: "center",
    },
    "& input": {
      width: "20px",
      height: "20px",
      cursor: "pointer",
      accentColor: "green",
    },
  },
  tableContainer: {
    width: "90%",
    backgroundColor: "green",
    border: "0.4px solid green",
    boxShadow: "0 2px 8px rgba(0, 128, 0, 0.15);",
  },
  tableBody: {
    "& tr": {
      backgroundColor: "white",
      whiteSpace: "pre-wrap",

      "& td": {
        padding: "20px 10px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
        maxWidth: "150px",
        textAlign: "center",
      },
    },
  },
  BtnContainerTwo: {
    gap: "20px",
    padding: "50px 0px",
    "& button": {
      cursor: "pointer",
      border: "none",
      padding: "10px",
      backgroundColor: "transparent",
      color: "green",
      fontSize: "20px",

      "&:nth-of-type(2)": {
        color: "red",
      },
      "@media (max-width: 650px)": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
    },
  },
});

export default function TodoInput({ handleEdit }: PropsType) {
  const classes = cssStyle();
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState<TaskInputType>({
    title: "",
    task: "",
    complete: false,
  });
  const dispatch = useDispatch();
  const { users, items } = useSelector(
    (state: RootState) => state.UserInfoData,
  );

  const storageUser = localStorage.getItem("user");
  const id = storageUser ? JSON.parse(storageUser).id : null;
  /* functions */

  /* form */

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!inputVal.title || !inputVal.task) {
        toast.error("please fill all field");
        return;
      }

      if (id) {
        dispatch(fetchAddItem({ userId: Number(id), item: inputVal }));
        setInputVal({ title: "", task: "", complete: false });
      }
    } catch (error: any) {}
  };
  /* get users */
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  /* get items */
  useEffect(() => {
    if (users.length && id) {
      dispatch(fetchUserItems({ userId: Number(id) }));
    }
  }, [users.length, id, dispatch]);
  //console.log(users, items);
  /*  */
  const handleDelete = (itemId: number) => {
    if (itemId === undefined) return;

    dispatch(
      fetchDeleteUserItemReqest({
        userId: id,
        itemId: itemId,
      }),
    );
  };
  //console.log("users", users);

  /*  */
  return (
    <div className={classes.todoMainContainer}>
      <form onSubmit={handleForm} className={classes.todoFormSection}>
        {taskInput.map((item, index) => (
          <div key={index} className={classes.todoLabelContent}>
            {item.textInput?.map((input, i) => (
              <div key={i} className={classes.todoLabelTextContent}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={inputVal[input.name as TextFieldKeys]}
                  onChange={(e) =>
                    setInputVal((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
            {item.radioInput && (
              <div className={classes.todoLabelRadioContent}>
                <p className={classes.todoLabelRadioHeader}>
                  {item.radioInput.radioOptions.title}
                </p>
                {item.radioInput.radioOptions.options.map((opt, i) => (
                  <label key={i} className={classes.todoLabelRadioLabelContent}>
                    <input
                      type="radio"
                      name={opt.name}
                      checked={
                        opt.label === "Yes"
                          ? inputVal.complete
                          : !inputVal.complete
                      }
                      onChange={() =>
                        setInputVal((prev) => ({
                          ...prev,
                          complete: opt.label === "Yes",
                        }))
                      }
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className={classes.btnContainer}>
          <button type="submit">Add Item</button>
        </div>
      </form>

      {/* Display items */}
      <table className={classes.tableContainer}>
        <tbody className={classes.tableBody}>
          <tr>
            <th style={{ padding: "10px" }}>Number</th>
            <th>Id</th>

            <th>Title</th>

            <th>Task</th>

            <th>Status</th>
            <th>Action</th>
          </tr>
          {items.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => navigate(`/item-details/${item.id}`)}
              title="Click here to see Details"
              style={{ cursor: "pointer" }}
            >
              <td>{index + 1}-</td>

              <td>id {item.id}</td>

              <td> {item.title}</td>
              <td> {item.task}</td>
              <td>{item.complete ? "Done" : "Pending"}</td>

              <td className={classes.BtnContainerTwo}>
                <button
                  title="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.id !== undefined) {
                      handleEdit(item.id);
                    }
                  }}
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={(e) => {
                    if (item.id === undefined) return;
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  title="Delete"
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
