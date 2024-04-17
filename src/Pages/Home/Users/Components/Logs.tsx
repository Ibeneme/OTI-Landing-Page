import React, { useState } from "react";
import "../../FeedbackForms/FeedBackForms.css";
import "../../Dashboard/Components/Filter.css";
import { useNavigate } from "react-router-dom";
import NoTicketsMessage from "../../Dashboard/Components/NoTickets";
import NoTickets from "../../../../assets/Dashboard/NoTickets.png";
import { MdSend } from "react-icons/md";

export interface Feedback {
  id: string;
  created_at: string;
  updated_at: string;
  reference: string;
  name: string;
  email: string;
  customer: {
    id: string;
    created_at: string;
    updated_at: string;
    reference: string;
    name: string;
    email: string;
  };
  subject: string;
  message: string;
  feedback_media: {
    id: string;
    created_at: string;
    updated_at: string;
    reference: string;
    location: string;
  }[];
  project_name: string;
  type?: string;
}

interface Props {
  feedbacks: Feedback[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = (date.getHours() % 12 || 12).toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "pm" : "am";

  return `${month} ${day}, ${year}, at ${hour}:${minute}${ampm}`;
};

const LogList: React.FC<Props> = ({ feedbacks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  //   const handleFeedbackClick = (feedback: Feedback) => {
  //     navigate(`/feedback/${feedback.id}`);
  //   };

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.customer?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      feedback.customer?.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      feedback.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colorMap: { [key: string]: string } = {
    a: "orange",
    b: "#16B4A1",
    c: "#1962EF",
    d: "#B45816",
    e: "#DE4D93",
    f: "brown",
    g: "#7B4DDE",
    h: "#4D64DE",
    i: "orangered",
    j: "orange",
    k: "#16B4A1",
    l: "#1962EF",
    m: "#B45816",
    n: "#DE4D93",
    o: "brown",
    p: "#7B4DDE",
    q: "#4D64DE",
    r: "orangered",
    s: "orange",
    t: "#16B4A1",
    u: "#1962EF",
    v: "#B45816",
    w: "#DE4D93",
    x: "brown",
    y: "#7B4DDE",
    z: "#4D64DE",
  };

  const getBackgroundColor = (name: string) => {
    const firstLetter = name?.charAt(0)?.toLowerCase();
    const color = colorMap[firstLetter] || "black";
    return { backgroundColor: color };
  };

  const truncateSubject = (subject: string, length: number) => {
    if (subject.length <= length) return subject;
    return subject.substr(0, length) + "...";
  };

  return (
    <div style={{ backgroundColor: "#fff", paddingTop: 16 }}>
      <div
        className="search-container"
        style={{ padding: 16, paddingBottom: 32, display: "none" }}
      >
        <input
          type="text"
          placeholder="Search by customer name, email, project name, reference, subject, or message"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: 16,
            borderRadius: 12,
            border: "1px solid #808080",
            width: 350,
          }}
        />
      </div>

      {/* <div className="search-container">
        <input
          type="text"
          placeholder="Search by customer name, email, project name, reference, subject, or message"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}
      {filteredFeedbacks.length === 0 ? (
        <NoTicketsMessage
          heading="Whoops... No Logs submitted"
          paragraph="No Logs submitted yet"
          imageUrl={NoTickets}
          imageAlt="No Tickets"
        />
      ) : (
        <table className="log-table">
          <thead>
            <tr className="log-item">
              <th>Stakeholder </th>
              <th>Date Submitted</th>
              <th>Type</th>
              <th>ID</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr
                key={feedback.id}
                style={{ cursor: "pointer" }}
                // onClick={() => navigate('/log-details')}
              >
                <td style={{ display: "flex", alignContent: "center" }}>
                  <div
                    style={getBackgroundColor(
                      feedback.customer?.name?.charAt(0)
                    )}
                    className="feedback-image"
                  >
                    {feedback.customer?.name?.charAt(0)}
                  </div>

                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <span style={{ fontSize: 16, color: "#121212" }}>
                      {feedback.customer?.name}
                    </span>
                    <span style={{ fontSize: 12, color: "#808080" }}>
                      {feedback.customer?.email}
                    </span>
                  </div>
                </td>

                <td style={{ fontSize: 14 }}>
                  {formatDate(feedback.created_at)}
                </td>
                <td>
                  {feedback.type
                    ? feedback.type.charAt(0).toUpperCase() +
                      feedback.type.slice(1).toLowerCase()
                    : ""}
                </td>

                <td>
                  {feedback.reference ? feedback.reference : "*************"}
                </td>
                <td>{truncateSubject(feedback.subject, 20) + "..."}</td>
                <td>
                  {" "}
                  <p
                    className="tickets-view-tickets"
                    style={{ margin: 0 }}
                    onClick={() => {
                      navigate("/log-details", {
                        state: {
                          feedbacks: feedback,
                          stakeholders_name: feedback?.name,
                          stakeholders_email: feedback?.email,
                        },
                      });
                    }}
                  >
                    View <MdSend size="12" />{" "}
                  </p>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogList;
