import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextInputDashboard from "../../../../Pages/Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../../../Pages/Auth/Components/TextInouts/SelectInput";
import Button from "../../../../Pages/Auth/Components/Buttons/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  legalStatus: Yup.string().required("Legal status is required"),
  category: Yup.string().required("Category is required"),
  industry: Yup.string().required("Industry or sector is required"),
  businessStatus: Yup.string().required("Business status is required"),
  formOfBusiness: Yup.string().required(
    "Form of commercial business is required"
  ),
  details: Yup.string().required("Details are required"),
  primaryEntity: Yup.string().required("Primary entity is required"),
  sam: Yup.string().required("Strategic Account Manager is required"),
  sensitivity: Yup.string().required("Sensitivity is required"),
});

const initialValues = {
  name: "",
  legalStatus: "",
  category: "",
  industry: "",
  businessStatus: "",
  formOfBusiness: "",
  details: "",
  primaryEntity: "",
  sam: "",
  sensitivity: "",
};

const options = [
  "Individual/business name",
  "Company",
  "Government agency",
  "NPO",
];

const categories = ["VIP", "Regular"];

const businessStatusOptions = ["Active", "Inactive", "Prospective"];

const formOfBusinessOptions = ["Investment", "Service", "Product", "Other"];

const primaryEntityOptions = [
  "Antigravity Group Ltd",
  "Antigravity Incubated",
  "Antigravity Consulting Ltd",
  "Antigravity TechHub Ltd",
  "Antigravity Media Ltd",
  "IAU Partners",
  "NextGen Aspire Agro Partners (NGAAP)",
];

const sensitivityOptions = ["Most confidential", "Confidential", "Restricted"];

const Client: React.FC = () => {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          float: "left",
          width: "50%",
          backgroundImage:
            "url('https://f005.backblazeb2.com/file/Webimages-used/bluedata.png')",
          height: "100vh",
          backgroundSize: "cover",
          position: "fixed",
        }}
      />

      <div
        style={{
          float: "right",
          width: "50%",
          marginTop: 48,
          marginBottom: 48,
        }}
      >
        <div>
          <h2
            style={{
              color: " var(--darkOrange)",
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
          <h4 style={{ paddingLeft: 24, marginBottom: 24, fontSize: 16 }}>
            Basic Info
          </h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form values on submission:", values);
          }}
        >
          {({ handleChange, values }) => (
            <Form style={{ paddingLeft: 24, width: "70%" }}>
              <TextInputDashboard
                label="Name of the customer:"
                value={values.name}
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
              />
              <ErrorMessage name="name" component="div" />

              <SelectInput
                label="Legal status:"
                value={values.legalStatus}
                onChange={handleChange}
                id="legalStatus"
                name="legalStatus"
                options={options}
                placeholder="Select..."
              />
              <ErrorMessage name="legalStatus" component="div" />

              <SelectInput
                label="Category:"
                value={values.category}
                onChange={handleChange}
                id="category"
                name="category"
                options={categories}
                placeholder="Select..."
              />
              <ErrorMessage name="category" component="div" />

              <TextInputDashboard
                label="Customer's industry or sector:"
                value={values.industry}
                onChange={handleChange}
                type="text"
                id="industry"
                name="industry"
                placeholder="Enter industry or sector"
              />
              <ErrorMessage name="industry" component="div" />

              <SelectInput
                label="Business status:"
                value={values.businessStatus}
                onChange={handleChange}
                id="businessStatus"
                name="businessStatus"
                options={businessStatusOptions}
                placeholder="Select..."
              />
              <ErrorMessage name="businessStatus" component="div" />

              <SelectInput
                label="Form of commercial business:"
                value={values.formOfBusiness}
                onChange={handleChange}
                id="formOfBusiness"
                name="formOfBusiness"
                options={formOfBusinessOptions}
                placeholder="Select..."
              />
              <ErrorMessage name="formOfBusiness" component="div" />

              <TextInputDashboard
                label="Details commercial business:"
                value={values.details}
                onChange={handleChange}
                type="text"
                id="details"
                name="details"
                placeholder="Enter details"
              />
              <ErrorMessage name="details" component="div" />

              <SelectInput
                label="Primary Entity at the Antigravity Group:"
                value={values.primaryEntity}
                onChange={handleChange}
                id="primaryEntity"
                name="primaryEntity"
                options={primaryEntityOptions}
                placeholder="Select..."
              />
              <ErrorMessage name="primaryEntity" component="div" />

              <TextInputDashboard
                label="Strategic Account Manager (SAM):"
                value={values.sam}
                onChange={handleChange}
                type="text"
                id="sam"
                name="sam"
                placeholder="Enter Strategic Account Manager"
              />
              <ErrorMessage name="sam" component="div" />

              <SelectInput
                label="Sensitivity:"
                value={values.sensitivity}
                onChange={handleChange}
                id="sensitivity"
                name="sensitivity"
                options={sensitivityOptions}
                placeholder="Select..."
              />
              <ErrorMessage name="sensitivity" component="div" />

              <Button
                text="Next"
                type="submit"
                //loading={loading} disabled={loading}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Client;
