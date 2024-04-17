import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Dashboard/SideBar";
import "../Dashboard/styles/cards.css";
import "../Dashboard/Dashboard.css";
import FeedbackSpecific from "../Users/Components/FeedbackSpecific";
import { TbArrowLeft } from "react-icons/tb";

const SpecificProductFeedbackForm: React.FC = () => {
  const { project_name } = useParams<{ project_name?: any }>();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content-container">
        <div className="dashboard-cards-container">
          <div className="dashboard-content">
            <div className="main-content-container">
              <div className="main-content-dashboard-div">
                <div>
                  <div>
                    <span
                      style={{
                        backgroundColor: "var(--darkOrange)",
                        padding: 12,
                        width: 24,
                        height: 24,
                        borderRadius: 666,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <TbArrowLeft
                        style={{
                          color: "white",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(-1)}
                      />
                    </span>
                    <br />
                    <h2 className="main-content-dashboard-h2">
                      Feedback Forms
                    </h2>
                    <p className="main-content-dashboard-p">
                      Here's what's going on today.
                    </p>
                  </div>
                </div>
              </div>
              <br /> <br />
              <br />
              <br />
              <br />
              <>
                <FeedbackSpecific projectName={project_name} />
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificProductFeedbackForm;
