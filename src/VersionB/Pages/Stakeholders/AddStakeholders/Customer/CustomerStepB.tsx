import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextInputDashboard from "../../../../../Pages/Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../../../../Pages/Auth/Components/TextInouts/SelectInput";
import Button from "../../../../../Pages/Auth/Components/Buttons/Button";
import "./Customer.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  addressType: Yup.string().required("Address type is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  communicationPreference: Yup.string().required(
    "Communication preference is required"
  ),
  contactPersonName: Yup.string().required("Contact person name is required"),
  contactPersonTitle: Yup.string().required("Contact person title is required"),
  contactPersonEmail: Yup.string()
    .email("Invalid email")
    .required("Contact person email is required"),
});

const initialValues = {
  addressType: "",
  address: "",
  phoneNumber: "",
  email: "",
  communicationPreference: "",
  contactPersonName: "",
  contactPersonTitle: "",
  contactPersonEmail: "",
};

const addressTypeOptions = [
  "Street",
  "Landmark/Nearest Bus-Stop",
  "City",
  "State",
  "Country",
];

const communicationPreferenceOptions = ["Email", "Phone"];

const CustomerStepB: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: "50%",
          backgroundImage:
            "url('https://f005.backblazeb2.com/file/Webimages-used/001.png')",
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
            Step 2 of 3
          </h2>
          <h4 style={{ paddingLeft: 24, marginBottom: 24, fontSize: 16 }}>
            Customer's Address and Contact Information
          </h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            navigate("/customer-step");
            console.log("Form values on submission:", values);
          }}
        >
          {({ handleChange, values }) => (
            <Form style={{ paddingLeft: 24, width: "70%" }}>
              <SelectInput
                label="Customer's Address Type:"
                value={values.addressType}
                onChange={handleChange}
                id="addressType"
                name="addressType"
                options={addressTypeOptions}
                placeholder="Select..."
              />
              <ErrorMessage
                name="addressType"
                component="div"
                className="err"
              />

              <TextInputDashboard
                label="Customer's Address:"
                value={values.address}
                onChange={handleChange}
                type="text"
                id="address"
                name="address"
                placeholder="address"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="err"
              />

              <TextInputDashboard
                label="Customer's Phone Number:"
                value={values.phoneNumber}
                onChange={handleChange}
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="phone number"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="err"
              />

              <TextInputDashboard
                label="Customer's Email:"
                value={values.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                placeholder="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="err"
              />

              <SelectInput
                label="Customer's Primary Communication Preference:"
                value={values.communicationPreference}
                onChange={handleChange}
                id="communicationPreference"
                name="communicationPreference"
                options={communicationPreferenceOptions}
                placeholder="Select..."
              />
              <ErrorMessage
                name="communicationPreference"
                component="div"
                className="err"
              />

              <TextInputDashboard
                label="Customer's Contact Person Name:"
                value={values.contactPersonName}
                onChange={handleChange}
                type="text"
                id="contactPersonName"
                name="contactPersonName"
                placeholder="contact person name"
              />
              <ErrorMessage
                name="contactPersonName"
                component="div"
                className="err"
              />

              <TextInputDashboard
                label="Customer's Contact Person Title:"
                value={values.contactPersonTitle}
                onChange={handleChange}
                type="text"
                id="contactPersonTitle"
                name="contactPersonTitle"
                placeholder="contact person title"
              />
              <ErrorMessage
                name="contactPersonTitle"
                component="div"
                className="err"
              />

              <TextInputDashboard
                label="Customer's Contact Person Email:"
                value={values.contactPersonEmail}
                onChange={handleChange}
                type="email"
                id="contactPersonEmail"
                name="contactPersonEmail"
                placeholder="contact person email"
              />
              <ErrorMessage
                name="contactPersonEmail"
                component="div"
                className="err"
              />

              <Button text="Next" type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CustomerStepB;
