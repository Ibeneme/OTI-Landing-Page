import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getAllLogs } from "../../../../Redux/Profile/Profile";
import { RootState } from "../../../../Redux/Store";
import LogList, { Feedback } from "../Users/Components/Logs";
import ShimmerLoaderPage from "../../Utils/ShimmerLoader/ShimmerLoaderPage";

const AlllogsComponent: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [feedbackForms, setFeedbackForms] = useState<Feedback[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(15);

  const fetchData = async () => {
    setPageLoading(true);
    try {
      const response = await dispatch(getAllLogs());
      setFeedbackForms(response?.payload);
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbackForms.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          <LogList feedbacks={currentItems} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={feedbackForms.length}
            currentPage={currentPage} // Add the currentPage prop here
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default AlllogsComponent;

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
