import React, { useState } from "react";
import FeedbackList, { Feedback } from "./FeedbackList";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Dashboard/SideBar";
import { TbArrowLeft } from "react-icons/tb";

const StakeholdersFeedbackForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(15);
  const location = useLocation();
  const feedbacks = location.state && location.state.feedbacks;
  const stakeholders_name = location.state && location.state.stakeholders_name;
  const stakeholders_email =
    location.state && location.state.stakeholders_email;
  console.log(feedbacks, feedbacks?.length, "clickedUser?.clickedUser");
  const feedbacksWithCustomerInfo = feedbacks.map((feedback: Feedback) => ({
    ...feedback,
    customer: {
      name: stakeholders_name,
      email: stakeholders_email,
    },
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbacksWithCustomerInfo.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
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
                      Feedback Forms from Stakeholder {stakeholders_name}
                    </h2>
                    <p className="main-content-dashboard-p">
                      Copy these links to get feedback from your stakeholders:
                    </p>
                  </div>{" "}
                </div>
              </div>
              <div className="div-split-tickets"></div>
              <div className="div-split-tickets"></div>
              <div
                style={{
                  backgroundColor: "white",
                  paddingTop: 24,
                  marginTop: -72,
                  borderRadius: 12,
                }}
              >
                <>
                  <FeedbackList feedbacks={currentItems} />
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={feedbacksWithCustomerInfo.length}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </>
              </div>
              <div style={{ marginTop: -40 }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholdersFeedbackForm;

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <span
        className="pagination"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {pageNumbers.map((number) => (
          <p
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <p
              onClick={() => paginate(number)}
              className="page-link"
              style={{
                backgroundColor:
                  currentPage === number ? "var(--darkOrange)" : "",
                padding: 12,
                height: 24,
                minWidth: 24,
                borderRadius: 24,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: currentPage === number ? "white" : "black",
              }}
            >
              {number}
            </p>
          </p>
        ))}
      </span>
    </nav>
  );
};
