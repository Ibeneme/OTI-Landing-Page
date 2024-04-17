import React from "react";
import Sidebar from "../Dashboard/SideBar";
import "../Dashboard/styles/cards.css";
import "../Dashboard/Dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import AlllogsComponent from "./LogLists";

const Alllogs: React.FC = () => {
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
                    <h2 className="main-content-dashboard-h2">All Logs</h2>
                    <p className="main-content-dashboard-p">
                      A Log for all stakeholder's entry{" "}
                    </p>
                  </div>{" "}
                </div>
              </div>

              <div className="div-split-tickets"></div>

              <div style={{ marginTop: 40 }}>
                <AlllogsComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alllogs;
