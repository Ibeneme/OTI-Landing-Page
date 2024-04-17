import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Dashboard/SideBar";
import { TbArrowLeft } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import useCustomToasts from "../../../Utils/ToastNotifications/Toastify";
import {
  getProfile,
  getSpecificLogs,
  updateLog,
} from "../../../../../Redux/Profile/Profile";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux/Store";
import { useDispatch } from "react-redux";

interface Payload {
  customer: {
    name: string;
    email: string;
  };
  type: string;
  reference: string;
  summary: string;
  subject: string;
}

const StakeholdersLogsDetails: React.FC = () => {
  const location = useLocation();
  const feedbacks = location.state && location.state.feedbacks;
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    if (feedbacks) {
      dispatch(getSpecificLogs(feedbacks.id))
        .then((result) => {
          setPayload(result.payload);
        })
        .catch(() => {});
    }
  }, [dispatch, feedbacks]);

  const { showSuccessToast, showErrorToast } = useCustomToasts();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [editedSubject, setEditedSubject] = useState("");
  const [editedSummary, setEditedSummary] = useState("");

  const handleSave = () => {
    // Trim the edited values
    const trimmedEditedSubject = editedSubject.trim();
    const trimmedEditedSummary = editedSummary.trim();

    console.log(trimmedEditedSubject, payload?.subject, "editedSubject");
    console.log(trimmedEditedSummary, payload?.summary, "editedSummary");

    const uploadLog = {
      subject: trimmedEditedSubject,
      summary: trimmedEditedSummary,
    };
    dispatch(updateLog({ updateLog: uploadLog, customer_id: feedbacks?.id }))
      .then((result: any) => {
        if (result?.payload === 200) {
          showSuccessToast("Updated Successfully");
          setIsEditing(false);
          setPayload(result.payload);
        } else {
          showErrorToast("An Error Occurred");
        }
      })
      .catch(() => {
        showErrorToast("Could not add log");
        ////console.error("Error adding log:", error);
      });
    if (
      trimmedEditedSubject !== payload?.subject ||
      trimmedEditedSummary !== payload?.summary
    )
      if (trimmedEditedSubject === " " || trimmedEditedSummary === " ") {
        dispatch(
          updateLog({ updateLog: uploadLog, customer_id: feedbacks?.id })
        )
          .then((result: any) => {
            if (result?.payload === 200) {
              showSuccessToast("Updated Successfully");
              setIsEditing(false);
              setPayload(result.payload);
            } else {
              showErrorToast("An Error Occurred");
            }
          })
          .catch(() => {
            showErrorToast("Could not add log");
            ////console.error("Error adding log:", error);
          });
      } else {
      }
  };

  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content-container">
        <div className="dashboard-cards-container">
          <div className="dashboard-content">
            <div className="main-content-container">
              <div className="main-content-dashboard-div">
                <div>
                  <div style={{ width: "100%" }}>
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
                      Data Logged for Stakeholder {feedbacks?.customer?.name}
                    </h2>
                    <p className="main-content-dashboard-p">
                      Data Logged for Stakeholder {feedbacks?.customer?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="div-split-tickets">
                <div
                  className="feedback-details"
                  style={{
                    backgroundColor: "white",
                    padding: 16,
                    borderRadius: 12,
                    width: "100%",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 24 }}
                  >
                    <h3
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      style={{
                        border: isEditing ? "1px solid #FC5C0465" : "none",
                        padding: isEditing ? 16 : 0,
                        borderRadius: isEditing ? 12 : 0,
                      }}
                      onBlur={(e) => {
                        setEditedSubject(e.target.innerText);
                      }}
                    >
                      {editedSubject ? editedSubject : payload?.subject}
                    </h3>

                    {userProfile?.permission_type === "manager" ? (
                      <div>
                        {isEditing ? (
                          <span
                            style={{
                              backgroundColor: "#FC5C0415",
                              color: "#FC5C04",
                              fontSize: 14,
                              padding: 6,
                              borderRadius: 47,
                              cursor: "pointer",
                            }}
                            onClick={handleSave}
                          >
                            <MdEdit color="#FC5C04" /> Save
                          </span>
                        ) : (
                          <span
                            style={{
                              backgroundColor: "#FC5C0415",
                              color: "#FC5C04",
                              fontSize: 14,
                              padding: 6,
                              borderRadius: 47,
                              cursor: "pointer",
                            }}
                            onClick={() => setIsEditing(true)}
                          >
                            <MdEdit color="#FC5C04" /> Edit
                          </span>
                        )}
                      </div>
                    ) : null}
                  </div>
                  <div className="feedback-item">
                    <p className="label-feedback">Stakeholder Name</p>
                    <p className="value">{feedbacks?.customer?.name}</p>
                  </div>
                  <div className="feedback-item">
                    <p className="label-feedback">Stakeholder Email Address</p>
                    <p className="value">{feedbacks?.customer?.email}</p>
                  </div>
                  <div className="feedback-item">
                    <p className="label-feedback">Type</p>
                    <p className="value">{payload?.type}</p>
                  </div>
                  <div className="feedback-item">
                    <p className="label-feedback">ID</p>
                    <p className="value">
                      {payload?.reference ? payload?.reference : "***********"}
                    </p>
                  </div>

                  <div className="feedback-item">
                    <p className="label-feedback">Summary</p>
                    <p
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      style={{
                        border: isEditing ? "1px solid #FC5C0465" : "none",
                        fontSize: 12,
                        padding: isEditing ? 16 : 0,
                        borderRadius: isEditing ? 12 : 0,
                      }}
                      onBlur={(e) => {
                        setEditedSummary(e.target.innerText);
                      }}
                    >
                      {editedSummary ? editedSummary : payload?.summary}
                    </p>
                  </div>
                </div>
              </div>
              <div className="div-split-tickets"></div>
              <div
                style={{
                  backgroundColor: "white",
                  paddingTop: 24,
                  marginTop: -72,
                  borderRadius: 12,
                }}
              ></div>
              <div style={{ marginTop: -40 }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholdersLogsDetails;
