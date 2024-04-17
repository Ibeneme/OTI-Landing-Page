import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextInputDashboard from "../../../../../Pages/Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../../../../Pages/Auth/Components/TextInouts/SelectInput";
import Button from "../../../../../Pages/Auth/Components/Buttons/Button";
import "./Customer.css";
import { useNavigate } from "react-router-dom";

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

const CustomerStepA: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: "50%",
          backgroundImage:
            "url('https://f005.backblazeb2.com/file/Webimages-used/bluedata.png')",
          height: "100vh",
          backgroundSize: "cover",
          position: "fixed",
        }}
        className="float-left"
      />

      <div
        style={{
          width: "50%",
          marginTop: 48,
          marginBottom: 48,
        }}
        className="float-right"
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
            Add a Customer - Basic Info
          </h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            navigate("/customer-step2");
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
                placeholder="name"
              />
              <ErrorMessage name="name" component="div" className="err" />

              <SelectInput
                label="Legal status:"
                value={values.legalStatus}
                onChange={handleChange}
                id="legalStatus"
                name="legalStatus"
                options={options}
                placeholder="Select..."
              />
              <ErrorMessage
                name="legalStatus"
                component="div"
                className="err"
              />

              <SelectInput
                label="Category:"
                value={values.category}
                onChange={handleChange}
                id="category"
                name="category"
                options={categories}
                placeholder="Select..."
              />
              <ErrorMessage name="category" component="div" className="err" />

              <TextInputDashboard
                label="Customer's industry or sector:"
                value={values.industry}
                onChange={handleChange}
                type="text"
                id="industry"
                name="industry"
                placeholder="industry or sector"
              />
              <ErrorMessage name="industry" component="div" className="err" />

              <SelectInput
                label="Business status:"
                value={values.businessStatus}
                onChange={handleChange}
                id="businessStatus"
                name="businessStatus"
                options={businessStatusOptions}
                placeholder="Select..."
              />
              <ErrorMessage
                name="businessStatus"
                component="div"
                className="err"
              />

              <SelectInput
                label="Form of commercial business:"
                value={values.formOfBusiness}
                onChange={handleChange}
                id="formOfBusiness"
                name="formOfBusiness"
                options={formOfBusinessOptions}
                placeholder="Select..."
              />
              <ErrorMessage
                name="formOfBusiness"
                component="div"
                className="err"
              />

              <TextInputDashboard
                label="Details commercial business:"
                value={values.details}
                onChange={handleChange}
                type="text"
                id="details"
                name="details"
                placeholder="details"
              />
              <ErrorMessage name="details" component="div" className="err" />

              <SelectInput
                label="Primary Entity at the Antigravity Group:"
                value={values.primaryEntity}
                onChange={handleChange}
                id="primaryEntity"
                name="primaryEntity"
                options={primaryEntityOptions}
                placeholder="Select..."
              />
              <ErrorMessage
                name="primaryEntity"
                component="div"
                className="err"
              />

              <TextInputDashboard
                label="Strategic Account Manager (SAM):"
                value={values.sam}
                onChange={handleChange}
                type="text"
                id="sam"
                name="sam"
                placeholder="Strategic Account Manager"
              />
              <ErrorMessage name="sam" component="div" className="err" />

              <SelectInput
                label="Sensitivity:"
                value={values.sensitivity}
                onChange={handleChange}
                id="sensitivity"
                name="sensitivity"
                options={sensitivityOptions}
                placeholder="Select..."
              />
              <ErrorMessage
                name="sensitivity"
                component="div"
                className="err"
              />

              <Button
                text="Next"
                type="submit"
                onClick={() => navigate("/customer-step2")}
                //loading={loading} disabled={loading}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CustomerStepA;
