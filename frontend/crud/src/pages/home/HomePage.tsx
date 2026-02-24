import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { fetchUsersRequest } from "../../redux slices/userInfoSlice";
import HomePageSectionOne from "./childComponent/HomePageSectionOne";
import HomePageSectionSecondContainer from "./childComponent/HomePageSectionSecondContainer";
import HomePageThirdSection from "./childComponent/HomePageThirdSection";

import { createUseStyles } from "react-jss";
import HomePageFourthSection from "./childComponent/HomePageFourthSection";

export const cssStyle = createUseStyles({
  homePageMainWrapper: {
    width: "100%",
    minHeight: "100dvh",
  },

  homePageWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  section: {
    width: "100%",
    opacity: 0,
    transform: "translateY(40px)",
    transition: "all 0.7s ease",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
  },
});

export default function HomePage() {
  const classes = cssStyle();
  const dispatch = useDispatch<AppDispatch>();

  const sections = [
    HomePageSectionOne,
    HomePageSectionSecondContainer,
    HomePageThirdSection,
    HomePageFourthSection,
  ];

  /* Track visible sections */
  const [visible, setVisible] = useState<boolean[]>(
    new Array(sections.length).fill(false),
  );
  const token = sessionStorage.getItem("token");
  /* store DOM refs */
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);
  console.log("token", token);
  useEffect(() => {
    const handleScroll = () => {
      const updated = [...visible];

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        /* if section enters viewport */
        if (rect.top < window.innerHeight - 100) {
          updated[index] = true;
        }
      });

      setVisible(updated);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={classes.homePageMainWrapper}>
      <div className={classes.homePageWrapper}>
        {sections.map((Section, index) => (
          <div
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={`${classes.section} ${
              visible[index] ? classes.visible : ""
            }`}
          >
            <Section />
          </div>
        ))}
      </div>
    </div>
  );
}
