import React, { useState } from "react";
import Sidebar from "../Dashboard/SideBar";
import "../Dashboard/styles/cards.css";
import "../Dashboard/Dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import ContactLog from "../Users/Components/ContactLogs";

const Contact: React.FC = () => {
  const [displayType, setDisplayType] = useState("all");

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
                    <h2 className="main-content-dashboard-h2">
                      Stakeholder Database
                    </h2>
                    <p className="main-content-dashboard-p">
                      A Log for all stakeholders' entries
                    </p>
                  </div>
                </div>
              </div>

              <div className="div-split-tickets"></div>
              <div
                style={{
                  backgroundColor: "#Fff",
                  width: "fit-content",
                  padding: 12,
                  borderRadius: 248,
                  marginBottom: -16,
                }}
              >
                <button
                  style={{
                    padding: `16px 32px`,
                    marginRight: 0,
                    borderRadius: 32,
                    border: "none",
                    fontSize: 16,
                    color: displayType === "all" ? "#fff" : "#666",
                    backgroundColor:
                      displayType === "all" ? "#ff6b00" : "transparent",
                  }}
                  onClick={() => setDisplayType("all")}
                >
                  All
                </button>
                <button
                  style={{
                    padding: `16px 32px`,
                    marginRight: 0,
                    borderRadius: 32,
                    border: "none",
                    fontSize: 16,
                    color: displayType === "clients" ? "#fff" : "#666",
                    backgroundColor:
                      displayType === "clients" ? "#ff6b00" : "transparent",
                  }}
                  onClick={() => setDisplayType("clients")}
                >
                  Clients
                </button>
                <button
                  style={{
                    padding: `16px 32px`,
                    marginRight: 0,
                    borderRadius: 32,
                    border: "none",
                    fontSize: 16,
                    color: displayType === "customers" ? "#fff" : "#666",
                    backgroundColor:
                      displayType === "customers" ? "#ff6b00" : "transparent",
                  }}
                  onClick={() => setDisplayType("customers")}
                >
                  Customers
                </button>
                <button
                  style={{
                    padding: `16px 32px`,
                    marginRight: 0,
                    borderRadius: 32,
                    border: "none",
                    fontSize: 16,
                    color: displayType === "digitalCustomers" ? "#fff" : "#666",
                    backgroundColor:
                      displayType === "digitalCustomers"
                        ? "#ff6b00"
                        : "transparent",
                  }}
                  onClick={() => setDisplayType("digitalCustomers")}
                >
                  Digital Customers
                </button>
                <button
                  style={{
                    padding: `16px 32px`,
                    marginRight: 0,
                    borderRadius: 32,
                    border: "none",
                    fontSize: 16,
                    color: displayType === "other" ? "#fff" : "#666",
                    backgroundColor:
                      displayType === "other" ? "#ff6b00" : "transparent",
                  }}
                  onClick={() => setDisplayType("other")}
                >
                  Other Stakeholders
                </button>
              </div>
{/* 
              {displayType === "all" && (
                <>
                  <div style={{ marginTop: 100 }}>
                    <ContactLog />
                  </div>
                </>
              )}

              {displayType === "clients" && (
                <>
                  <div style={{ marginTop: 100 }}>
                    <ContactLog />
                  </div>
                </>
              )}

              {displayType === "customers" && (
                <>
                  <div style={{ marginTop: 100 }}>
                    <ContactLog />
                  </div>
                </>
              )}

              {displayType === "digitalCustomers" && (
                <>
                  <div style={{ marginTop: 100 }}>
                    <ContactLog />
                  </div>
                </>
              )}

              {displayType === "other" && (
                <>
                  <div style={{ marginTop: 100 }}>
                    <ContactLog />
                  </div>
                </>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
