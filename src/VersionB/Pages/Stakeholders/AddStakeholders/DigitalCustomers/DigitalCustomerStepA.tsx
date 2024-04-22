import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextInputDashboard from "../../../../../Pages/Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../../../../Pages/Auth/Components/TextInouts/SelectInput";
import Button from "../../../../../Pages/Auth/Components/Buttons/Button";
import "../../AddStakeholders/Customer/Customer.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  productService: Yup.string().required("Digital product/service is required"),
  financialType: Yup.string().required("Financial type is required"),
  industrySector: Yup.string().required("Industry/sector is required"),
  kycDocumentId: Yup.string().required("KYC document is required"),
});

const initialValues = {
  name: "",
  productService: "",
  financialType: "",
  industrySector: "",
  kycDocumentId: "",
};

const productServiceOptions = ["AcadaBoo", "Neo", "Oberon"];
const financialTypeOptions = ["Paying", "Non-paying"];

const DigitalCustomerStepA = () => {
  const [kycDocument, setKycDocument] = useState("");
  const [additionalInput, setAdditionalInput] = useState("");

  const handleKycDocumentChange = (value: any) => {
    setKycDocument(value);
    setAdditionalInput("");
  };

  const renderAdditionalInput = () => {
    switch (kycDocument) {
      case "BVN":
        return (
          <TextInputDashboard
            label="BVN:"
            value={additionalInput}
            onChange={(e) => setAdditionalInput(e.target.value)}
            type="text"
            id="bvn"
            name="bvn"
            placeholder="BVN"
          />
        );
      case "NIN":
        return (
          <>
            <TextInputDashboard
              label="NIN"
              value={additionalInput}
              onChange={(e) => setAdditionalInput(e.target.value)}
              type="text"
              id="idninType"
              name="idninType"
              placeholder="NIN Type"
            />
            {/* Add upload input for NIN slip */}
          </>
        );
      case "ID Type":
        return (
          <>
            <TextInputDashboard
              label="ID Type:"
              value={additionalInput}
              onChange={(e) => setAdditionalInput(e.target.value)}
              type="text"
              id="idType"
              name="idType"
              placeholder="ID Type"
            />
            {/* Add upload input for ID */}
          </>
        );
      case "Utility Bill":
        return (
          <input
            type="file"
            accept="image/*"
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
              // Add more styles as needed
            }}
          />
        );

      default:
        return null;
    }
  };

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
              Add a Digital Customer - Basic Info
            </h4>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              navigate("/digital-step2");
              console.log("Form values on submission:", values);
            }}
          >
            {({ handleChange, values }) => (
              <Form style={{ paddingLeft: 24, width: "70%" }}>
                <TextInputDashboard
                  label="Name of digital customer/user:"
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                />
                <ErrorMessage name="name" component="div" className="err" />

                <SelectInput
                  label="Digital product/service(s) used:"
                  value={values.productService}
                  onChange={handleChange}
                  id="productService"
                  name="productService"
                  options={productServiceOptions}
                  placeholder="Select..."
                />
                <ErrorMessage
                  name="productService"
                  component="div"
                  className="err"
                />

                <SelectInput
                  label="Financial type:"
                  value={values.financialType}
                  onChange={handleChange}
                  id="financialType"
                  name="financialType"
                  options={financialTypeOptions}
                  placeholder="Select..."
                />
                <ErrorMessage
                  name="financialType"
                  component="div"
                  className="err"
                />

                <TextInputDashboard
                  label="Digital customer/user's industry or sector:"
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

                <SelectInput
                  label="Upload for KYC documents where applicable:"
                  value={values.kycDocumentId}
                  onChange={(e) => {
                    handleChange(e);
                    handleKycDocumentChange(e.target.value);
                  }}
                  id="kycDocument"
                  name="kycDocumentId" // Changed to kycDocumentId to match validation
                  options={["BVN", "NIN", "ID Type", "Utility Bill"]}
                  placeholder="Select..."
                />
                <ErrorMessage
                  name="kycDocumentId" // Changed to kycDocumentId to match validation
                  component="div"
                  className="err"
                />

                {/* Additional input based on KYC document */}
                {renderAdditionalInput()}

                <Button text="Next" type="submit" />
              </Form>
            )}
          </Formik>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default DigitalCustomerStepA;
