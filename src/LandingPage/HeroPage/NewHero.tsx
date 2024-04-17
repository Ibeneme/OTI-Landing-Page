import React from "react";
import { FiArrowRight } from "react-icons/fi";
import useNavigateToCreateAccount from "../../Pages/Auth/Hook/useCreateAccount";
import section from "../../assets/feedback/remote.com by html.to.design ❤️ FREE version - 26/02/Section.png";
import "./Hero.css";
import "../../Pages/Home/FeedbackForms/FeedBackForms.css";

const NewHero: React.FC = () => {
  const navigateToCreateAccount = useNavigateToCreateAccount();

  return (
    <div className="header-hide">
      <img
        src={section}
        alt="image"
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
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ fontSize: 36 }}>
          Build Excellent Stakeholder
          <br />
          <span
            style={{ backgroundColor: "var(--darkOrange)", padding: "0 8px" }}
          >
            {" "}
            Relationship
          </span>{" "}
          and Experience
        </h3>
        <p className="hero-smaller-text" style={{ textAlign: "center" }}>
          Our integrated Stakeholder Relationship Management - (SRM) solution is
          designed to streamline and enhance stakeholder interactions and
          experience. A robust and intuitive support solution that effortlessly
          integrates our data, teams, and stakeholder interactions into a
          unified platform to deliver outstanding support and exceed stakeholder
          expectations.
        </p>
        <button
          //data-aos="zoom-in"
          onClick={navigateToCreateAccount}
          style={{
            backgroundColor: "var(--darkOrange)",
            borderRadius: 24,
            height: 50,
            border: "2px solid  #fff",
            color: "#FFF",
            width: 160,
            ///display: "none",
          }}
        >
          Get Started
          <FiArrowRight className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default NewHero;
