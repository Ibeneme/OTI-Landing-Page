import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
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
