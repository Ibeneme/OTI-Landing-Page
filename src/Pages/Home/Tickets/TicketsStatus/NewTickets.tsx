import TicketComponentDashboard from "../TicketComponent";


const NewTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="New Tickets"
        ticketStatusProps="open"
      />
    </div>
  );
};

export default NewTickets;
