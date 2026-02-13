import React, { useState, useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";

export default function Resume(props) {
  /* STATES */
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});
  const [sectionHeights, setSectionHeights] = useState([]);

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
    { label: "Certifications", logoSrc: "certifications.svg" },
    { label: "Achievements", logoSrc: "interests.svg" },
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      url: "https://www.credly.com/badges/eb14b13b-cc16-4612-9b2e-a190f5b60eeb",
      verifyLabel: "Verify on Credly",
    },
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      url: "https://www.credly.com/badges/65893e39-9a2c-47b5-b0d9-8a8487dbe623",
      verifyLabel: "Verify on Credly",
    },
  ];

  const hackerRankCertifications = [
    { name: "JavaScript (Basic)", verified: true },
    { name: "JavaScript (Intermediate)", verified: true },
    { name: "Node (Basic)", verified: true },
    { name: "Problem Solving (Basic)", verified: true },
    { name: "Problem Solving (Intermediate)", verified: true },
  ];
  const hackerRankProfileUrl = "https://www.hackerrank.com/profile/nghiemph95";

  //here we have
  const programmingSkillsDetails = [
    { skill: "JavaScript", ratingPercentage: 80 },
    { skill: "React JS", ratingPercentage: 85 },
    { skill: "TypeScript", ratingPercentage: 85 },
    { skill: "Node JS", ratingPercentage: 70 },
    { skill: "AWS DevOps", ratingPercentage: 40 },
    { skill: "Business Analysis", ratingPercentage: 80 },
    { skill: "HTML/CSS", ratingPercentage: 80 },
    { skill: "Bootstrap/RxJS/ExpressJS", ratingPercentage: 30 },
  ];

  const projectsDetails = [
    {
      title: "Core Banking",
      duration: { fromDate: "2018", toDate: "2021" },
      description:
        "Development core banking: Tax, Customer service, Fee, Accounting",
      subHeading: "Technologies Used: C, JavaScript, HTML/CSS, SQL Oracle",
    },
    {
      title: "Restaurant Management Website",
      duration: { fromDate: "2020", toDate: "now" },
      description:
        "A management application designed to tracking selling products with business system integration for a restaurant. Link: https://centurygialai.com/",
      subHeading:
        "Technologies Used:  ReactJS, NodeJS, Docker, AWS, TypeScript, GitLab.",
    },
    {
      title: "GitHub",
      duration: { fromDate: "2019", toDate: "now" },
      description: "Please visit my Git: https://github.com/nghiemph95",
      subHeading:
        "Technologies Used: TypeScript, JavaScript, HTML/CSS, UI, NodeJS, ExpressJS, Bootstrap,....",
    },
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"International University of Vietnam National University"}
        subHeading={"BACHELOR OF ELECTRICAL ENGINEERING"}
        fromDate={"2013"}
        toDate={"2019"}
      />

      <ResumeHeading
        heading={"National Youth Service Corps"}
        subHeading={"7th IoT Startup 2017 Competition - HTP Ho Chi Minh City"}
        fromDate={"2014"}
        toDate={"2015"}
      />
    </div>,

    /* WORK EXPERIENCE */
    <div className="resume-screen-container work-history-container" key="work-experience">
      <div className="experience-container-scrollable">
        <div className="resume-cv-download" style={{
          marginBottom: "32px",
          padding: "20px 24px",
          background: "linear-gradient(135deg, #1f2235 0%, #2d3142 100%)",
          borderRadius: "16px",
          border: "2px solid rgba(255, 88, 35, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <div>
            <strong style={{ color: "#fff", display: "block", marginBottom: "6px", fontSize: "16px", fontFamily: "Poppins SemiBold" }}>📄 My CV (Full resume)</strong>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px" }}>Pham Nguyen Thanh Nghiem — PDF</span>
          </div>
          <a
            href="/Pham_Nguyen_Thanh_Nghiem.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Pham_Nguyen_Thanh_Nghiem.pdf"
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #ff5823 0%, #ff8c5a 100%)",
              color: "#fff",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 4px 12px rgba(255, 88, 35, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 16px rgba(255, 88, 35, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(255, 88, 35, 0.4)";
            }}
          >
            View / Download CV
          </a>
        </div>

        <div className="work-experience-item">
          <ResumeHeading
            heading={"Fullstack Engineer / Project Lead"}
            subHeading={"Xolv Technology Solutions, Inc"}
            fromDate={"Jan 2025"}
            toDate={"Present"}
          />
          <div className="experience-description">
            <div className="experience-bullet-points">
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>FAS (Funder Agnostic Solution):</strong> Led end-to-end development of client intake platform from greenfield to production. Designed event-driven architecture using NestJS, GraphQL, AWS Lambda, SQS, SNS, EventBridge, ECS/Fargate, RDS, DynamoDB. Delivered production-ready MVP in 3 months enabling immediate revenue generation.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>myBrightlink:</strong> Developed healthcare web app using ReactJS, Zustand, TypeScript, AWS S3, SQS, RDS. Implemented asynchronous workflows with DLQ, HIPAA-compliant authentication (Azure AD B2C), and comprehensive observability (Datadog, Sentry).
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>Admin Center:</strong> Built internal admin portal with Azure AD B2C, role-based access control. Containerized Next.js app with Docker, deployed to Kubernetes via GitLab CI/CD with Helm charts. Implemented type-safe API integration with OpenAPI-generated TypeScript clients.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>Wabistro:</strong> Developed AI-powered restaurant discovery platform using Flutter, Ionic React, Capacitor. Integrated Google Generative AI and OpenAI APIs for menu detection and nutrition analysis. Built serverless backend with Firebase.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="work-experience-item">
          <ResumeHeading
            heading={"Fullstack Engineer"}
            subHeading={"Transcosmos Technology Vietnam"}
            fromDate={"Apr 2023"}
            toDate={"Dec 2024"}
          />
          <div className="experience-description">
            <div className="experience-bullet-points">
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>t-passport (SSO Platform):</strong> Developed Single Sign-On solution with Microsoft ADFS, OAuth SSO integration. Released passwordless authentication via QR code scanning. Built drag-drop dashboard for SSO sign-in preferences. Deployed using AWS Amplify.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>LM (Log Management):</strong> Designed serverless log ingestion pipelines using AWS S3, Lambda, EventBridge, KMS, CloudFormation. Processed log data with JavaScript/Python, automated infrastructure via IaC.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>t-intelligate (AI Platform):</strong> Integrated multiple LLM providers (ChatGPT, Azure OpenAI, Gemini, AWS AI). Built frontend features with ReactJS, ViteJS. Handled user permissions via AWS Cognito User Pool.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>Email Management & Other Systems:</strong> Built event-driven email processing (S3, SQS, SNS, Lambda, DynamoDB), ticket management with ClickUp Webhook integration, and token management systems using VueJS and AWS Cognito.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="work-experience-item">
          <ResumeHeading
            heading={"Backend Engineer"}
            subHeading={"VietCredit Finance Company"}
            fromDate={"Dec 2021"}
            toDate={"Apr 2023"}
          />
          <div className="experience-description">
            <div className="experience-bullet-points">
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>FASMO (Fast Money):</strong> Implemented backend business logic for mobile lending platform integrated with MoMo e-wallet using NodeJS and MS SQL. Processed user data and enforced lending rules for high-traffic financial product with real-money transactions.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>Financial Internal Management System:</strong> Developed backend APIs and frontend features using ReactJS for financial operations, reporting, and payroll. Refactored existing logic to improve performance and maintainability.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>Repayment Fee System:</strong> Built APIs for managing loan repayment schedules and fees. Ensured data accuracy across the loan lifecycle, improving correctness and reliability of repayment calculations.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="work-experience-item">
          <ResumeHeading
            heading={"Project Lead / Core Banking Developer"}
            subHeading={"Shinhan DS Vietnam"}
            fromDate={"Jul 2018"}
            toDate={"Dec 2021"}
          />
          <div className="experience-description">
            <div className="experience-bullet-points">
              <div className="bullet-point">
                <span className="resume-description-text">
                  <strong>Aither System (Core Banking):</strong> Led development of Core Banking systems supporting customer, account, tax, and fee management. Developed microservices, designed database schemas and UI screens using Oracle SQL, C, Java.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  Built High-Priority Customer Management system based on Top Club scoring, enabling banks to identify VIP customers. Implemented accurate customer-sales assignment logic preventing conflicts across teams.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  Developed integrated customer information platform consolidating data across multiple banking systems. Implemented Exchange Rate calculation system for foreign currency exchange and international payroll.
                </span>
              </div>
              <div className="bullet-point">
                <span className="resume-description-text">
                  Refactored business logic to comply with Vietnam State Bank regulations. Improved maintainability and stability of legacy systems through systematic refactoring, documentation, and process standardization.
                </span>
              </div>
            </div>
          </div>
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

    /* CERTIFICATIONS */
    <div className="resume-screen-container certifications-container" key="certifications">
      <div className="certifications-intro">
        <h3 className="certifications-title">AWS Certifications</h3>
        <p className="certifications-subtitle">Verified credentials — click to view on Credly</p>
      </div>
      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="certification-card"
          >
            <div className="certification-card-inner">
              <div className="certification-aws-badge">
                <span className="cert-aws-icon">☁</span>
                <span className="cert-aws-text">AWS</span>
              </div>
              <h4 className="certification-name">{cert.name}</h4>
              <p className="certification-issuer">{cert.issuer}</p>
              <span className="certification-verify">
                {cert.verifyLabel}
                <i className="fa fa-external-link" aria-hidden="true"></i>
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="certifications-intro certifications-intro-hackerrank">
        <h3 className="certifications-title">HackerRank Certifications</h3>
        <p className="certifications-subtitle">Skill certificates — view profile on HackerRank</p>
      </div>
      <div className="certifications-grid certifications-grid-hackerrank">
        {hackerRankCertifications.map((cert, index) => (
          <a
            key={index}
            href={hackerRankProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="certification-card certification-card-hackerrank"
          >
            <div className="certification-card-inner">
              <div className="certification-hackerrank-badge">
                <span className="cert-hackerrank-icon">⌗</span>
                <span className="cert-hackerrank-text">HackerRank</span>
              </div>
              <h4 className="certification-name">{cert.name}</h4>
              {cert.verified && (
                <span className="certification-verified-tag">
                  <i className="fa fa-check-circle" aria-hidden="true"></i> Verified
                </span>
              )}
              <span className="certification-verify">
                View on HackerRank
                <i className="fa fa-external-link" aria-hidden="true"></i>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>,

    /* Achievements – theo từng thời kỳ, ngắn gọn */
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading={"Achievements & Learning"}
        subHeading={"BY TIME PERIOD"}
        fromDate={""}
        toDate={""}
      />
      <div className="achievement-period">
        <div className="achievement-period-heading">2024 – Now</div>
        <div className="interests-description">
          <span className="interests-description-text">AWS Certified Solutions Architect – Associate & Developer – Associate.</span>
        </div>
        <div className="interests-description">
          <span className="interests-description-text">Senior Fullstack / Tech Lead: scalable web apps, cloud & team delivery.</span>
        </div>
      </div>
      <div className="achievement-period">
        <div className="achievement-period-heading">2022 – 2023</div>
        <div className="interests-description">
          <span className="interests-description-text">50 Projects In 50 Days (HTML, CSS, JS) – Udemy.</span>
        </div>
        <div className="interests-description">
          <span className="interests-description-text">The Complete Front-End Web Development Course – Udemy.</span>
        </div>
      </div>
      <div className="achievement-period">
        <div className="achievement-period-heading">2021</div>
        <div className="interests-description">
          <span className="interests-description-text">The Ultimate ReactJS Responsive Website – Udemy.</span>
        </div>
        <div className="interests-description">
          <span className="interests-description-text">JavaScript & modern front-end practice.</span>
        </div>
      </div>
      <div className="achievement-period">
        <div className="achievement-period-heading">2017 – 2015</div>
        <div className="interests-description">
          <span className="interests-description-text">7th IoT Startup Competition – HTP Ho Chi Minh City (National Youth Service Corps).</span>
        </div>
      </div>
    </div>,
  ];

  const handleCarousal = (index) => {
    // Calculate cumulative offset based on previous sections
    let offset = 0;
    const baseHeight = 550; // Base height per section
    
    for (let i = 0; i < index; i++) {
      // Use section heights if available, otherwise use default base height
      if (sectionHeights[i] && sectionHeights[i] > 0) {
        offset += sectionHeights[i];
      } else {
        offset += baseHeight;
      }
    }
    
    let newCarousalOffset = {
      style: { transform: "translateY(" + offset * -1 + "px)" },
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
        {resumeDetails.map((ResumeDetail, idx) => (
          <div 
            key={idx} 
            className="resume-section-wrapper"
            style={{ 
              minHeight: '550px', 
              display: 'flex', 
              flexDirection: 'column',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {ResumeDetail}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // Calculate actual heights of each section after render
    const calculateHeights = () => {
      const carousal = document.querySelector('.resume-details-carousal');
      if (carousal) {
        const sections = carousal.children;
        const heights = Array.from(sections).map(section => {
          return section.offsetHeight || 500;
        });
        setSectionHeights(heights);
      }
    };

    // Calculate heights after initial render
    setTimeout(calculateHeights, 100);
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateHeights);

    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
      window.removeEventListener('resize', calculateHeights);
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
            <div className="resume-tabs-header">
              <p className="resume-tabs-title">Resume</p>
              <p className="resume-tabs-subtitle">Choose a section</p>
            </div>
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
