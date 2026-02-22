import { createUseStyles } from "react-jss";

export const cssStyle = createUseStyles({
  fristMainContainer: {
    backgroundColor: "blue",
    width: "50%",
    padding: "100px 20px",
  },
  titleMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    textTransform: "capitalize",
  },
});
export default function HomePageSectionOne() {
  const classes = cssStyle();
  return (
    <div className={classes.fristMainContainer}>
      <h1 className={classes.titleMainContainer}>Welcome to Todo List</h1>
    </div>
  );
}
