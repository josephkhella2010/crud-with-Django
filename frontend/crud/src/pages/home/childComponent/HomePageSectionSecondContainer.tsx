import { createUseStyles } from "react-jss";

export const cssStyle = createUseStyles({
  secondSectionContainer: {
    width: "100%",
    padding: "50px 20px",
    display: "flex",
    flexDirection: "column",
    "& img": {
      width: "100%",
      height: "500px",
      borderRadius: "20px",
    },
  },
  textContainer: {
    position: "relative",
    top: "-40px",
    color: "green",
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 650px)": {
      top: "-100px",
    },
    "& p": {
      width: "80%",
      textAlign: "center",
      borderRadius: 10,
      border: "1px solid rgba(255, 255, 255, 0.3)",
      background: "rgb(82 82 82 / 38%)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      padding: "30px 30px",
      fontSize: "24px",
      "@media (max-width: 650px)": {
        width: "90%",
      },
    },
  },
});

export default function HomePageSectionSecondContainer() {
  const classes = cssStyle();
  return (
    <div className={classes.secondSectionContainer}>
      <img src="/foto/homepage.jpg" alt="not found" />
      <div className={classes.textContainer}>
        <p>
          Welcome! Here you can write down all your tasks, ideas, reminders, and
          even little thoughts that come to mind throughout the day. Keep
          everything organized in one place so you never forget anything
          important. Track your goals, prioritize what matters, and make steady
          progress every day. Use this space to clear your mind, plan your day,
          and stay motivated. Whether it’s a quick note, a long-term project, or
          a personal goal, jot it down here and turn your ideas into action!
        </p>
      </div>
    </div>
  );
}
