import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextInputDashboard from "../../../../../Pages/Auth/Components/TextInouts/TextInputDashboard";
import Button from "../../../../../Pages/Auth/Components/Buttons/Button";

const validationSchema = Yup.object().shape({
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
  renewalDate: Yup.date().required("Renewal date is required"),
  terms: Yup.string().required("Terms are required"),
  specialNotes: Yup.string(),
});

const initialValues = {
  startDate: "",
  endDate: "",
  renewalDate: "",
  terms: "",
  specialNotes: "",
};

const DigitalCustomerStepC: React.FC = () => {
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
            Step 3 of 3
          </h2>
          <h4 style={{ paddingLeft: 24, marginBottom: 24, fontSize: 16 }}>
            Subscription Details
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
                label="Start Date:"
                value={values.startDate}
                onChange={handleChange}
                type="date"
                id="startDate"
                name="startDate"
                placeholder="Select start date"
              />
              <ErrorMessage name="startDate" component="div" className="err" />

              <TextInputDashboard
                label="End Date:"
                value={values.endDate}
                onChange={handleChange}
                type="date"
                id="endDate"
                name="endDate"
                placeholder="Select end date"
              />
              <ErrorMessage name="endDate" component="div" className="err" />

              <TextInputDashboard
                label="Renewal Date:"
                value={values.renewalDate}
                onChange={handleChange}
                type="date"
                id="renewalDate"
                name="renewalDate"
                placeholder="Select renewal date"
              />
              <ErrorMessage
                name="renewalDate"
                component="div"
                className="err"
              />

              <TextInputDashboard
                label="Terms:"
                value={values.terms}
                onChange={handleChange}
                type="text"
                id="terms"
                name="terms"
                placeholder="terms"
                height
              />
              <ErrorMessage name="terms" component="div" className="err" />

              <TextInputDashboard
                label="Special Notes or Comments:"
                value={values.specialNotes}
                onChange={handleChange}
                type="text"
                id="specialNotes"
                name="specialNotes"
                height
                placeholder="special notes or comments"
              />
              <ErrorMessage
                name="specialNotes"
                component="div"
                className="err"
              />

              <Button
                text="Submit"
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

export default DigitalCustomerStepC;
