import { createUseStyles } from "react-jss";
import type { itemsType } from "../../../utilities/interfaces";

interface PropsType {
  filteredUserItem: itemsType[] | undefined;
}
export const cssStyle = createUseStyles({
  itemInfoDetailMainContainer: {
    width: "100%",
    minHeight: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 20px",
  },
  itemInfoDetailContainer: {
    padding: "50px ",
    border: "1px solid green",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "500px",
    boxShadow: "0 2px 8px rgba(0, 128, 0, 0.15);",
  },
  header: {
    color: "green",
    textTransform: "capitalize",
  },
  span: {
    fontSize: "18px",
    fontWeight: "lighter",
    wordBreak: "break-all",
    color: "#5e9e54",
    textTransform: "capitalize",
  },
});

export default function ItemInfo({ filteredUserItem }: PropsType) {
  //console.log(filteredUserItem);
  const classes = cssStyle();
  return (
    <div className={classes.itemInfoDetailMainContainer}>
      {filteredUserItem?.map((item, index) => {
        return (
          <div key={index} className={classes.itemInfoDetailContainer}>
            <h2 className={classes.header}>
              Title: <span className={classes.span}>{item.title} </span>
            </h2>
            <h2 className={classes.header}>
              Body: <span className={classes.span}> {item.task}</span>
            </h2>
            <h2 className={classes.header}>
              {" "}
              Complete :{" "}
              <span className={classes.span}>
                {item.complete == true ? "Completed" : "Pending"}
              </span>
            </h2>
          </div>
        );
      })}
    </div>
  );
}
