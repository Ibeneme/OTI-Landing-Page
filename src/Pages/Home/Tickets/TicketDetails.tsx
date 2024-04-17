// import { useState } from "react";
// import { getAllTickets } from "../../../../Redux/Tickets/Tickets";
// import { useDispatch } from "react-redux";
// import { ThunkDispatch } from "@reduxjs/toolkit";
// import { RootState } from "@reduxjs/toolkit/query";

// type Props = {}

// const openCreateTicketModal = () => {
//     setIsCreateTicketModalOpen(true);
//     setCreateTicketLoading(false);
//   };
//   const openSuccessTicketModal = () => {
//     setIsTicketSuccessModalOpen(true);
//     setCreateTicketLoading(false);
//   };
//   const closeSuccessTicketModal = () => {
//     fetchTickets();
//     setIsTicketSuccessModalOpen(false);
//     setCreateTicketLoading(false);
//   };
//   const openEditSuccessTicketModal = () => {
//     setIsTicketEditSuccessModalOpen(true);
//     setCreateTicketLoading(false);
//   };
//   const closeEditSuccessTicketModal = () => {
//     fetchTickets();
//     setIsTicketEditSuccessModalOpen(false);
//     setCreateTicketLoading(false);
//   };
//   const openDetailsTicketModal = (item: Ticket) => {
//     setClickedUser(item);
//     console.log(item);
//     setIsTicketDetailsModalOpen(true);
//     setCreateTicketLoading(false);
//   };
//   const closeDetailsTicketModal = () => {
//     fetchTickets();
//     setIsTicketDetailsModalOpen(false);
//     setCreateTicketLoading(false);
//   };

//   const closeCreateTicketModal = () => {
//     setIsCreateTicketModalOpen(false);
//     setCreateTicketLoading(false);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const openSecondModal = () => {
//     setIsSecondModalOpen(true);
//   };
//   const closeSecondModal = () => {
//     setIsSecondModalOpen(false);
//   };
//   const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
//   const navigate = useNavigate();
//   const { showErrorToast, showSuccessToast } = useCustomToasts();
//   const [organizationProfile, setOrganizationProfile] = useState<any | null>(
//     null
//   );
//   useEffect(() => {
//     if (loading) {
//       dispatch(getOrganizationProfile()).then((result) => {
//         setOrganizationProfile(result.payload);
//       });
//       dispatch(getProfile()).then((result) => {
//         setUserProfile(result.payload);
//       });
//     }
//     if (createTicketLoading) {
//       dispatch(getAllTickets()).then((result) => {
//         setFilteredTickets(result.payload);
//         setAllTickets(result.payload);
//       });
//     }
//   }, [profile]);
//     //console.log("lal", allTickets);
//     const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
//     const [isModalOpenSearch, setIsModalOpenSearch] = useState(false);
//     const [isModalOpenNotifications, setIsModalOpenNotifications] =
//       useState(false);
//     const openModalSearch = () => {
//       setIsModalOpenSearch(true);
//     };
//     const closeModalSearch = () => {
//       setIsModalOpenSearch(false);
//     };
//     const openModalNotifications = () => {
//       setIsModalOpenNotifications(true);
//     };
//     const closeModalNotifications = () => {
//       setIsModalOpenNotifications(false);
//     };

// const TicketDetails = (props: Props) => {
//   return (
//     <div className="amosn5">
//       <div className="top-bar">
//         <span
//           className="close-button"
//           onClick={closeDetailsTicketModal}
//           style={{ fontSize: 24 }}
//         >
//           &times;
//         </span>

