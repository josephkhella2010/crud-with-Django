import { createUseStyles } from "react-jss";
import RegisterInputSection from "./childComponent/RegisterInputSection";

export const cssStyle = createUseStyles({
  registerWrapper: {
    width: "100%",
    height: "calc(100dvh - 60px)",
    /*     backgroundColor: "orangered",
     */
  },
});

export default function RegisterPage() {
  const classes = cssStyle();
  return (
    <div className={classes.registerWrapper}>
      <RegisterInputSection />
    </div>
  );
}
