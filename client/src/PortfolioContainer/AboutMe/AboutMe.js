import React, { useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./AboutMe.css";

export default function AboutMe(props) {
  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const SCREEN_CONSTSANTS = {
    description:
      "I am a Senior Fullstack Engineer with over 6 years of hands-on experience in building scalable web applications and enterprise systems. My expertise spans the entire software development lifecycle—from architecture design and business analysis to implementation, testing, and DevOps deployment. I specialize in modern JavaScript ecosystems (React, Node.js, TypeScript) and cloud infrastructure (AWS), with a proven track record in developing core banking systems, business management platforms, and full-stack solutions. I excel at translating complex business requirements into technical solutions and leading cross-functional teams to deliver high-quality products.",
    highlights: {
      bullets: [
        "Full-stack development (React, Node.js, TypeScript)",
        "Enterprise architecture & system design",
        "Business analysis & technical strategy",
        "Cloud infrastructure & DevOps (AWS, Docker, CI/CD)",
      ],
      heading:
        "Core Expertise & Technical Strengths",
    },
  };

  const renderHighlight = () => {
    return SCREEN_CONSTSANTS.highlights.bullets.map((value, i) => (
      <div className="highlight" key={i}>
        <div className="highlight-blob"></div>
        <span>{value}</span>
      </div>
    ));
  };

  useEffect(() => {
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);

  return (
    <div
      className="about-me-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="about-me-parent">
        <ScreenHeading title={"About Me"} subHeading={"Why Choose Me"} />
        <div className="about-me-card">
          <div className="about-me-profile"></div>
          <div className="about-me-details">
            <span className="about-me-description">
              {SCREEN_CONSTSANTS.description}
            </span>
            <div className="about-me-highlights">
              <div className="highlight-heading">
                <span>{SCREEN_CONSTSANTS.highlights.heading}</span>
              </div>
              {renderHighlight()}
            </div>
            <div className="about-me-options">
              <button
                className="btn primary-btn"
                onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
              >
                {" "}
                Hire Me{" "}
              </button>
              <a href="Pham_Nguyen_Thanh_Nghiem.pdf" download="Pham_Nguyen_Thanh_Nghiem.pdf">
                <button className="btn highlighted-btn">Download CV</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
