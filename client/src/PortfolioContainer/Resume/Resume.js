import React, { useState, useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";

export default function Resume(props) {
  /* STATES */
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;

    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  /* REUSABLE MINOR COMPONENTS */
  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + "-" + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>

        <div className="resume-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
      </div>
    );
  };
  /* STATIC RESUME DATA FOR THE LABELS*/
  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Programming-Skills", logoSrc: "programming-skills.svg" },
    { label: "Projects", logoSrc: "projects.svg" },
    { label: "Achievements", logoSrc: "interests.svg" },
  ];

  //here we have
  const programmingSkillsDetails = [
    { skill: "JavaScript", ratingPercentage: 85 },
    { skill: "React JS", ratingPercentage: 85 },
    { skill: "TypeScript", ratingPercentage: 90 },
    { skill: "AWS DevOps", ratingPercentage: 40 },
    { skill: "Node JS", ratingPercentage: 70 },
    { skill: "Business Analysis", ratingPercentage: 80 },
    { skill: "Project Management", ratingPercentage: 80 },
    { skill: "HTML", ratingPercentage: 80 },
    { skill: "CSS", ratingPercentage: 80 },
    { skill: "Bootstrap/RxJS/ExpressJS", ratingPercentage: 30 },
  ];

  const projectsDetails = [
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2017", toDate: "now" },
      description:
        "A Personal Portfolio website to showcase all my details and projects at one place.",
      subHeading: "Technologies Used: React JS, Bootsrap, NodeJS",
    },
    {
      title: "Restaurant Management Website",
      duration: { fromDate: "2020", toDate: "now" },
      description:
        "A management application designed to tracking selling products with business system integration for a restaurant",
      subHeading:
        "Technologies Used:  React JS, NodeJS, Material UI, AWS, TypeScript.",
    },
    {
      title: "GitHub",
      duration: { fromDate: "2020", toDate: "now" },
      description: "Please via my address Git: https://github.com/nghiemph95",
      subHeading:
        "Technologies Used: TypeScript, JavaScript, HTML/CSS, UI, NodeJS, ExpressJS, Bootstrap,....",
    },
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={
          "International University of Vietnam National University, Vietnam"
        }
        subHeading={"BACHELOR OF ELECTRICAL ENGINEERING"}
        fromDate={"2013"}
        toDate={"2017"}
      />

      <ResumeHeading
        heading={"National Youth Service Corps"}
        subHeading={"7th IoT Startup 2017 Competition - HTP Ho Chi Minh City"}
        fromDate={"2014"}
        toDate={"2015"}
      />
      <ResumeHeading
        heading={"High School"}
        subHeading={"3th Provincial Excellent Student"}
        fromDate={"2010"}
        toDate={"2011"}
      />
    </div>,

    /* WORK EXPERIENCE */
    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        <ResumeHeading
          heading={"Shinhan DS Vietnam - Shinhan Group"}
          subHeading={"SOFTWARE DEVELOPER - ICT DEPARTMENT"}
          fromDate={"2018"}
          toDate={"2020"}
        />
        <div className="experience-description">
          <span className="resume-description-text">
            - Developed an system for client/server with the dashboard for
            managing the business products, managing reviews, users, payment,
            common, deposit, loan, etc. .
          </span>
        </div>

        <br />

        <ResumeHeading
          heading={"VPBank - Vietnam Prosperity Join-Stock Commercial Bank"}
          subHeading={"IT BUSINESS ANALYST - RETAIL RISK"}
          fromDate={"2020"}
          toDate={"2021"}
        />
        <div className="experience-description">
          <span className="resume-description-text">
            IT System Business Analysis - Risk Division Management
          </span>
        </div>

        <br />

        <ResumeHeading
          heading={"VietCredit Finance Company"}
          subHeading={"IT BUSINESS ANALYST - ICT DEPARTMENT"}
          fromDate={"2021"}
          toDate={"now"}
        />
        <div className="experience-description">
          <span className="resume-description-text">
            Technical Business Analysis for all Technical Innovation Strategy at
            Business Analysis Department
          </span>
        </div>
      </div>
    </div>,

    /* PROGRAMMING SKILLS */
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,

    /* PROJECTS */
    <div className="resume-screen-container" key="projects">
      {projectsDetails.map((projectsDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectsDetails.title}
          subHeading={projectsDetails.subHeading}
          description={projectsDetails.description}
          fromDate={projectsDetails.duration.fromDate}
          toDate={projectsDetails.duration.toDate}
        />
      ))}
    </div>,

    /* Achievements */
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading={"Learning Courses"}
        subHeading={"PRACTICE BY MYSELF"}
        fromDate={"2021"}
        toDate={"now"}
      />
      <div className="interests-description">
        <span className="interests-description-text">
          1. The Ultimate ReactJS Responsive Website - Udemy Course (2021)
        </span>
      </div>
      <div className="interests-description">
        <span className="interests-description-text">
          2. 50 Projects In 50 Days - HTML, CSS and JavaScript - Udemy Course
          (2022)
        </span>
      </div>
      <div className="interests-description">
        <span className="interests-description-text">
          3. The Complete Front-End Web Development Course - Udemy Course (2022)
        </span>
      </div>
    </div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 360;
    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };
    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}`).default}
          alt="B"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  /* Tạo hiệu ứng chuyển resume*/
  const getResumeScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((ResumeDetail) => ResumeDetail)}
      </div>
    );
  };

  useEffect(() => {
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);

  return (
    <div
      className="resume-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My Formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>
          <div className="resume-bullet-details">{getResumeScreens()}</div>
        </div>
      </div>
    </div>
  );
}
