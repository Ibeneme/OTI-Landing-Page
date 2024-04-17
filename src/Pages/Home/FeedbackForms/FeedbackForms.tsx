import React, { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Dashboard/SideBar";
import "../Dashboard/styles/cards.css";
import "../Dashboard/Dashboard.css";
import {
  FilterFeedback,
  getAllFeedbacks,
} from "../../../../Redux/Feedback/Feedback";
import FeedbackLog from "../Users/Components/FeedbackLog";
import { getOrganizationProfile } from "../../../../Redux/Profile/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbArrowLeft } from "react-icons/tb";

const FeedBackForm: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  const [acadaboo, setAcadaboo] = useState("");
  const [oberon, setOberon] = useState("");
  const [agSite, setAGSite] = useState("");
  const [organizationProfile, setOrganizationProfile] = useState<any | string>(
    null
  );

  useEffect(() => {
    dispatch(getOrganizationProfile()).then((result) => {
      setOrganizationProfile(result.payload?.id);
    });
  }, [dispatch]);

  const fetchData = async () => {
    try {
      const response = await dispatch(getAllFeedbacks());
      console.log("getAllFeedbacks:", response?.payload);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const fetchAcadaboo = async () => {
    try {
      const response = await dispatch(
        FilterFeedback({ project_name: "Acadaboo" })
      );
      setAcadaboo(response?.payload);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const fetchAG = async () => {
    try {
      const response = await dispatch(
        FilterFeedback({ project_name: "antigravity" })
      );
      setAGSite(response?.payload);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const fetchOberon = async () => {
    try {
      const response = await dispatch(
        FilterFeedback({ project_name: "Oberon" })
      );
      setOberon(response?.payload);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    Promise.all([fetchAcadaboo(), fetchOberon(), fetchAG(), fetchData()]);
  }, [dispatch]);

  const generateCopyableLink = (projectName: string) => {
    return `https://project-srm.vercel.app/form/${projectName
      .toLowerCase()
      .replace(/\s/g, "-")}/${organizationProfile}`;
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const dashboardData = [
    {
      title: "Acadaboo",
      color: "#6610f2",
      navigate: `feedback-product/Acadaboo`, // Assuming Acadaboo is a variable with a string value
      abbreviations: "acadaboo.com",
      responses: acadaboo ? acadaboo.length : 0, // Use a ternary operator to handle the undefined case
      link: generateCopyableLink("Acadaboo"),
    },
    {
      title: "Antigravity Site",
      color: "#0d6efd",
      navigate: `feedback-product/Antigravity`,
      abbreviations: "antigravitygroup.ng",
      responses: agSite?.length,
      link: generateCopyableLink("Antigravity"),
    },
    {
      title: "Oberon",
      color: "#198754",
      navigate: `feedback-product/Oberon`,
      abbreviations: "Coming Soon",
      responses: oberon?.length,
      link: generateCopyableLink("Oberon"),
    },
  ];

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
                        width: 12,
                        height: 12,
                        borderRadius: 666,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(-1)}
                    >
                      <TbArrowLeft
                        style={{
                          color: "white",
                          fontSize: 24,
                          cursor: "pointer",
                        }}
                      />
                    </span>

                    <h2 className="main-content-dashboard-h2">
                      Feedback Forms
                    </h2>
                    <p className="main-content-dashboard-p">
                      Copy these links to get feedback from your stakeholders:
                    </p>
                    {/* {dashboardData.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: "#ff6b0015",
                          padding: 12,
                          borderRadius: 24,
                          cursor: "pointer",
                          paddingLeft: 24,
                          paddingRight: 24,
                          marginBottom: 10,
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(item.link);
                          toast.success("Link copied to clipboard!", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }}
                      >
                        <p
                          style={{
                            color: "var(--darkOrange)",
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          <a
                            href={item.link}
                            style={{ textDecoration: "none", color: "inherit" }}
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.link}
                          </a>
                        </p>
                      </div>
                    ))} */}
                    <ToastContainer />
                  </div>{" "}
                </div>
              </div>
              <div className="div-split-tickets">
                {dashboardData.map((item, index) => (
                  <div key={index} className="div-dashboard-overdues">
                    <div
                      className="div-overdue-icons"
                      style={{
                        alignItems: "start",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: 12,
                        }}
                      >
                        <div>
                          <p className="overdue-texts-dashboard">
                            {item.title}
                          </p>
                          <h2 style={{ marginTop: 32 }}>{item?.responses}</h2>
                        </div>
                      </div>
                      <span
                        style={{ fontSize: 24, position: "relative" }}
                        onClick={() => handleNavigate(item.navigate)}
                      >
                        <div
                          style={{
                            backgroundColor: item.color,
                            padding: 12,
                            borderRadius: 12,
                            fontSize: 14,
                            height: 24,
                            minWidth: 24,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#FFF",
                          }}
                        >
                          {item?.abbreviations}
                        </div>
                      </span>
                    </div>
                    <br />

                    <div
                      key={index}
                      style={{
                        backgroundColor: "#ff6b0015",
                        padding: 12,
                        borderRadius: 24,
                        cursor: "pointer",
                        paddingLeft: 24,
                        paddingRight: 24,
                        marginBottom: 10,
                      }}
                      onClick={() => handleCopyLink(item.link)}
                    >
                      <p
                        style={{
                          color: "var(--darkOrange)",
                          margin: 0,
                          fontSize: 14,
                        }}
                      >
                        <a
                          href="#"
                          style={{ textDecoration: "none", color: "inherit" }}
                          onClick={(e) => e.preventDefault()}
                        >
                          Copy Link
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="div-split-tickets"></div>
              <FeedbackLog />
              <div style={{ marginTop: -40 }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackForm;
