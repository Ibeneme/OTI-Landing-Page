import React, { useEffect, useRef, useState, ReactElement } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MdCancel } from "react-icons/md";
import { FaFile } from "react-icons/fa6";
import "./FeedBackForms.css";
import {
  TbMailFilled,
  TbPhoneFilled,
  TbTextOrientation,
  TbUserFilled,
} from "react-icons/tb";
import FeedbackFooter from "./FeedbackFooter";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../Redux/Store";
import { useDispatch } from "react-redux";
import { createFeedback } from "../../../../Redux/Feedback/Feedback";
import Modal from "../../../components/Modal/Modal";
import SuccessModalPop from "../Tickets/component/SuccessModal";
import { FormikHelpers } from "formik";

const initialValues: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  phone: "",
  attachments: null,
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  project_name?: string;
  attachments: FileList | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

type IconProps = {
  icon: ReactElement;
};

const WebForm: React.FC = () => {
  const [ID, setID] = useState<string | null>(null);
  const [acada, setAcadabooState] = useState("");

  useEffect(() => {
    const url = window.location.href;
    const organizationProfileRegex =
      /https:\/\/project-srm.vercel.app\/form\/([^/]+)\/([^/]+)/;
    const match = url.match(organizationProfileRegex);
    if (match) {
      const acadabooState = match[1];
      const id = match[2];
      console.log("Acadaboo State:", acadabooState);
      console.log("ID:", id);
      setAcadabooState(acadabooState);
      setID(id);
    }
  }, []);

  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [isTicketSuccessModalOpen, setIsTicketSuccessModalOpen] =
    useState(false);

  const openSuccessTicketModal = () => {
    setIsTicketSuccessModalOpen(true);
  };
  const closeSuccessTicketModal = () => {
    setIsTicketSuccessModalOpen(false);
  };

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    setErr("");
    console.log({ values }, "values", ID);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file: File) => {
        formData.append(`attachments`, file);
        console.log(file, "filefile");
      });

      let modifiedAcada = acada.charAt(0).toUpperCase() + acada.slice(1);
      let projectName = modifiedAcada;
      if (projectName === "Antigravity%20site") {
        projectName = "Antigravity";
      }
      console.log(projectName, "modifiedAcada");
      console.log(modifiedAcada, "modifiedAcada");
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("subject", values.subject);
      formData.append("message", values.message);
      formData.append("phone", values.phone);
      formData.append("project_name", modifiedAcada);
      const response = await dispatch(
        createFeedback({
          feedbackData: formData,
          organization_id: ID,
        })
      );
      console.log("Feedback submitted successfully!", response?.meta);
      switch (response.meta.requestStatus) {
        case "fulfilled":
          console.log("Success:", response);
          openSuccessTicketModal();
          resetForm();
          setSelectedFiles([]);
          break;
        default:
          setErr("An Error occurred");
      }
    } catch (error) {
      console.log("Error submitting feedback:", error);
      throw error;
    }
  };

  const [err, setErr] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function getBackgroundColor(acadabooState: string): string {
    switch (acadabooState) {
      case "acadaboo":
        return "#800080";
      case "oberon":
        return "#0C8C8C";
      case "antigravity":
        return "#042444";
      default:
        return "#042444";
    }
  }

  function getTextColor(acadabooState: string): string {
    switch (acadabooState) {
      case "acadaboo":
        return "#80008012";
      case "oberon":
        return "#0C8C8C12";
      case "antigravity":
        return "#04244412";
      default:
        return "#04244412";
    }
  }

  const acadabooState = acada;
  const bgColor = getBackgroundColor(acadabooState);
  const textColor = getTextColor(acadabooState);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed");
    if (event.target.files) {
      console.log("Files selected:", event.target.files);
      setErr("");
      const filesArray = Array.from(event.target.files);
      console.log("Files array:", filesArray);

      // Filter out non-image files
      const imageFiles = filesArray.filter((file) =>
        file.type.startsWith("image/")
      );

      // Check image file sizes
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      const oversizedImages = imageFiles.filter((file) => file.size > maxSize);

      if (imageFiles.length !== filesArray.length) {
        // Set error message if non-image files are selected
        setErr("Images upload accepted only");
        alert("Images upload accepted only");
      } else if (oversizedImages.length > 0) {
        setErr("Image size shouldn't be above 5MB per image");
        alert("Image size shouldn't be above 5MB per image");
      } else {
        // Clear error message if only image files are selected and their sizes are within limits
        setErr("");
        setSelectedFiles((prevFiles) => [...prevFiles, ...imageFiles]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileButtonClick = () => {
    console.log();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const successModal = (
    <SuccessModalPop
      title="Feedback Form Submitted Successfully"
      message="You’ve successfully Submitted a feedback form"
      onClose={closeSuccessTicketModal}
    />
  );

  const IconComponent: React.FC<IconProps> = ({ icon }) => {
    return (
      <div
        style={{
          marginTop: -21,
          backgroundColor: bgColor,
          width: 16,
          height: 16,
          padding: 12,
          borderRadius: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="bouncing-buttons"
      >
        {icon}
      </div>
    );
  };

  return (
    <section>
      <Modal
        isOpen={isTicketSuccessModalOpen}
        onOpen={openSuccessTicketModal}
        onClose={closeSuccessTicketModal}
        formContent={successModal}
        borderColor={bgColor}
      />
      <div
        ref={formRef}
        style={{ backgroundColor: textColor }}
        className="background-image"
      >
        <div className="container" style={{ border: `3px solid ${bgColor}` }}>
          <div className="form-container">
            <h2>Feedback Form</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form style={{ paddingTop: 36 }}>
                  <div className="form-group">
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginBottom: -24 }}>
                        <IconComponent
                          icon={<TbUserFilled color="#fff" size="24" />}
                        />
                      </div>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        style={{
                          padding: "10px",
                          fontFamily: "var(--fontFamily)",
                          width: "100%",
                          border: "1px solid #80808075",
                          borderRadius: 8,
                        }}
                      />
                    </div>
                    {errors.name && (
                      <p className="error-message" style={{ color: bgColor }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginBottom: -24 }}>
                        <IconComponent
                          icon={<TbMailFilled color="#fff" size="24" />}
                        />
                      </div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        style={{
                          padding: "10px",
                          fontFamily: "var(--fontFamily)",
                          width: "100%",
                          border: "1px solid #80808075",
                          borderRadius: 8,
                        }}
                      />
                    </div>
                    {errors.email && (
                      <p className="error-message" style={{ color: bgColor }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginBottom: -24 }}>
                        <IconComponent
                          icon={<TbTextOrientation color="#fff" size="24" />}
                        />
                      </div>

                      <Field
                        type="text"
                        name="subject"
                        placeholder="Enter the subject"
                        style={{
                          padding: "10px",
                          fontFamily: "var(--fontFamily)",
                          width: "100%",
                          border: "1px solid #80808075",
                          borderRadius: 8,
                        }}
                      />
                    </div>
                    {errors.subject && (
                      <p className="error-message" style={{ color: bgColor }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginBottom: -24 }}>
                        <IconComponent
                          icon={<TbTextOrientation color="#fff" size="24" />}
                        />
                      </div>

                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Enter your message"
                        style={{
                          padding: "10px",
                          fontFamily: "var(--fontFamily)",
                          width: "100%",
                          border: "1px solid #80808075",
                          borderRadius: 8,
                          minHeight: 150,
                        }}
                      />
                    </div>
                    {errors.message && (
                      <p className="error-message" style={{ color: bgColor }}>
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginBottom: -24 }}>
                        <IconComponent
                          icon={<TbPhoneFilled color="#fff" size="24" />}
                        />
                      </div>
                      <Field
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        style={{
                          padding: "10px",
                          fontFamily: "var(--fontFamily)",
                          width: "100%",
                          border: "1px solid #80808075",
                          borderRadius: 8,
                        }}
                      />
                    </div>
                    {errors.phone && (
                      <p className="error-message" style={{ color: bgColor }}>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div
                    className="form-group airport"
                    style={{ backgroundColor: textColor }}
                  >
                    <input
                      type="file"
                      name="attachments"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      multiple
                    />
                    <button
                      type="button"
                      style={{
                        fontSize: 14,
                        marginTop: 24,
                        backgroundColor: bgColor,
                      }}
                      className="button-feedback"
                      onClick={handleFileButtonClick}
                    >
                      + Choose File
                    </button>
                    <div className="selected-files">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="file-item">
                          {file.type.startsWith("image/") ? (
                            <>
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Attachments ${index + 1}`}
                                className="file-preview"
                              />
                              <div
                                className="file-name"
                                style={{ fontSize: 10 }}
                              >
                                {file.name}
                              </div>
                            </>
                          ) : (
                            <div
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <FaFile
                                className="file-icon"
                                style={{ backgroundColor: bgColor }}
                              />{" "}
                              <div
                                className="file-name"
                                style={{ fontSize: 10, color: bgColor }}
                              >
                                {file.name}
                              </div>
                            </div>
                          )}
                          <MdCancel
                            className="cancel-icon"
                            style={{ backgroundColor: bgColor }}
                            onClick={() => handleRemoveFile(index)}
                          />
                        </div>
                      ))}
                    </div>
                    {err ? (
                      <span
                        style={{
                          color: bgColor,
                          fontSize: 12,
                        }}
                      >
                        {err}
                      </span>
                    ) : null}
                  </div>
                  <button
                    className="button-feedback"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ backgroundColor: "#000", fontSize: 14 }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <FeedbackFooter bgColor={textColor} iconColors={bgColor} />
    </section>
  );
};

export default WebForm;
