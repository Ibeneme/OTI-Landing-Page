import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux/Store";
import ShimmerLoaderPage from "../../../Utils/ShimmerLoader/ShimmerLoaderPage";
import { getCustomers, getProfile } from "../../../../../Redux/Profile/Profile";
import ContactList, { Stakeholder } from "./ContactList";
import Modal from "../../../../components/Modal/Modal";
//mport useCustomToasts from "../../../Utils/ToastNotifications/Toastify";
import { useLoading } from "../../../../Hook/useTicketLoading";
import StakeholdersOption from "../../../../VersionB/Components/Stakeholders/StakeholderOptions/StakeholderOptions";
import HalfButton from "../../../Auth/Components/Buttons/HalfBtn";

// interface TextInputDashboardProps {
//   label: string;
//   name: string;
//   type: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<any>) => void;
//   onBlur: (e: React.FocusEvent<any>) => void; // Add onBlur property
//   error: string | undefined;
//   touched: boolean | undefined;
// }

const ContactLog: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [feedbackForms, setFeedbackForms] = useState<Stakeholder[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(15);
  // const { showSuccessToast, showErrorToast } = useCustomToasts();
  const { SRMTicketsLoading } = useLoading();
  //const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    setPageLoading(true);
    try {
      const response = await dispatch(getCustomers());
      //console.log("getCustomers:", response?.payload);
      setFeedbackForms(response?.payload);
      //console.log(response?.payload, "response?.payload");
      setPageLoading(false);
    } catch (error) {
      //console.error("Error fetching customers:", error);
      setPageLoading(false);
    }
  };

  const fetchDatsa = async () => {
    // setPageLoading(true);
    try {
      const response = await dispatch(getCustomers());
      //console.log("getCustomers:", response?.payload);
      setFeedbackForms(response?.payload);
      //console.log(response?.payload, "response?.payload");
      // setPageLoading(false);
    } catch (error) {
      //console.error("Error fetching customers:", error);
      //setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (SRMTicketsLoading) {
      fetchData();
      fetchDatsa();
    }
  }, [dispatch]);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbackForms.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal

  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle form submission
  //const handleSubmit = (values: any, { setSubmitting }: any) => {
  // setLoading(true);
  //console.log(values, "values");
  // dispatch(createStakeholder(values)) // Dispatch createStakeholder action
  //   .then((result) => {
  //     if (result?.payload === 200) {
  //       showSuccessToast("Stakeholder added Successfully");
  //       closeModal();
  //       fetchDatsa();
  //       window.location.reload(); //
  //       setLoading(false); // Close modal after successful submission
  //     } else {
  //       showErrorToast("Stakeholder Already Exists");
  //       setLoading(false);
  //     }
  //   })
  //   .catch(() => {
  //     showErrorToast("Could not add stakeholder");
  //     //console.error("Error adding stakeholder:", error);
  //     setLoading(false); // Handle any error, if needed
  //   })
  //   .finally(() => {
  //     setLoading(false);
  //     setSubmitting(false);
  //   });
  //};

  const data = [
    {
      title: "Add a Client",
      description:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
      index: 1,
    },
    {
      title: "Add a Customer",
      description:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
      index: 2,
    },
    {
      title: "Add a Digital Customer and Users",
      description:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
      index: 3,
    },
    {
      title: "Add Other Stakeholder",
      description:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
      index: 4,
    },
  ];

  const content = (
    <div className="form_content_display-dashboard">
      <div style={{ alignSelf: "flex-start", width: "100%" }}>
        <h2>Add a Stakeholder</h2>
        <p style={{ color: "#666666", margin: 0 }}>Add a Stakeholder</p>
        <br /> <br /> <StakeholdersOption data={data} />
        <div style={{ alignSelf: "flex-start", width: "100%", marginTop: 24 }}>
          <HalfButton text="Submit" onClick={() => console.log("clikcde")} />
        </div>{" "}
      </div>
    </div>
  );

  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  return (
    <div
      style={{
        backgroundColor: "white",
        paddingTop: 24,
        marginTop: -72,
        borderRadius: 12,
      }}
    >
      {pageLoading ? (
        <ShimmerLoaderPage />
      ) : (
        <>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            formContent={content}
            ifClose
          />

          {userProfile?.permission_type !== "support" && (
            <div>
              <button
                className="no_tickets-div-button bouncing-button"
                style={{
                  color: "white",
                  height: 50,
                  fontSize: 14,
                  margin: 0,
                  position: "fixed",
                  bottom: 20,
                  right: 40,
                  width: 180,
                }}
                onClick={openModal}
              >
                + Add a Stakeholder
              </button>
            </div>
          )}
          <ContactList feedbacks={currentItems} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={feedbackForms.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default ContactLog;

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <span
        className="pagination"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // gap: 6,
        }}
      >
        {pageNumbers.map((number) => (
          <p
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <p
              onClick={() => paginate(number)}
              className="page-link"
              style={{
                backgroundColor:
                  currentPage === number ? "var(--darkOrange)" : "",
                padding: 12,
                height: 24,
                minWidth: 24,
                borderRadius: 24,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: currentPage === number ? "white" : "black",
              }}
            >
              {number}
            </p>
          </p>
        ))}
      </span>
    </nav>
  );
};
