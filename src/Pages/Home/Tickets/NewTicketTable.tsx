import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import RandomColorComponent from "../Dashboard/RandomColor";
import NoTicketsMessage from "../Dashboard/Components/NoTickets";
import NoTickets from "../../../assets/Dashboard/NoTickets.png";
import { Pagination } from "../Dashboard/Pagination";
import "../Dashboard/Dashboard.css";
import "../Dashboard/Components/Filter.css";

interface Ticket {
  id: string;
  title: string;
  handler?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  status: string;
  reference: string;
  created_at?: string;
  priority?: string
}

interface TicketTableProps {
  tickets: Ticket[];
  openDetailsTicketModal: any;
}

const TicketTable: React.FC<TicketTableProps> = ({
  tickets,
  openDetailsTicketModal,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(15); // You can change the number of items per page here

  const filteredTickets = tickets?.filter((ticket) => {
    const { handler, title, status, reference, priority } = ticket;
    const searchString = searchQuery.toLowerCase();
    return (
      (handler?.first_name?.toLowerCase()?.includes(searchString) ||
        handler?.last_name?.toLowerCase()?.includes(searchString) ||
        handler?.email?.toLowerCase()?.includes(searchString) ||
        title?.toLowerCase()?.includes(searchString) ||
        priority?.toLowerCase()?.includes(searchString) ||
        reference?.toLowerCase()?.includes(searchString) ||
        status.toLowerCase()?.includes(searchString)) &&
      ticket
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hour = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "pm" : "am";

    return `${month} ${day}, ${year}, at ${hour}:${minute}${ampm}`;
  };

  return (
    <div>
      <input
        className="search-filtered-tickets-input"
        type="text"
        style={{ marginTop: -240 }}
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search by title, handler's name, or priority..."
      />
      {filteredTickets?.length === 0 && searchQuery && (
        <NoTicketsMessage
          heading={
            <div>
              <h2
                style={{
                  textAlign: "center",
                  lineHeight: 1.6,
                  //marginBottom: 32,
                  fontSize: 16,
                }}
              >
                {" "}
                Whoops... No Tickets Logged with{" "}
                <span
                  style={{
                    backgroundColor: "orangered",
                    color: "#fff",
                    padding: 8,
                    textAlign: "center",
                  }}
                >
                  {searchQuery}
                </span>
              </h2>
            </div>
          }
          paragraph="No tickets created yet"
          imageUrl={NoTickets}
          imageAlt="No Tickets"
        />
      )}

      {currentItems?.length > 0 && (
        <table className="tickets-log-table">
          <thead>
            <tr>
              <th>Assigned To</th>
              <th>Title</th>
              <th>Status</th>
              <th>Ticket ID</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item: Ticket) => (
              <tr key={item.id} className="tickets-log-item">
                <td
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="tickets-center-column-span">
                    <div className="tickets-center-column-image">
                      <RandomColorComponent
                        firstName={item.handler?.first_name || ""}
                        lastName={item.handler?.last_name || ""}
                      />
                    </div>
                    <span className="tickets-center-column">
                      <p className="tickets-center-column-title">
                        {item.handler?.first_name} {""}{" "}
                        {item.handler?.last_name}
                      </p>
                      {/* <span className="tickets-center-column-title-responsive">
                        {item.title} {""}{" "}
                      </span> */}
                      <p className="tickets-center-column-p">
                        {" "}
                        {item.handler?.email}
                      </p>
                    </span>
                  </span>
                  <span className="tickets-center-column-title-responsive">
                    <p
                      className="tickets-view-tickets"
                      onClick={() => openDetailsTicketModal(item)}
                    >
                      <MdSend />{" "}
                    </p>{" "}
                  </span>
                </td>
                <td>
                  {item?.title && item?.title?.length > 20
                    ? item?.title?.substring(0, 20) + "..."
                    : item?.title}
                </td>

                <td>
                  {item?.status?.charAt(0)?.toUpperCase() +
                    item?.status?.slice(1)?.toLowerCase()}
                </td>
                <td>{item?.reference}</td>
                <td>{item?.created_at && formatDate(item?.created_at)}</td>
                <td>
                  <p
                    className="tickets-view-tickets"
                    onClick={() => openDetailsTicketModal(item)}
                  >
                    View ticket <MdSend />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredTickets?.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};
export default TicketTable;
