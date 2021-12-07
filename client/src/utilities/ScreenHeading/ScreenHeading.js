import React from "react";
import "./ScreenHeading.css";

export default function ScreenHeading(props) {
  return (
    <div className="heading-container">
      <div className="screen-heading">
        <span>{props.title}</span> {/** Receiving value */}
      </div>

      {props.subHeading ? (
        <div className="screen-sub-heading">
          {" "}
          {/** Why choose me */}
          <span>{props.subHeading}</span>
        </div>
      ) : (
        <div></div>
      )}

      <div className="heading-seperator">
        <div className="seperator-line"></div>
        <div className="seperator-blob">
          <div></div>
        </div>
      </div>
    </div>
  );
}
