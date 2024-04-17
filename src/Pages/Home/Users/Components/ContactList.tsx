import React, { useEffect, useState } from "react";
import "../../FeedbackForms/FeedBackForms.css";
import "../../Dashboard/Components/Filter.css";
import NoTicketsMessage from "../../Dashboard/Components/NoTickets";
import NoTickets from "../../../../assets/Dashboard/NoTickets.png";
import { MdDelete, MdEdit, MdSave, MdSend } from "react-icons/md";
import Modal from "../../../../components/Modal/Modal";
import { IoTicket } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Feedback } from "./FeedbackList";
import { Ticket } from "../../Tickets/Tickets";
import { TbForms } from "react-icons/tb";
import { Form, Formik } from "formik";
import SelectInput from "../../../Auth/Components/TextInouts/SelectInput";
import TextInputDashboard from "../../../Auth/Components/TextInouts/TextInputDashboard";
import * as Yup from "yup";
import {
  createLog,
  deleteStakeholder,
  getProfile,
  updateStakeholder,
} from "../../../../../Redux/Profile/Profile";
import useCustomToasts from "../../../Utils/ToastNotifications/Toastify";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux/Store";
import { useDispatch } from "react-redux";
import HalfButton from "../../../Auth/Components/Buttons/HalfBtn";
import { useLoading } from "../../../../Hook/useTicketLoading";

interface CreateLogPayload {
  createLog: {
    type: string;
    subject: string;
    summary: string; // Add the summary property
  };
  customer_id: string;
}

export interface Stakeholder {
  id: string;
  created_at: string;
  updated_at: string;
  reference: string;
  name: any;
  email: any;
  subject: string;
  message: string;
  feedback: Feedback[];
  tickets: Ticket[];
  customer: any;
  logs: CreateLogPayload[];
  phone?: any;
}

interface Props {
  feedbacks: Stakeholder[];
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

const ContactList: React.FC<Props> = ({ feedbacks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedUser, setSelectedItem] = useState<Stakeholder | null>(null);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

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
    const firstLetter = name?.charAt(0).toLowerCase();
    const color = colorMap[firstLetter] || "black";
    return { backgroundColor: color };
  };
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (feedback.phone &&
        feedback.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      feedback.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleItemClick = (item: Stakeholder) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    //console.log(item);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCreateLog, setIsModalOpenCreateLog] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModalCreateLog = () => {
    setIsModalOpenCreateLog(true);
  };
  const closeModalCreateLog = () => {
    setIsModalOpenCreateLog(false);
  };
  const handleSendMail = (email: string) => {
    window.open(`mailto:${email}`);
  };
  const handleCloseHere = () => {
    setIsModalOpen(false);
    setIsModalOpenCreateLog(true);
  };

  const navigate = useNavigate();

