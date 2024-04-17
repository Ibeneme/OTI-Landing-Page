import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextInputDashboard from "../../../../../Pages/Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../../../../Pages/Auth/Components/TextInouts/SelectInput";
import Button from "../../../../../Pages/Auth/Components/Buttons/Button";
import "../../AddStakeholders/Customer/Customer.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  stakeholderName: Yup.string().required("Stakeholder name is required"),
  relationshipDetails: Yup.string().required(
    "Relationship details are required"
  ),
  stakeholderType: Yup.string().required("Stakeholder type is required"),
  industrySector: Yup.string().required("Industry/sector is required"),
  strategicStakeholderManager: Yup.string().required(
    "Strategic Stakeholder Manager is required"
  ),
  file: Yup.mixed().required("File is required"),
});

const initialValues = {
  stakeholderName: "",
  relationshipDetails: "",
  stakeholderType: "",
  industrySector: "",
  strategicStakeholderManager: "",
  file: null,
};

const stakeholderTypeOptions = ["Type 1", "Type 2", "Type 3"];
const strategicStakeholderManagerOptions = [
  "Sazy",
  "IB",
  "Yemi",
  "Obe",
  "Godwin",
  "Justina",
  "Ayo",
];

const OthersStepA = () => {
  const [file, setFile] = useState<File | any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
  };

  const navigate = useNavigate();
  return (
    <div style={{ position: "relative" }}>
      {/* Background Image */}
      <div
        style={{
          width: "50%",
          backgroundImage:
            "url('https://f005.backblazeb2.com/file/Webimages-used/purpledata.png')",
          height: "100vh",
          backgroundSize: "cover",
          position: "fixed",
        }}
        className="float-left"
      />

      {/* Form Section */}
      <div
        style={{
          width: "50%",
          marginTop: 48,
          marginBottom: 48,
        }}
        className="float-right"
      >
        <div>
          {/* Step Indicator */}
          <h2
            style={{
              color: "var(--darkOrange)",
              backgroundColor: "#ff5c0025",
              width: 100,
              marginBottom: 24,
              fontSize: 14,
              marginLeft: 24,
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 48,
              textAlign: "center",
            }}
          >
            Step 1 of 3
          </h2>
          {/* Title */}
          <h4 style={{ paddingLeft: 24, marginBottom: 24, fontSize: 16 }}>
            Stakeholder Details
          </h4>
        </div>
        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Add file to form values
            values.file = file;
            navigate("/others-step2");
            console.log("Form values on submission:", values);
          }}
        >
          {({ handleChange, values }) => (
            <Form style={{ paddingLeft: 24, width: "70%" }}>
              {/* Stakeholder Name */}
              <TextInputDashboard
                label="Name of stakeholder:"
                value={values.stakeholderName}
                onChange={handleChange}
                type="text"
                id="stakeholderName"
                name="stakeholderName"
                placeholder="stakeholder name"
              />
              <ErrorMessage
                name="stakeholderName"
                component="div"
                className="err"
              />

              {/* Relationship Details */}
              <TextInputDashboard
                label="Nature and details of relationship:"
                value={values.relationshipDetails}
                onChange={handleChange}
                type="text"
                id="relationshipDetails"
                name="relationshipDetails"
                placeholder="relationship details"
              />
              <ErrorMessage
                name="relationshipDetails"
                component="div"
                className="err"
              />

              {/* Stakeholder Type */}
              <SelectInput
                label="Stakeholder type:"
                value={values.stakeholderType}
                onChange={handleChange}
                id="stakeholderType"
                name="stakeholderType"
                options={stakeholderTypeOptions}
                placeholder="Select..."
              />
              <ErrorMessage
                name="stakeholderType"
                component="div"
                className="err"
              />

              {/* Industry Sector */}
              <TextInputDashboard
                label="Stakeholder's industry or sector:"
                value={values.industrySector}
                onChange={handleChange}
                type="text"
                id="industrySector"
                name="industrySector"
                placeholder="industry/sector"
              />
              <ErrorMessage
                name="industrySector"
                component="div"
                className="err"
              />

              {/* Strategic Stakeholder Manager */}
              <SelectInput
                label="Strategic Stakeholder Manager (SSM):"
                value={values.strategicStakeholderManager}
                onChange={handleChange}
                id="strategicStakeholderManager"
                name="strategicStakeholderManager"
                options={strategicStakeholderManagerOptions}
                placeholder="Select..."
              />
              <ErrorMessage
                name="strategicStakeholderManager"
                component="div"
                className="err"
              />

              {/* Upload for Due Diligence */}
              <div style={{ marginTop: 24 }}>
                <label htmlFor="dueDiligenceUpload">
                  Upload Due Diligence:
                </label>
                <input
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                    color: "#333",
                    outline: "none",
                    cursor: "pointer",
                    width: "90%",
                    marginBottom: 48,
                  }}
                  type="file"
                  id="dueDiligenceUpload"
                  name="dueDiligenceUpload"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <ErrorMessage name="file" component="div" className="err" />
              </div>

              {/* Submit Button */}
              <Button text="Next" type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OthersStepA;
