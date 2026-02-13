import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Typical from "react-typical";
import imgBack from "../../../src/assets/Contact/images/mailz.jpeg";
import loading from "../../../src/assets/Contact/images/load2.gif";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./ContactMe.css";
export default function ContactMe(props) {
  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };

  useEffect(() => {
    const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
    return () => fadeInSubscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [jdFile, setJdFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleCompany = (e) => setCompany(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleMessage = (e) => setMessage(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (
        !allowedTypes.includes(file.type) &&
        !["pdf", "doc", "docx"].includes(fileExtension)
      ) {
        toast.error("Only PDF, DOC, and DOCX files are allowed");
        e.target.value = "";
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        e.target.value = "";
        return;
      }

      setJdFile(file);
      setFileName(file.name);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      message.trim().length === 0
    ) {
      setBanner("Please Fill All The Fields!");
      toast.error("Please Fill All The Fields!");
      return;
    }

    try {
      // Create FormData to support file upload
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("company", company.trim());
      formData.append("phone", phone.trim());
      formData.append("message", message.trim());

      // Append file if selected
      if (jdFile) {
        formData.append("jdFile", jdFile);
      }

      setBool(true);
      setBanner("");

      const apiBase = process.env.REACT_APP_API_URL || "";
      const res = await axios.post(`${apiBase}/contact`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
        setName("");
        setEmail("");
        setCompany("");
        setPhone("");
        setMessage("");
        setJdFile(null);
        setFileName("");
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      }
    } catch (error) {
      // Log chi tiết để debug (response từ server, network error, v.v.)
      console.error("Error submitting form:", error);
      console.error("Error details:", {
        message: error.message,
        responseStatus: error.response?.status,
        responseData: error.response?.data,
        code: error.code,
      });
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.error ||
        error.message ||
        "Failed to send message. Please try again later.";
      setBanner(errorMessage);
      toast.error(errorMessage);
    } finally {
      setBool(false);
    }
  };

  return (
    <div className="main-container fade-in" id={props.id || ""}>
      <ScreenHeading subHeading={"Lets Keep In Touch"} title={"Contact Me"} />
      <div className="central-form">
        <div className="col">
          <h2 className="title">
            {" "}
            <Typical loop={Infinity} steps={["Get In Touch 📬", 1000]} />
          </h2>
          <a href="https://www.facebook.com/nghiempham47/">
            <i className="fa fa-facebook-square"></i>
          </a>
          <a href="https://myaccount.google.com/profile">
            <i className="fa fa-google-plus-square"></i>
          </a>
          <a href="https://www.instagram.com/nghiemilo/?hl=en">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/channel/UC5ZlCHQqHL2qEclS6bfe_ag">
            <i className="fa fa-youtube-square"></i>
          </a>
          <a href="https://twitter.com/NghiemPh95">
            <i className="fa fa-twitter"></i>
          </a>
        </div>

        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
            <img src={imgBack} alt="Contact form background" />
          </div>
          <form onSubmit={submitForm}>
            <p>{banner}</p>
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              onChange={handleName}
              value={name}
              placeholder="Your name"
            />

            <label htmlFor="email">Email *</label>
            <input
              type="email"
              onChange={handleEmail}
              value={email}
              placeholder="your@email.com"
            />

            <label htmlFor="company">Company</label>
            <input
              type="text"
              onChange={handleCompany}
              value={company}
              placeholder="Company name (optional)"
            />

            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              onChange={handlePhone}
              value={phone}
              placeholder="Phone (optional)"
            />

            <label htmlFor="message">Message *</label>
            <textarea
              onChange={handleMessage}
              value={message}
              placeholder="Your message..."
              rows={4}
            />

            <label htmlFor="jdFile">Job Description (PDF/DOC/DOCX)</label>
            <div style={{ position: "relative" }}>
              <input
                type="file"
                id="jdFile"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  marginBottom: "22px",
                  border: "2px solid rgba(0, 0, 0, 0)",
                  outline: "none",
                  backgroundColor: "rgba(230, 230, 230, 0.6)",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              />
              {fileName && (
                <p
                  style={{
                    marginTop: "-18px",
                    marginBottom: "22px",
                    fontSize: "0.9rem",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  📎 Selected: {fileName}
                </p>
              )}
            </div>

            <div className="send-btn">
              <button type="submit">
                send
                <i className="fa fa-paper-plane" />
                {/** if the bool = true => show Loading Bar*/}
                {bool ? (
                  <b className="load">
                    <img src={loading} alt="Loading" />
                  </b>
                ) : (
                  ""
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
