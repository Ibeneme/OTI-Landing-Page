import TicketComponentDashboard from "../TicketComponent";

const NotResolvedTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="Unresolved Tickets"
        unResolvedProps="resolved"
      />
    </div>
  );
};

export default NotResolvedTickets;