//         {userProfile?.permission_type === "manager" && (
//           <div className="action-buttons">
//             <p
//               onClick={() => openDeleteModal(clickedUser!)}
//               style={{ cursor: "pointer" }}
//             >
//               Delete
//             </p>
//             <p
//               onClick={() => openEditModal(clickedUser!)}
//               style={{ cursor: "pointer" }}
//             >
//               Edit
//             </p>
//           </div>
//         )}
//       </div>
//       <div
//         className="profile-image-container"
//         style={{ backgroundColor: profilePicStyle.backgroundColor }}
//       >
//         <img className="profile-image" src={ProfileCard} alt={"ProfileCard"} />
//       </div>
//       <div className="profile-info-container">
//         <div
//           className="initials-container"
//           style={{ backgroundColor: profilePicStyle.backgroundColor }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {<IoTicket size={24} />}
//         </div>
//         <br />
//         <div>
//           <p className="name-users-style-bold-email-ticket">
//             Ticket ID: {clickedUser?.reference}{" "}
//           </p>
//         </div>
//         <br />
//         <div>
//           <p className="name-users-style">Ticket Title</p>
//         </div>
//         <div style={{ marginTop: -7 }}>
//           <p className="name-users-style-bold">{`${clickedUser?.title}`}</p>
//         </div>
//         <br />
//         <div className="div-borderline">
//           <p className="name-users-style-tickets-head">Ticket Details</p>
//           <div className="border-line">
//             <div>
//               <p className="name-users-style-tickets">Ticket Status</p>
//               <p
//                 className="name-users-style-tickets-texts"
//                 style={{ color: "#0564FF", backgroundColor: "#0564FF10" }}
//               >
//                 {" "}
//                 {clickedUser?.status.toLowerCase() === "new"
//                   ? "Open"
//                   : clickedUser?.status.toLowerCase() === "due"
//                   ? "Due"
//                   : clickedUser?.status.toLowerCase() === "overdue"
//                   ? "Overdue"
//                   : clickedUser?.status.toLowerCase() === "resolved"
//                   ? "Resolved"
//                   : ""}
//               </p>
//             </div>
//             <div>
//               <p className="name-users-style-tickets">Ticket Priority</p>
//               <p
//                 className="name-users-style-tickets-texts"
//                 style={{ color: "#0CC74C", backgroundColor: "#0CC74C25" }}
//               >
//                 {clickedUser?.priority.toLowerCase() === "low"
//                   ? "Low"
//                   : clickedUser?.priority.toLowerCase() === "medium"
//                   ? "Medium"
//                   : clickedUser?.priority.toLowerCase() === "high"
//                   ? "High"
//                   : ""}
//               </p>
//             </div>

//             <div>
//               <p className="name-users-style-tickets">Ticket Type</p>
//               <p
//                 className="name-users-style-tickets-texts"
//                 style={{ color: "#A005FF", backgroundColor: "#A005FF10" }}
//               >
//                 {clickedUser?.type}{" "}
//               </p>
//             </div>
//             <div>
//               <p className="name-users-style-tickets">SLA Category</p>
//               <p
//                 className="name-users-style-tickets-texts"
//                 style={{ color: "#C30CC7", backgroundColor: "#C30CC710" }}
//               >
//                 {clickedUser?.sla_category.toLowerCase() === "standard"
//                   ? "Standard"
//                   : clickedUser?.sla_category.toLowerCase() === "medium"
//                   ? "Medium"
//                   : clickedUser?.sla_category.toLowerCase() === "complex"
//                   ? "Complex"
//                   : ""}
//               </p>
//             </div>
//           </div>
//         </div>
//         <br />
//         <div className="div-borderline">
//           <p className="name-users-style-tickets-head">Stakeholders Details</p>
//           <div className="border-line" style={{ flexDirection: "column" }}>
//             {clickedUser?.customer?.name ? (
//               <div>
//                 <p className="tickets-stakeholders-name">Stakeholders Name</p>
//                 <p className="tickets-stakeholders-name-texts">
//                   {clickedUser?.customer?.name}
//                 </p>
//               </div>
//             ) : null}
//             <div>
//               <p className="tickets-stakeholders-name">Stakeholders Name</p>
//               <p className="tickets-stakeholders-name-texts">
//                 {clickedUser?.customer?.email}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="div-borderline">
//           <p className="name-users-style-tickets-head">
//             Ticket Handler's Details
//           </p>

