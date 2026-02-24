import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect } from "react";

export const cssStyle = createUseStyles({
  "@keyframes barAnimation": {
    "0%, 40%, 100%": { opacity: 0.3 },
    "20%": { opacity: 1 },
  },

  loadingPageMainContanier: {
    width: "100%",
    height: "100dvh",
    backgroundColor: "#0b0b0b85",
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: "100",
    color: "white",
  },
  loadingSection: {
    color: "white",
    display: "flex",
    gap: "20px",
    height: "100dvh",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column-reverse",

    "& .loader": {
      position: "relative",
      width: "200px",
      height: "200px",

      WebkitMask:
        "radial-gradient(circle 18px at center, transparent 98%, black 100%)",
      mask: "radial-gradient(circle 18px at center, transparent 98%, black 100%)",

      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
    },

    "& span": {
      position: "absolute",
      left: "50%",
      bottom: "50%",
      width: "6px",
      height: "60px",
      backgroundColor: "green",
      borderRadius: "20px",
      transformOrigin: "center bottom",
      marginLeft: "-4px",
      animation: "$barAnimation 1.2s linear infinite",
      border: "0.5px solid white",
    },
  },
});

export default function LoadingPage() {
  const classes = cssStyle();
  const span = 12;
  const spanArr = Array.from({ length: span }, (_, i) => i);
  const { loading } = useSelector((state: RootState) => state.loadingData);
  useEffect(() => {
    const handleOverFlow = () => {
      if (loading) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    handleOverFlow();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={classes.loadingPageMainContanier}>
      <div className={classes.loadingSection}>
        <h2>Loading</h2>
        <div className="loader">
          {spanArr.map((_, ind) => {
            const angle = (360 / span) * ind;
            return (
              <span
                key={ind}
                style={{
                  transform: `rotate(${angle}deg)`,
                  animationDelay: `${0.1 * ind}s`,
                }}
              ></span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
