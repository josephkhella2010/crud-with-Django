import { createUseStyles } from "react-jss";

export const cssStyle = createUseStyles({
  fristMainContainer: {
    width: "100%",
    padding: "100px 20px 50px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    "@media (max-width: 650px)": {
      width: "100%",
    },
    "& img": {
      width: "100%",
      height: "500px",
      borderRadius: "20px",
    },
  },
  titleMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "green",
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
