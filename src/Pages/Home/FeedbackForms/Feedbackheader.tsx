import { FC } from "react";
import section from "../../../assets/feedback/remote.com by html.to.design ❤️ FREE version - 26/02/Section.png";
import { FiArrowRight } from "react-icons/fi";

interface FeedbackHeaderProps {
  handleGetStartedClick: () => void;
}

const FeedbackHeader: FC<FeedbackHeaderProps> = ({ handleGetStartedClick }) => {
  return (
    <div style={{ position: "relative" }} className="header-hide">
      <img
        src={section}
        alt="imaggg"
        style={{ width: "100%", height: "auto" }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
          fontFamily: "var(--fontFamily)",
        }}
      >
        <h3 style={{ fontSize: 36 }}>
          Feedback{" "}
          <span
            style={{ backgroundColor: "var(--darkOrange)", padding: "0 8px" }}
          >
            form{" "}
          </span>
        </h3>
        <button
          data-aos="zoom-in"
          onClick={handleGetStartedClick}
          style={{
            backgroundColor: "var(--darkOrange)",
            borderRadius: 24,
            height: 50,
            border: "2px solid  #fff",
            color: "#FFF",
            width: 160
          }}
        >
          Get Started
          <FiArrowRight style={{ marginLeft: 24 }} />
        </button>
      </div>
    </div>
  );
};

export default FeedbackHeader;