//           <div className="border-line" style={{ flexDirection: "column" }}>
//             {userProfile?.permission_type === "manager" && (
//               <p
//                 className="re-assign-ticket-texts-btn"
//                 onClick={handleReassignClick}
//               >
//                 {buttonText}
//               </p>
//             )}
//             <div>
//               <p className="tickets-stakeholders-name-texts">
//                 <RandomColorComponent
//                   firstName={first_name_color || ""}
//                   lastName={last_name_color || ""}
//                 />
//               </p>
//               <div>
//                 <p className="tickets-stakeholders-name">
//                   {" "}
//                   {clickedUser?.handler?.first_name}{" "}
//                   {clickedUser?.handler?.last_name}
//                 </p>
//                 <p className="tickets-stakeholders-name-texts">
//                   {clickedUser?.handler?.email}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         {showTicketDetails && (
//           <div
//             style={{
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//             }}
//           >
//             <p className="name-users-style-tickets-head">Re-assign Ticket to</p>
//             <div
//               className="border-line"
//               style={{
//                 flexDirection: "column",
//                 paddingBottom: 48,
//                 paddingTop: 24,
//                 gap: 6,
//               }}
//             >
//               {fetchedUsers?.map((user) => (
//                 <div
//                   key={user.id}
//                   onClick={() => handleUserClick(user.id)}
//                   style={{
//                     border:
//                       selectedUserId === user.id
//                         ? "2px solid #031849"
//                         : "2px solid transparent",
//                     cursor: "pointer",
//                     paddingTop: 6,
//                     paddingBottom: 10,
//                     backgroundColor:
//                       selectedUserId === user.id ? "#031849" : "#Fff",
//                     color: selectedUserId === user.id ? "#fff" : "",
//                   }}
//                   className="fetchedUsers-reasign-tickets"
//                 >
//                   <br />
//                   <div className="fetchedUsers-reasign-tickets">
//                     <RandomColorComponent
//                       firstName={user.first_name || ""}
//                       lastName={user.last_name || ""}
//                     />
//                     <div>
//                       <p className="users-tickets-re-assign-name">
//                         {" "}
//                         {user.first_name} {user.last_name}
//                       </p>
//                       <p
//                         style={{
//                           color: selectedUserId === user.id ? "#fff" : "",
//                         }}
//                         className="users-tickets-re-assign-email"
//                       >
//                         {" "}
//                         {user.email}
//                       </p>
//                     </div>{" "}
//                   </div>
//                 </div>
//               ))}
//               {selectedUserId ? (
//                 <button
//                   className={`${
//                     createTicketLoading ? "loading" : "save-reassign"
//                   }`}
//                   onClick={handleReAssignTicket}
//                 >
//                   {createTicketLoading ? (
//                     <div className="loader">
//                       {[...Array(5)].map((_, index) => (
//                         <div key={index}></div>
//                       ))}
//                     </div>
//                   ) : (
//                     "Confirm Re-assign"
//                   )}
//                 </button>
//               ) : null}
//             </div>
//           </div>
//         )}
//         <br />
//         <div
//           style={{
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <p className="name-users-style-tickets-head">Description</p>
//           <div className="border-line">
//             <p style={{ fontSize: 13, lineHeight: 1.6, width: "100%" }}>
//               {" "}
//               {clickedUser?.description}
//             </p>
//           </div>
//         </div>{" "}
//         <br /> <br />
//         {resolveSuccess
//           ? userProfile?.permission_type === "manager" &&
//             clickedUser?.status !== "resolved" && (
//               <div
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   gap: 6,
//                   justifyContent: "flex-end",
//                 }}
//               >
//                 <button
//                   className={`${
//                     resolveLoading ? "loading" : "reassign-ticket"
//                   }`}
//                   onClick={handleResolveTicket}
//                 >
//                   {resolveLoading ? (
//                     <div className="loader">
//                       {[...Array(5)].map((_, index) => (
//                         <div key={index}></div>
//                       ))}
//                     </div>
//                   ) : (
//                     "Resolve Ticket"
//                   )}
//                 </button>
//               </div>
//             )
//           : null}
//         <br />
//         <br />
//       </div>
//     </div>
//   )
// }

// export default TicketDetails