  const formattedTime = (createdAt: any) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const ordinalSuffix = (() => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    })();

    return `${formattedHours}:${formattedMinutes}${period}, ${day}${ordinalSuffix} ${month}, ${year}`;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(clickedUser?.name || "");
  const [editedEmail, setEditedEmail] = useState(clickedUser?.email || "");
  const [editedPhone, setEditedPhone] = useState(clickedUser?.phone || "");
  const { setSRMTicketsLoading } = useLoading();

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    const finalName = editedName.trim() ? editedName.trim() : clickedUser?.name;
    const finalEmail = editedEmail.trim()
      ? editedEmail.trim()
      : clickedUser?.email;
    const finalPhone = editedPhone.trim()
      ? editedPhone.trim()
      : clickedUser?.phone;
    const updatedUserInfo = {
      name: finalName,
      email: finalEmail,
      phone: finalPhone,
    };
    console.log("Updated User Info:", updatedUserInfo);

    if (clickedUser?.name !== finalName || clickedUser?.email !== finalEmail) {
      setSRMTicketsLoading(true);
      dispatch(
        updateStakeholder({
          updateStakeholder: updatedUserInfo,
          customer_id: clickedUser?.id,
        })
      )
        .then((result) => {
          setSRMTicketsLoading(false);
          if (result?.payload === 200) {
            showSuccessToast("Stakeholder Updated Successfully");
            closeModal();
            window.location.reload();
          } else if (result?.payload === 422) {
            showErrorToast(
              "Cannot update this Stakeholder, email address not valid"
            );
            setSRMTicketsLoading(false);
          } else {
            setSRMTicketsLoading(false);
            showErrorToast("Failed to update Stakeholders data");
          }
        })
        .catch(() => {
          setSRMTicketsLoading(false);
          showErrorToast("Could not add stakeholder");
        })
        .finally(() => {});
    }
  };

  const [isValid, setIsValid] = useState<boolean>(true);
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>): void => {
    const newEmail = e.target.innerText.trim();
    setEditedEmail(newEmail);
    setIsValid(isValidEmail(newEmail));
  };

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  // Other code

  const handleDeleteClick = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clickedUser) {
      setSRMTicketsLoading(true);
      console.log(clickedUser.id); // Logging clicked user id
      dispatch(deleteStakeholder(clickedUser?.id))
        .then((result) => {
          setSRMTicketsLoading(false);
          if (result?.payload === 200) {
            showSuccessToast("Stakeholder deleted Successfully");
            closeModal();
            window.location.reload();
          } else if (result?.payload === 422) {
            showErrorToast(
              "Cannot delete this Stakeholder, email address not valid"
            );
          } else {
            showErrorToast("Failed to delete Stakeholders data");
          }
        })
        .catch(() => {
          setSRMTicketsLoading(false);
          showErrorToast("Could not delete stakeholder");
        })
        .finally(() => {
          setSRMTicketsLoading(false);
        });
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const content = (
    <div className="amosn5" style={{ minWidth: 360 }}>
      <div className="top-bar">
        <div className="action-buttons">
          {userProfile?.permission_type === "manager" ? (
            isDeleteConfirmationOpen ? null : !isEditing ? (
              <>
                <p
                  style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                  onClick={handleEditClick}
                >
                  <MdEdit /> Edit
                </p>

                <p
                  style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    fontSize: 16,
                    marginLeft: 14,
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleDeleteClick}
                >
                  <MdDelete /> Delete
                </p>
              </>
            ) : (
              <p
                style={{
                  alignSelf: "flex-end",
                  cursor: "pointer",
                  fontSize: 16,
                }}
                onClick={handleSaveClick}
              >
                <MdSave /> Save
              </p>
            )
          ) : null}
        </div>
      </div>
      {isDeleteConfirmationOpen ? (
        <div
          style={{
            //width: "100%",
            backgroundColor: "#ff6b0015",
            padding: 16,
            //margin: 12,
            display: "flex",
            justifyContent: "space-between",
            gap: 48,
            borderLeft: "8px solid #ff6b00",
            alignItems: "center",
            borderRadius: 4,
            marginTop: 24,
            marginBottom: 24,
          }}
          className="delete-confirmation"
        >
          <div
            style={{
              color: "#ff6b00",
              fontSize: 14,
            }}
          >
            Confirm you want to delete, this stakeholder?{" "}
          </div>
          <div>
            <button
              style={{
                backgroundColor: "#ff6b00",
                border: "none",
                borderRadius: 12,
                color: "#fff",
                padding: 12,
                marginRight: 4,
              }}
              onClick={handleConfirmDelete}
            >
              Yes
            </button>
            <button
              style={{
                border: "1.6px solid #ff6b00",
                backgroundColor: "transparent",
                borderRadius: 12,

                padding: 12,
                marginRight: 4,
                color: "#ff6b00",
              }}
              onClick={handleCancelDelete}
            >
              No
            </button>
          </div>
        </div>
      ) : null}
      <div className="profile-info-container" style={{ paddingTop: 64 }}>
        <div
          style={getBackgroundColor(clickedUser?.name)}
          className="feedback-image"
        >
          {clickedUser?.name?.charAt(0)}
        </div>

        <div></div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            className="name-users-style-bold"
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            style={{
              color: "#000", // Change the text color to black when editing
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              border: isEditing ? "1px solid #FC5C0465" : "none",
              padding: isEditing ? 8 : 0,
              borderRadius: isEditing ? 8 : 0,
            }}
            onBlur={(e) => {
              setEditedName(e.target.innerText);
            }}
          >
            {editedName ? editedName : clickedUser?.name}
          </p>
          {isEditing ? (
            <div>
              <div
                contentEditable={true}
                suppressContentEditableWarning={true}
                style={{
                  border: isValid ? "1px solid #FC5C0465" : "1px solid red",
                  padding: 8,
                  borderRadius: 8,
                  margin: 12,
                }}
                onBlur={handleBlur}
              >
                {editedEmail ? editedEmail : clickedUser?.email}
              </div>
              {!isValid && (
                <p style={{ color: "red", textAlign: "center", fontSize: 12 }}>
                  Email not valid
                </p>
              )}
            </div>
          ) : (
            <p className="name-users-style">
              {" "}
              {isEditing ? ( // Check if editing is true
                isValid ? ( // Check if email is valid
                  <div
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    style={{
                      border: isValid ? "1px solid #FC5C0465" : "1px solid red",
                      padding: 8,
                      borderRadius: 8,
                      margin: 12,
                    }}
                    onBlur={handleBlur}
                  >
                    {editedEmail ? editedEmail : clickedUser?.email}
                  </div>
                ) : (
                  <div>{clickedUser?.email}</div> // Display clickedUser.email if editedEmail is not valid
                )
              ) : (
                <div>{clickedUser?.email}</div> // If not editing, always display clickedUser.email
              )}
            </p>
          )}

          {isEditing ? (
            <div
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              style={{
                color: "#000",
                fontSize: 14,
                textAlign: "center",
                border: "0.5px solid var(--darkOrange)",
                padding: 8,
                borderRadius: 8,
                marginTop: 12,
              }}
              onBlur={(e) => {
                setEditedPhone(e.target.innerText);
              }}
            >
              {editedPhone ? editedPhone : clickedUser?.phone}
            </div>
          ) : clickedUser?.phone ? (
            <p style={{ color: "#808080", fontSize: 14, textAlign: "center" }}>
              {editedPhone ? editedPhone : clickedUser?.phone}
            </p>
          ) : null}
        </div>

        {/* <div>
          <p className="name-users-style-bold">{`${clickedUser?.name}`}</p>
        </div>
        <div>
          <p className="name-users-style">{clickedUser?.email}</p>
        </div> */}
        <div>
          <p style={{ color: "#808080", fontSize: 14, textAlign: "center" }}>
            Created at: {formattedTime(clickedUser?.created_at)}
          </p>
        </div>
        {userProfile?.permission_type !== "support" && (
          <div
            style={{
              backgroundColor: "var(--darkOrange",
              marginTop: 48,
              width: "100%",
              borderRadius: 24,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleCloseHere}
          >
            <p
              style={{
                margin: 0,
                cursor: "pointer",
                fontSize: 14,
                color: "#fff",
              }}
            >
              Create a Log
            </p>
          </div>
        )}

        <br />
        <br />
        <br />
        <div
          className="bounce-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: 12,
              cursor: "pointer",
              backgroundColor: "#FC5C0425",
              padding: 12,
              borderRadius: 24,
            }}
            onClick={() => {
              navigate("/user-tickets", {
                state: {
                  user_id_passed_as_params: clickedUser?.id,
                  first_name_passed_as_params: clickedUser?.name,
                },
              });
            }}
          >
            <div
              style={{
                color: "#121212",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
              className="scale-item"
            >
              <div
                style={{
                  color: "#121212",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <div
                  className="customStyledBox bounce-item"
                  style={{
                    backgroundColor: "#FC5C04",
                  }}
                >
                  <IoTicket />
                </div>
                <p
                  style={{ color: "#FC5C04", fontSize: 16 }}
                  onClick={() => {
                    navigate("/user-tickets", {
                      state: {
                        user_id_passed_as_params: clickedUser?.id,
                        first_name_passed_as_params: clickedUser?.name,
                      },
                    });
                  }}
                >
                  View Tickets
                </p>
              </div>
              <span
                style={{
                  backgroundColor: "#FC5C04",
                  padding: 6,
                  fontSize: 13,
                  borderRadius: 244,
                  height: 16,
                  width: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "3px solid white",
                  color: "white",
                }}
              >
                {clickedUser?.tickets?.length}
              </span>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: 12,
              cursor: "pointer",
              backgroundColor: "#FC5C0425",
              padding: 12,
              borderRadius: 24,
            }}
            onClick={() => {
              navigate("/feedbacks-stakeholders", {
                state: {
                  feedbacks: clickedUser?.feedback,
                  stakeholders_name: clickedUser?.name,
                  stakeholders_email: clickedUser?.email,
                },
              });
            }}
          >
            <div
              style={{
                color: "#121212",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
              className="scale-item"
            >
              <div
                style={{
                  color: "#121212",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <div
                  className="customStyledBox bounce-item"
                  style={{
                    backgroundColor: "#FC5C04",
                  }}
                >
                  <TbForms />
                </div>
                <p style={{ color: "#FC5C04", fontSize: 16 }}>
                  View All Feedbacks
                </p>
              </div>
            </div>
            <span
              style={{
                backgroundColor: "#FC5C04",
                color: "#fff",
                padding: 6,
                fontSize: 13,
                borderRadius: 244,
                height: 16,
                width: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "3px solid white",
              }}
            >
              {clickedUser?.feedback?.length}
            </span>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: 12,
              cursor: "pointer",
              backgroundColor: "#FC5C0425",
              padding: 12,
              borderRadius: 24,
            }}
            onClick={() => {
              navigate("/stakeholders-logs", {
                state: {
                  feedbacks: clickedUser?.logs,
                  stakeholders_name: clickedUser?.name,
                  stakeholders_email: clickedUser?.email,
                },
              });
            }}
          >
            <div
              style={{
                color: "#121212",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
              className="scale-item"
            >
              <div
                style={{
                  color: "#121212",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <div
                  className="customStyledBox bounce-item"
                  style={{
                    backgroundColor: "#FC5C04",
                  }}
                >
                  <IoTicket />
                </div>
                <p
                  style={{ color: "#FC5C04", fontSize: 16 }}
                  onClick={() => {
                    navigate("/stakeholders-logs", {
                      state: {
                        feedbacks: clickedUser?.logs,
                        stakeholders_name: clickedUser?.name,
                        stakeholders_email: clickedUser?.email,
                      },
                    });
                  }}
                >
                  View Entry Logs
                </p>
              </div>
            </div>
            <span
              style={{
                color: "#fff",
                backgroundColor: "#FC5C04",
                padding: 6,
                fontSize: 13,
                borderRadius: 244,
                height: 16,
                width: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "3px solid white",
              }}
            >
              {clickedUser?.logs?.length}
            </span>
          </div>
        </div>
        <br />
        <div>
          <p
            onClick={() => handleSendMail(clickedUser?.email)}
            className="name-users-style-bold-email"
            style={{ cursor: "pointer", fontSize: 16 }}
          >
            Send a Mail
          </p>
        </div>
        <br />
      </div>
    </div>
  );

  const { showSuccessToast, showErrorToast } = useCustomToasts();

  const contentCreateLog = (
    <div className="form_content_create-log">
      <h2>Create Log</h2>
      <br />
      <Formik
        initialValues={{
          type: "",
          subject: "",
          summary: "",
        }}
        validationSchema={Yup.object({
          type: Yup.string().required("Type is required"),
          subject: Yup.string().required("Subject is required"),
          summary: Yup.string().required("Summary is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          //console.log(values);
          dispatch(
            createLog({ createLog: values, customer_id: clickedUser?.id })
          ) // Dispatch createStakeholder action
            .then((result) => {
              if (result?.payload === 200) {
                showSuccessToast("New Log added Successfully");
                //console.log(result, "Stakeholder added successfully");
                closeModalCreateLog();
                resetForm(); // Reset the form
                window.location.reload(); /// Close modal after successful submission
              } else {
                showErrorToast("An Error Occurred");
                //console.log(result, "lol added successfully");
                //closeModal(); // Close modal after successful submission
              }
            })
            .catch(() => {
              showErrorToast("Could not add stakeholder");
              //console.error("Error adding stakeholder:", error);
              // Handle any error, if needed
            })
            .finally(() => {
              //setSubmitting(false); // Set submitting state to false
            });
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form style={{ width: "100%" }}>
            {/* Dropdown for type */}
            <SelectInput
              label="Type"
              value={values.type}
              onChange={handleChange}
              id="type"
              name="type"
              options={["call", "email"]}
              placeholder="Select a type"
              error=""
            />

            {/* Text input for subject */}
            <TextInputDashboard
              label="Subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Subject"
              error=""
              id="subject"
            />

            {/* Text input for summary */}
            <TextInputDashboard
              label="Summary"
              name="summary"
              type="text"
              value={values.summary}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Summary"
              error=""
              height
              id="summary"
            />

            {/* Button to submit */}
            <HalfButton text="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Modal
        isOpen={isModalOpen}
        onOpen={openModal}
        onClose={closeModal}
        formContent={content}
        ifClose={true}
      />

      <Modal
        isOpen={isModalOpenCreateLog}
        onOpen={openModalCreateLog}
        onClose={closeModalCreateLog}
        formContent={contentCreateLog}
        ifClose={true}
      />

      <div className="search-container" style={{ padding: 16 }}>
        <input
          type="text"
          placeholder="Search by name, email, or ID"
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
      {filteredFeedbacks.length === 0 ? (
        <NoTicketsMessage
          heading="Whoops... No Stakeholder Found"
          paragraph="No Stakeholder data logged yet"
          imageUrl={NoTickets}
          imageAlt="No Tickets"
        />
      ) : (
        <table className="log-table">
          <thead>
            <tr className="log-item">
              <th>Stakeholder </th>
              <th>Date Submitted</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback.id} style={{ cursor: "pointer" }}>
                <td style={{ display: "flex", alignContent: "center" }}>
                  <div
                    style={getBackgroundColor(feedback?.name.charAt(0))}
                    className="feedback-image"
                  >
                    {feedback?.name?.charAt(0)}
                  </div>

                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <span style={{ fontSize: 16, color: "#121212" }}>
                      {feedback?.name}
                    </span>
                    <span style={{ fontSize: 12, color: "#808080" }}>
                      {feedback?.email}
                    </span>
                  </div>
                </td>

                <td style={{ fontSize: 14 }}>
                  {formatDate(feedback.created_at)}
                </td>
                <td>{feedback.reference}</td>
                <td>
                  <p
                    className="view-tickets"
                    onClick={() => handleItemClick(feedback)}
                  >
                    View Stakeholder <MdSend />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactList;
