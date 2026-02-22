import { createUseStyles } from "react-jss";
import UpdateUserInput from "./childComponent/UpdateUserInput";

export const cssStyle = createUseStyles({
  updateWrapperPage: {
    width: "100%",
    height: "100dvh",
  },
});

export default function UpdateUserInfo() {
  const classes = cssStyle();
  return (
    <div className={classes.updateWrapperPage}>
      <UpdateUserInput />
    </div>
  );
}
