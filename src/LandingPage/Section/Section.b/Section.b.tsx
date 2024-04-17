import React from "react";
import "./SectionB.css";
import { FiArrowRight } from "react-icons/fi";
import useNavigateToCreateAccount from "../../../Pages/Auth/Hook/useCreateAccount";
import ImageContainer from "./ImageContainer";

const SectionB: React.FC = () => {
  return (
    <section data-aos="zoom-in" className="sectionB">
      <div className="sectionB-content-container">
        <ImageContainer />

        <div
          data-aos="zoom-in"
          className="hero-left-content"
          style={{ marginTop: 120 }}
        >
          <h1 data-aos="zoom-in" className="hero-header">
            Create Exceptional{" "}
            <span
              data-aos="zoom-in"
              style={{ color: "#FFCA95", textDecorationLine: "underline" }}
            >
              {" "}
              Stakeholder Experiences{" "}
            </span>{" "}
            and Build Solid Relationships!
          </h1>
          <p data-aos="zoom-in" className="hero-smaller-text">
            Experience top-tier Stakeholder Relationship Management with our
            seamlessly crafted support solution, aimed at refining interactions
            with stakeholders and addressing their needs. Our comprehensive and
            user-friendly support system effortlessly merges our data, teams,
            and stakeholder engagements into a cohesive platform. This ensures
            unparalleled support, surpassing stakeholder expectations and
            delivering outstanding experiences.
          </p>
          <button
            data-aos="zoom-in"
            onClick={useNavigateToCreateAccount()}
            className="btn-section-b"
            style={{ display: "none" }}
          >
            Get Started
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionB;
