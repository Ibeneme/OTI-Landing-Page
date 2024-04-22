import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextInputDashboard from "../../../../../Pages/Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../../../../Pages/Auth/Components/TextInouts/SelectInput";
import Button from "../../../../../Pages/Auth/Components/Buttons/Button";
import "../../AddStakeholders/Customer/Customer.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  legalStatus: Yup.string().required("Legal status is required"),
  category: Yup.string().required("Category is required"),
  businessStatus: Yup.string().required("Business status is required"),
  serviceType: Yup.string().required("Type and nature of service is required"),
  primaryEntity: Yup.string().required("Primary entity is required"),
  clientRelationshipManager: Yup.string().required(
    "Client Relationship Manager is required"
  ),
  sensitivity: Yup.string().required("Sensitivity is required"),
});

const initialValues = {
  name: "",
  legalStatus: "",
  category: "",
  businessStatus: "",
  serviceType: "",
  primaryEntity: "",
  clientRelationshipManager: "",
  sensitivity: "",
};

const legalStatusOptions = [
  "Individual/business name",
  "Company",
  "Government agency",
  "NPO",
];
const categoryOptions = ["VIP", "Regular"];
const businessStatusOptions = ["Active", "Inactive", "Prospective"];
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

const ClientStepA = () => {
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
      <div>
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
              Add a Client - Basic Info
            </h4>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              navigate("/client-step2");
              console.log("Form values on submission:", values);
            }}
          >
            {({ handleChange, values }) => (
              <Form style={{ paddingLeft: 24, width: "70%" }}>
                <TextInputDashboard
                  label="Name of the client:"
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
                  options={legalStatusOptions}
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
                  options={categoryOptions}
                  placeholder="Select..."
                />
                <ErrorMessage name="category" component="div" className="err" />

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

                <TextInputDashboard
                  label="Type and nature of service:"
                  value={values.serviceType}
                  onChange={handleChange}
                  type="text"
                  id="serviceType"
                  name="serviceType"
                  placeholder="type and nature of service"
                />
                <ErrorMessage
                  name="serviceType"
                  component="div"
                  className="err"
                />

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
                  label="Client Relationship Manager (CRM):"
                  value={values.clientRelationshipManager}
                  onChange={handleChange}
                  type="text"
                  id="clientRelationshipManager"
                  name="clientRelationshipManager"
                  placeholder="Client Relationship Manager"
                />
                <ErrorMessage
                  name="clientRelationshipManager"
                  component="div"
                  className="err"
                />

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

                <Button text="Next" type="submit" />
              </Form>
            )}
          </Formik>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ClientStepA;
