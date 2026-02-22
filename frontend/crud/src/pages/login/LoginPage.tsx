import { createUseStyles } from "react-jss";
import LoginInput from "./childComponent/LoginInput";

export const cssStyle = createUseStyles({
  loginWrapper: {
    width: "100%",
    height: "100dvh",
  },
});

export default function LoginPage() {
  const classes = cssStyle();
  return (
    <div className={classes.loginWrapper}>
      <LoginInput />
    </div>
  );
}
