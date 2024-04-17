// import React, { ChangeEvent, useEffect, useState } from "react";
// import "../Dashboard/styles/cards.css";
// import "../Dashboard/Dashboard.css";
// import { ThunkDispatch } from "redux-thunk";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../../Redux/Store";
// import {
//   getAllUsers,
//   getOrganizationProfile,
//   getProfile,
// } from "../../../../Redux/Profile/Profile";
// import Modal from "../../../components/Modal/Modal";
// import "./tickets.css";
// import FormHeaders from "../../Auth/Components/FormHeaders";
// import TextInputDashboard from "../../Auth/Components/TextInouts/TextInputDashboard";
// import SelectInput from "../../Auth/Components/TextInouts/SelectInput";
// import HalfButton from "../../Auth/Components/Buttons/HalfBtn";
// import PasswordWarning from "../../../components/Error/ErrorWarning";
// import Sidebar from "../Dashboard/SideBar";
// import {
//   deleteTicket,
//   getAllTickets,
//   getSpecificTickets,
//   setHandler,
//   updateTicket,
// } from "../../../../Redux/Tickets/Tickets";
// import { GrEmergency } from "react-icons/gr";
// import { HiMiniTicket } from "react-icons/hi2";
// import { MdCancel, MdSubtitles } from "react-icons/md";
// import useCustomToasts from "../../Utils/ToastNotifications/Toastify";
// import RandomColorComponent from "../Dashboard/RandomColor";
// import ProfileCard from "../../../assets/Dashboard/ProfileCard.png";
// import "./tickets.css";
// import { IoTicket } from "react-icons/io5";
// import ShimmerLoaderPage from "../../Utils/ShimmerLoader/ShimmerLoaderPage";
// import {
//   TbBallpenFilled,
//   TbCategoryFilled,
//   TbMailFilled,
//   TbUserFilled,
// } from "react-icons/tb";
// import IconComponent from "./component/IconComponent";
// import { useLocation, useParams } from "react-router-dom";

// interface Ticket {
//   title: string;
//   reference: string;
//   created_at: string;
//   handler: {
//     first_name: string;
//     last_name: string;
//     email: string;
//   };
//   customer: {
//     first_name: string;
//     last_name: string;
//     email: string;
//     name: string;
//   };
//   image: string;
//   id: string;
//   status: string;
//   priority: string;
//   type: string;
//   sla_category: string;
//   description: string;
//   ticket_activity: TicketActivity[];
// }

// interface TicketActivity {
//   created_at: string;
//   id: string;
//   reference: string;
//   text: string;
//   type: string;
//   updated_at: string;
// }

// export interface UsersLogItem {
//   department: string | null;
//   status: string;
//   permission_type: string;
//   first_name: string;
//   title: string;
//   email: string;
//   image: string;
//   last_name: string;
//   id: string;
//   phone_number: string;
//   email_verified: string;
//   name?: string;
// }
// const TicketDetails: React.FC = () => {
//   const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
//   const { showErrorToast, showSuccessToast } = useCustomToasts();
//   const [organizationProfile, setOrganizationProfile] = useState<any | null>(
//     null
//   );
//   const { ticket_id } = useParams<{ ticket_id: string }>();

//   console.log(ticket_id, "ticket_id");
//   const [clickedUser, setClickedUser] = useState<Ticket | null>(null);
//   const [userProfile, setUserProfile] = useState<any | null>(null);
//   const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
//   const profile = useSelector((state: RootState) => state.profile.profile);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [shimmerLoader, setShimmerLoader] = useState(false);
//   const [fetchedUsers, setFetchedUsers] = useState<UsersLogItem[]>([]);

//   const [fetchedUsersManager, setFetchedUsersManager] = useState<
//     UsersLogItem[]
//   >([]);
//   const [fetchedUsersSupport, setFetchedUsersSupport] = useState<
//     UsersLogItem[]
//   >([]);
//   const [fetchedUsersExecutive, setFetchedUsersExecutive] = useState<
//     UsersLogItem[]
//   >([]);

//   const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
//   const [createTicketLoading, setCreateTicketLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState("");
//   const [allTickets, setAllTickets] = useState<any | null>(null);
//   const [filteredTickets, setFilteredTickets] = useState<Ticket[] | null>(null);
//   const [isTicketSuccessModalOpen, setIsTicketSuccessModalOpen] =
//     useState(false);
//   const [isTicketEditSuccessModalOpen, setIsTicketEditSuccessModalOpen] =
//     useState(false);
//   const [isTicketDetailsModalOpen, setIsTicketDetailsModalOpen] =
//     useState(false);
//   const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);

//   const [createTicketFormData, setCreateTicketFormData] = useState({
//     priority: "",
//     sla_category: "",
//     title: "",
//     description: "",
//     name: "",
//     handler_id: "",
//     email: "",
//     status: "",
//   });

//   const handleCreateTicketInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCreateTicketFormData((prevData) => ({ ...prevData, [name]: value }));
//     //     // setCreateTicketFormDataErrors((prevErrors) => ({
//     //     //...prevErrors,
//     //     //   [name]: "",
//     //     // }));
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 800));

//         const result = await dispatch(getAllUsers());

//         const managerUsers = result.payload.filter(
//           (user: UsersLogItem) => user.permission_type === "manager"
//         );
//         const supportUsers = result.payload.filter(
//           (user: UsersLogItem) => user.permission_type === "support"
//         );
//         const executiveUsers = result.payload.filter(
//           (user: UsersLogItem) => user.permission_type === "executive"
//         );
//         setFetchedUsers(result.payload);
//         console.log(managerUsers, "managerUsers");
//         console.log(supportUsers, "supportUsers");
//         console.log(executiveUsers, "executiveUsers");
//         setFetchedUsersManager(managerUsers);
//         setFetchedUsersSupport(supportUsers);
//         setFetchedUsersExecutive(executiveUsers);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [dispatch]);
//   const location = useLocation();
//   const ticketData: Ticket | undefined =
//     location.state && location.state.ticketData;

//   useEffect(() => {
//     if (createTicketLoading) {
//       ticketData;
//       console.log("Ticket Data:", ticketData);
//     }
//   }, [ticketData]);

//   useEffect(() => {
//     if (loading) {
//       dispatch(getOrganizationProfile()).then((result) => {
//         setOrganizationProfile(result.payload);
//       });
//       dispatch(getProfile()).then((result) => {
//         setUserProfile(result.payload);
//       });
//     }
//     dispatch(getSpecificTickets({ ticket_id })).then((result) => {
//       setClickedUser(result.payload);
//     });

//     if (createTicketLoading) {
//       dispatch(getSpecificTickets({ ticket_id })).then((result) => {
//         setClickedUser(result.payload);
//       });
//       dispatch(getAllTickets()).then((result) => {
//         setFilteredTickets(result.payload);
//         setAllTickets(result.payload);
//       });
//     }
//   }, [profile]);

//   const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
//   const [isModalOpenSearch, setIsModalOpenSearch] = useState(false);
//   const [isModalOpenNotifications, setIsModalOpenNotifications] =
//     useState(false);
//   const openModalSearch = () => {
//     setIsModalOpenSearch(true);
//   };
//   const closeModalSearch = () => {
//     setIsModalOpenSearch(false);
//   };
//   const openModalNotifications = () => {
//     setIsModalOpenNotifications(true);
//   };
//   const closeModalNotifications = () => {
//     setIsModalOpenNotifications(false);
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

//   const openSuccessTicketModal = () => {
//     setIsTicketSuccessModalOpen(true);
//     setCreateTicketLoading(false);
//   };
//   const closeSuccessTicketModal = () => {
//     setIsTicketSuccessModalOpen(false);
//     setCreateTicketLoading(false);
//   };
//   const openEditSuccessTicketModal = () => {
//     setIsTicketEditSuccessModalOpen(true);
//     setCreateTicketLoading(false);
//   };
//   const closeEditSuccessTicketModal = () => {
//     setIsTicketEditSuccessModalOpen(false);
//     setCreateTicketLoading(false);
//   };

//   const closeDetailsTicketModal = () => {
//     setIsTicketDetailsModalOpen(false);
//     setCreateTicketLoading(false);
//   };

//   const getSpecificTicketsHandler = (ticket_id: string) => {
//     return dispatch(getSpecificTickets({ ticket_id })).then((result) => {
//       return result.payload;
//     });
//   };
//   const handleEditTicket = async () => {
//     try {
//       const ticket_id = clickedUser?.id;
//       let hasErrors = false;
//       const newErrors: Record<string, string> = {};

//       if (createTicketFormData.email) {
//         if (!createTicketFormData.email?.trim()) {
//           newErrors.email = "Email is required";
//           hasErrors = true;
//           console.log("war");
//         } else {
//           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//           if (!emailRegex.test(createTicketFormData.email)) {
//             newErrors.email = "Invalid email format";
//             hasErrors = true;
//             console.log("warrior");
//           }
//         }
//       }

//       if (!hasErrors) {
//         try {
//           setCreateTicketLoading(true);

//           const action = await dispatch(
//             updateTicket({
//               updateTicket: {
//                 priority: createTicketFormData?.priority
//                   ? createTicketFormData?.priority
//                   : clickedUser?.priority,
//                 sla_category: createTicketFormData?.sla_category
//                   ? createTicketFormData?.sla_category
//                   : clickedUser?.sla_category,
//                 title: createTicketFormData?.title
//                   ? createTicketFormData?.title
//                   : clickedUser?.title,
//                 description: createTicketFormData?.description
//                   ? createTicketFormData?.description
//                   : clickedUser?.description,
//                 name: createTicketFormData?.name
//                   ? createTicketFormData?.name
//                   : clickedUser?.customer?.name,
//                 email: createTicketFormData?.email
//                   ? createTicketFormData?.email
//                   : clickedUser?.customer?.email,
//               },
//               ticket_id: ticket_id ?? "",
//             })
//           );

//           setCreateTicketLoading(false);
//           if (updateTicket.fulfilled.match(action)) {
//             switch (action.payload) {
//               case 200:
//                 getSpecificTicketsHandler()
//                 setCreateTicketLoading(false);
//                 closeEditModal();
//                 openEditSuccessTicketModal();
//                 //getSpecificTicketsHandler();
//                 break;
//               case 400:
//                 setCreateTicketLoading(false);
//                 setFormErrors(
//                   "Please fill out these forms correctly to proceed."
//                 );
//                 break;
//               default:
//                 setCreateTicketLoading(false);
//                 console.log("Unexpected response payload:", action.payload);
//                 showErrorToast("An error occurred");
//                 break;
//             }
//           } else if (updateTicket.rejected.match(action)) {
//             // Handle rejected action
//             setCreateTicketLoading(false);
//             console.error("Error dispatching updateTicket:", action.error);
//           }
//         } catch (error) {
//           setCreateTicketLoading(false);
//           console.error("Error dispatching updateTicket:", error);
//         }
//       }
//     } catch (error) {
//       setCreateTicketLoading(false);
//       console.log("Error updating ticket:", error);
//     }
//   };
//   const handleDeleteTicket = async () => {
//     try {
//       setFormErrors("");
//       setCreateTicketLoading(true);
//       const payload = clickedUser?.id;
//       console.log("Deleting ticket with ID:", payload);
//       dispatch(deleteTicket({ ticket_id: payload }))
//         .then((response) => {
//           switch (response?.payload) {
//             case 200:
//               // Wait for 1 second before fetching tickets and completing the process
//               setTimeout(() => {
//                 setCreateTicketLoading(false);
//                 //closeDeleteModal();

//                 console.log("Ticket successfully deleted:", response);
//                 //closeDeleteModal();
//               }, 1000);
//               break;
//             case 400:
//               setCreateTicketLoading(false);
//               setCreateTicketLoading(false);
//               setFormErrors("Please fill out the forms correctly to proceed.");
//               break;
//             default:
//               setCreateTicketLoading(false);
//               setCreateTicketLoading(false);
//               console.log("Unexpected response payload:", response);
//               break;
//           }
//         })
//         .catch((error) => {
//           setCreateTicketLoading(false);
//           console.error("Error deleting ticket:", error);
//         })
//         .finally(() => {
//           setCreateTicketLoading(false);
//         });
//     } catch (error) {
//       console.error("Error in handleDeleteTicket:", error);
//       setCreateTicketLoading(false);
//     }
//   };

//   const [resolveLoading, setResolveLoading] = useState(false);
//   const [resolveSuccess, setResolveSuccess] = useState(true);

//   const handleResolveTicket = async () => {
//     try {
//       setFormErrors("");
//       setResolveLoading(true);
//       setCreateTicketLoading(true);
//       const payload = clickedUser?.id;
//       console.log("Resolving ticket with ID:", payload);

//       dispatch(
//         updateTicket({
//           updateTicket: {
//             status: "resolved",
//           },
//           ticket_id: payload,
//         })
//       )
//         .then((response) => {
//           setResolveLoading(false);
//           switch (response?.payload) {
//             case 200:
//               setResolveSuccess(false);
//               setIsTicketDetailsModalOpen(false);
//               setTimeout(() => {
//                 setCreateTicketLoading(false);
//                 ///setIsTicketDetailsModalOpen(true);
//                 console.log("Ticket successfully resolved:", response);
//               }, 2000);
//               break;
//             case 400:
//               setResolveLoading(false);
//               setCreateTicketLoading(false);
//               setFormErrors("Please fill out the forms correctly to proceed.");
//               break;
//             default:
//               setResolveLoading(false);
//               setCreateTicketLoading(false);
//               console.log("Unexpected response payload:", response);
//               break;
//           }
//         })
//         .catch((error) => {
//           console.error("Error resolving ticket:", error);
//         })
//         .finally(() => {
//           setResolveLoading(false);
//           setCreateTicketLoading(false);
//         });
//     } catch (error) {
//       setResolveLoading(false);
//       console.error("Error in handleResolveTicket:", error);
//       setCreateTicketLoading(false);
//     }
//   };

//   const handleReAssignTicket = async () => {
//     try {
//       setFormErrors("");
//       setCreateTicketLoading(true);
//       const payload = clickedUser?.id;
//       console.log("Resolving ticket with ID:", payload);
//       dispatch(setHandler({ user_id: selectedUserId, ticket_id: payload }))
//         .then((response) => {
//           switch (response?.payload) {
//             case 200:
//               setTimeout(() => {
//                 setSelectedUserId("");
//                 showSuccessToast("Ticket Re-assigned successfully");
//                 setCreateTicketLoading(false);
//                 closeDetailsTicketModal();
//                 handleReassignClick();
//                 console.log("Ticket successfully resolved:", response);
//               }, 40);
//               break;
//             case 400:
//               setCreateTicketLoading(false);
//               showErrorToast("an Error Ocuurred");
//               break;
//             default:
//               setCreateTicketLoading(false);
//               showErrorToast("an Error Ocuurred");
//               break;
//           }
//         })
//         .catch((error) => {
//           console.error("Error resolving ticket:", error);
//         })
//         .finally(() => {
//           setCreateTicketLoading(false);
//         });
//     } catch (error) {
//       console.error("Error in handleResolveTicket:", error);
//       setCreateTicketLoading(false);
//     }
//   };

//   const openDeleteModal = (item: Ticket) => {
//     console.log("Open Delete Modal for item:", item);
//     setClickedUser(item);
//     setDeleteModalOpen(true);
//     setIsTicketDetailsModalOpen(false);
//   };

//   const closeDeleteModal = () => {
//     setDeleteModalOpen(false);
//   };
//   const openEditModal = (item: Ticket) => {
//     console.log("Open Edit Modal for item:", item);
//     setClickedUser(item);
//     setEditModalOpen(true);
//     setIsTicketDetailsModalOpen(false);
//   };

//   const closeEditModal = () => {
//     setEditModalOpen(false);
//     //resetForms();
//   };

//   const profilePicStyle: React.CSSProperties = {
//     backgroundColor: (() => {
//       switch (clickedUser?.status) {
//         case "new":
//           return "#0564FF";
//         case "due":
//           return "#FDBA10";
//         case "overdue":
//           return "red";
//         case "resolved":
//           return "#0FC136";
//         case "open":
//           return "#ff6b00";
//         default:
//           return "#ff6b00";
//       }
//     })(),
//   };

//   const confirmDeleteModal = (
//     <div className="form_content_display-dashboard">
//       <br />
//       <h3 className="clickedUser-h3">
//         Confirm you want to Delete Ticket with id{" "}
//         <span style={{ color: "orangered" }}>
//           {/* {clickedUser?.first_name} {""}
//          {clickedUser?.last_name} */}
//           <p className="name-users-style-bold-email">
//             Ticket ID: {clickedUser?.id}{" "}
//           </p>
//         </span>
//       </h3>
//       {/* <p className="clickedUser-p">This action cannot be undone</p> */}
//       <div className="clickedUser-p-div">
//         <div style={{ width: "100%" }}>
//           <button
//             style={{ width: "100%" }}
//             onClick={closeDeleteModal}
//             className={`custom-containers`}
//           >
//             Go Back
//           </button>
//         </div>
//         <button
//           className={`${loading ? "loading" : "custom-container"}`}
//           onClick={handleDeleteTicket}
//         >
//           {createTicketLoading ? (
//             <div className="loader">
//               {[...Array(5)].map((_, index) => (
//                 <div key={index}></div>
//               ))}
//             </div>
//           ) : (
//             "Delete Ticket"
//           )}
//         </button>
//       </div>
//     </div>
//   );

//   const first_name_color = clickedUser?.handler.first_name;
//   const last_name_color = clickedUser?.handler.last_name;
//   const [showTicketDetails, setShowTicketDetails] = useState(false);
//   const [buttonText, setButtonText] = useState("Re-assign Ticket");
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Track selected user ID

//   const handleReassignClick = () => {
//     setShowTicketDetails(!showTicketDetails);
//     setButtonText(showTicketDetails ? "Re-assign Ticket" : "Cancel");
//   };

//   const handleUserClick = (userId: string) => {
//     setSelectedUserId(userId); // Set the selected user ID
//     console.log(userId); // Log the selected user's ID
//   };

//   const openDetailsTicketModal = (item: Ticket) => {
//     setClickedUser(item);
//     console.log(item);
//     setIsTicketDetailsModalOpen(true);
//     setCreateTicketLoading(false);
//   };

//   const openEditicketModalContent = (
//     <div className="form_content_display-dashboard">
//       <br />
//       <MdCancel
//         onClick={closeEditModal}
//         size={24}
//         color={"#FF7342"}
//         style={{ cursor: "pointer" }}
//       />
//       <FormHeaders
//         step=""
//         activeStepNumber={1}
//         totalStepNumbers={2}
//         colored="gray"
//         title="Edit a Ticket"
//         accountText={"Complete these to edit Ticket"}
//       />
//       <PasswordWarning formErrors={formErrors} />
//       <br />
//       <br />
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           gap: 12,
//           alignItems: "center",
//         }}
//       >
//         <IconComponent icon={<TbMailFilled color="#fff" size="24" />} />
//         <TextInputDashboard
//           placeholderVisible
//           label="Stakeholders Email"
//           value={createTicketFormData.email}
//           onChange={handleCreateTicketInputChange}
//           type="email"
//           id="email"
//           name="email"
//           placeholder={`${clickedUser?.customer?.email}`}
//         />
//       </div>

//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           gap: 12,
//           alignItems: "center",
//         }}
//       >
//         <IconComponent icon={<TbUserFilled color="#fff" size="24" />} />

//         <TextInputDashboard
//           placeholderVisible
//           label="Stakeholders Name"
//           value={createTicketFormData.name}
//           onChange={handleCreateTicketInputChange}
//           type="text"
//           id="name"
//           name="name"
//           placeholder="Stakeholders Name"
//         />
//       </div>
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           gap: 12,
//           alignItems: "center",
//         }}
//       >
//         <IconComponent icon={<MdSubtitles color="#fff" size="24" />} />

//         <TextInputDashboard
//           placeholderVisible
//           label="Ticket Title"
//           value={createTicketFormData.title}
//           onChange={handleCreateTicketInputChange}
//           type="text"
//           id="title"
//           name="title"
//           placeholder={`${clickedUser?.title}`}
//           required
//         />
//       </div>
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           gap: 12,
//           alignItems: "center",
//         }}
//       >
//         <IconComponent icon={<GrEmergency color="#fff" size="24" />} />

//         <SelectInput
//           placeholder={`${clickedUser?.priority}`}
//           label="Select Ticket Priority"
//           value={createTicketFormData.priority}
//           onChange={(e) =>
//             setCreateTicketFormData((prevData) => ({
//               ...prevData,
//               priority: e.target.value,
//             }))
//           }
//           id="selectPriority"
//           name="selectPriority"
//           options={["low", "medium", "high"]}
//           required
//         />
//       </div>
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           gap: 12,
//           alignItems: "center",
//         }}
//       >
//         <IconComponent icon={<TbCategoryFilled color="#fff" size="24" />} />

//         <SelectInput
//           placeholder={`${clickedUser?.sla_category}`}
//           label="SLA Category"
//           value={createTicketFormData.sla_category}
//           onChange={(e) =>
//             setCreateTicketFormData((prevData) => ({
//               ...prevData,
//               sla_category: e.target.value,
//             }))
//           }
//           id="selectPriority"
//           name="selectPriority"
//           options={["standard", "medium", "complex"]}
//           required
//         />
//       </div>

//       <br />

//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           gap: 12,
//           alignItems: "center",
//         }}
//       >
//         <IconComponent icon={<TbBallpenFilled color="#fff" size="24" />} />

//         <TextInputDashboard
//           placeholderVisible
//           label="Description"
//           value={createTicketFormData.description}
//           onChange={(e) =>
//             setCreateTicketFormData((prevData) => ({
//               ...prevData,
//               description: e.target.value,
//             }))
//           }
//           type="text"
//           id="description"
//           name="description"
//           placeholder={`${clickedUser?.description}`}
//           height
//         />
//       </div>
//       <PasswordWarning formErrors={formErrors} />
//       <br />
//       <HalfButton
//         onClick={handleEditTicket}
//         text="Edit Ticket"
//         loading={createTicketLoading}
//         disabled={createTicketLoading}
//       />
//     </div>
//   );

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="main-content-container">
//         <div className="dashboard-cards-container">
//           <div className="dashboard-content">
//             <div className="main-content-container">
//               <div className="main-content-dashboard-div">
//                 <div style={{ width: "100%" }}>
//                   <div>
//                     <h2 className="main-content-dashboard-h2">Tickets</h2>
//                     <p className="main-content-dashboard-p">
//                       Create and view all your tickets here
//                     </p>
//                   </div>{" "}
//                 </div>

//                 <div className="dashboard-bell-search-icons">
//                   {/* <TbSearch className="hide" onClick={openModalSearch} />
//                    */}{" "}
//                 </div>
//               </div>

//               {shimmerLoader ? (
//                 <div
//                   style={{
//                     marginTop: 44,
//                     backgroundColor: "#fff",
//                     borderRadius: 24,
//                   }}
//                 >
//                   <ShimmerLoaderPage />
//                 </div>
//               ) : (
//                 <div className="ticketdescription">
//                   <div
//                     style={{
//                       backgroundColor: "white",
//                       width: "100%",
//                       height: "100%",
//                       padding: 16,
//                       borderRadius: 24,
//                       marginTop: 24,
//                     }}
//                   >
//                     <div className="amosn5">
//                       <div className="top-bar">
//                         <span
//                           className="close-button"
//                           onClick={closeDetailsTicketModal}
//                           style={{ fontSize: 24, opacity: 0 }}
//                         >
//                           &times;
//                         </span>

//                         {/*

//                          {userProfile?.permission_type !== "support" && (
//                           <div
//                             className="action-buttons"
//                             style={{ width: "100%" }}
//                           >
//                             <p
//                               onClick={() => openDeleteModal(clickedUser!)}
//                               style={{ cursor: "pointer" }}
//                             >
//                               Delete
//                             </p>
//                             <p
//                               onClick={() => openEditModal(clickedUser!)}
//                               style={{ cursor: "pointer" }}
//                             >
//                               Edit
//                             </p>
//                           </div>
//                         )}

//                         */}
//                       </div>

//                       <div
//                         className="profile-image-container"
//                         style={{
//                           backgroundColor: profilePicStyle.backgroundColor,
//                           height: 250,
//                           marginTop: -32,
//                         }}
//                       >
//                         <img
//                           className="profile-image"
//                           src={ProfileCard}
//                           alt={"ProfileCard"}
//                         />
//                       </div>

//                       <div className="profile-info-container">
//                         <div
//                           className="initials-container"
//                           style={{
//                             backgroundColor: profilePicStyle.backgroundColor,
//                           }}
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           {<IoTicket size={24} />}
//                         </div>
//                         <br />
//                         <div>
//                           <p className="name-users-style-bold-email-ticket">
//                             Ticket ID: {clickedUser?.reference}{" "}
//                           </p>
//                         </div>
//                         <br />
//                         <div>
//                           <p className="name-users-style">Ticket Title</p>
//                         </div>
//                         <div style={{ marginTop: -7 }}>
//                           <p className="name-users-style-bold">{`${clickedUser?.title}`}</p>
//                         </div>
//                         <br />
//                         <div className="div-borderline">
//                           <p className="name-users-style-tickets-head">
//                             Ticket Details
//                           </p>
//                           <div className="border-line">
//                             <div>
//                               <p className="name-users-style-tickets">
//                                 Ticket Status
//                               </p>
//                               <p
//                                 className="name-users-style-tickets-texts"
//                                 style={{
//                                   color: "#0564FF",
//                                   backgroundColor: "#0564FF10",
//                                 }}
//                               >
//                                 {" "}
//                                 {clickedUser?.status.toLowerCase() === "open"
//                                   ? "Open"
//                                   : clickedUser?.status.toLowerCase() === "due"
//                                   ? "Due"
//                                   : clickedUser?.status.toLowerCase() ===
//                                     "overdue"
//                                   ? "Overdue"
//                                   : clickedUser?.status.toLowerCase() ===
//                                     "resolved"
//                                   ? "Resolved"
//                                   : ""}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="name-users-style-tickets">
//                                 Ticket Priority
//                               </p>
//                               <p
//                                 className="name-users-style-tickets-texts"
//                                 style={{
//                                   color: "#0CC74C",
//                                   backgroundColor: "#0CC74C25",
//                                 }}
//                               >
//                                 {clickedUser?.priority.toLowerCase() === "low"
//                                   ? "Low"
//                                   : clickedUser?.priority.toLowerCase() ===
//                                     "medium"
//                                   ? "Medium"
//                                   : clickedUser?.priority.toLowerCase() ===
//                                     "high"
//                                   ? "High"
//                                   : ""}
//                               </p>
//                             </div>

//                             <div>
//                               <p className="name-users-style-tickets">
//                                 SLA Category
//                               </p>
//                               <p
//                                 className="name-users-style-tickets-texts"
//                                 style={{
//                                   color: "#C30CC7",
//                                   backgroundColor: "#C30CC710",
//                                 }}
//                               >
//                                 {clickedUser?.sla_category.toLowerCase() ===
//                                 "standard"
//                                   ? "Standard"
//                                   : clickedUser?.sla_category.toLowerCase() ===
//                                     "medium"
//                                   ? "Medium"
//                                   : clickedUser?.sla_category.toLowerCase() ===
//                                     "complex"
//                                   ? "Complex"
//                                   : ""}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <br />
//                         <div className="div-borderline">
//                           <p className="name-users-style-tickets-head">
//                             Stakeholders Details
//                           </p>
//                           <div
//                             className="border-line"
//                             style={{ flexDirection: "column" }}
//                           >
//                             {clickedUser?.customer?.name ? (
//                               <div>
//                                 <p className="tickets-stakeholders-name">
//                                   Stakeholders Name
//                                 </p>
//                                 <p className="tickets-stakeholders-name-texts">
//                                   {clickedUser?.customer?.name}
//                                 </p>
//                               </div>
//                             ) : null}
//                             <div>
//                               <p className="tickets-stakeholders-name">
//                                 Stakeholders Email
//                               </p>
//                               <p className="tickets-stakeholders-name-texts">
//                                 {clickedUser?.customer?.email}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="div-borderline">
//                           <p className="name-users-style-tickets-head">
//                             Ticket Handler's Details
//                           </p>

//                           <div
//                             className="border-line"
//                             style={{ flexDirection: "column" }}
//                           >
//                             {clickedUser?.status !== "resolved" &&
//                               userProfile?.permission_type !== "support" && (
//                                 <p
//                                   className="re-assign-ticket-texts-btn"
//                                   onClick={handleReassignClick}
//                                 >
//                                   {buttonText}
//                                 </p>
//                               )}

//                             <div>
//                               <p className="tickets-stakeholders-name-texts">
//                                 <RandomColorComponent
//                                   firstName={first_name_color || ""}
//                                   lastName={last_name_color || ""}
//                                 />
//                               </p>
//                               <div>
//                                 <p className="tickets-stakeholders-name">
//                                   {" "}
//                                   {clickedUser?.handler?.first_name}{" "}
//                                   {clickedUser?.handler?.last_name}
//                                 </p>
//                                 <p className="tickets-stakeholders-name-texts">
//                                   {clickedUser?.handler?.email}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         {showTicketDetails && (
//                           <div
//                             style={{
//                               justifyContent: "space-between",
//                               alignItems: "center",
//                               width: "100%",
//                             }}
//                           >
//                             <p className="name-users-style-tickets-head">
//                               Re-assign Ticket to
//                             </p>
//                             <div
//                               className="border-line"
//                               style={{
//                                 flexDirection: "column",
//                                 paddingBottom: 48,
//                                 paddingTop: 24,
//                                 gap: 6,
//                               }}
//                             >
//                               {fetchedUsers?.map((user) => (
//                                 <div
//                                   key={user.id}
//                                   onClick={() => handleUserClick(user.id)}
//                                   style={{
//                                     border:
//                                       selectedUserId === user.id
//                                         ? "2px solid #031849"
//                                         : "2px solid transparent",
//                                     cursor: "pointer",
//                                     paddingTop: 6,
//                                     paddingBottom: 10,
//                                     backgroundColor:
//                                       selectedUserId === user.id
//                                         ? "#031849"
//                                         : "#Fff",
//                                     color:
//                                       selectedUserId === user.id ? "#fff" : "",
//                                   }}
//                                   className="fetchedUsers-reasign-tickets"
//                                 >
//                                   <br />
//                                   <div className="fetchedUsers-reasign-tickets">
//                                     <RandomColorComponent
//                                       firstName={user.first_name || ""}
//                                       lastName={user.last_name || ""}
//                                     />
//                                     <div>
//                                       <p className="users-tickets-re-assign-name">
//                                         {" "}
//                                         {user.first_name} {user.last_name}
//                                       </p>
//                                       <p
//                                         style={{
//                                           color:
//                                             selectedUserId === user.id
//                                               ? "#fff"
//                                               : "",
//                                         }}
//                                         className="users-tickets-re-assign-email"
//                                       >
//                                         {" "}
//                                         {user.email}
//                                       </p>
//                                     </div>{" "}
//                                   </div>
//                                 </div>
//                               ))}
//                               {selectedUserId ? (
//                                 <button
//                                   className={`${
//                                     createTicketLoading
//                                       ? "loading"
//                                       : "save-reassign"
//                                   }`}
//                                   onClick={handleReAssignTicket}
//                                 >
//                                   {createTicketLoading ? (
//                                     <div className="loader">
//                                       {[...Array(5)].map((_, index) => (
//                                         <div key={index}></div>
//                                       ))}
//                                     </div>
//                                   ) : (
//                                     "Confirm Re-assign"
//                                   )}
//                                 </button>
//                               ) : null}
//                             </div>
//                           </div>
//                         )}
//                         <br />
//                         <div
//                           style={{
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             width: "100%",
//                           }}
//                         >
//                           <p className="name-users-style-tickets-head">
//                             Description
//                           </p>
//                           <div className="border-line">
//                             <p
//                               style={{
//                                 fontSize: 13,
//                                 lineHeight: 1.6,
//                                 width: "100%",
//                               }}
//                             >
//                               {" "}
//                               {clickedUser?.description}
//                             </p>
//                           </div>
//                         </div>{" "}
//                         <br /> <br />
//                         <div style={{ display: "flex", width: "100%" }}>
//                           {userProfile?.permission_type !== "support" && (
//                             <div
//                               className="action-buttons"
//                               style={{ width: "100%" }}
//                             >
//                               <p
//                                 onClick={() => openDeleteModal(clickedUser!)}
//                                 style={{ cursor: "pointer" }}
//                               >
//                                 Delete
//                               </p>
//                               <p
//                                 onClick={() => openEditModal(clickedUser!)}
//                                 style={{ cursor: "pointer" }}
//                               >
//                                 Edit
//                               </p>
//                             </div>
//                           )}
//                           {resolveSuccess
//                             ? userProfile?.permission_type !== "support" &&
//                               clickedUser?.status !== "resolved" && (
//                                 <div
//                                   style={{
//                                     width: "100%",
//                                     display: "flex",
//                                     gap: 6,
//                                     justifyContent: "flex-end",
//                                   }}
//                                 >
//                                   <button
//                                     className={`${
//                                       resolveLoading
//                                         ? "loading"
//                                         : "reassign-ticket"
//                                     }`}
//                                     onClick={handleResolveTicket}
//                                   >
//                                     {resolveLoading ? (
//                                       <div className="loader">
//                                         {[...Array(5)].map((_, index) => (
//                                           <div key={index}></div>
//                                         ))}
//                                       </div>
//                                     ) : (
//                                       "Resolve Ticket"
//                                     )}
//                                   </button>
//                                 </div>
//                               )
//                             : null}
//                         </div>
//                         <br />
//                         <br />
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       backgroundColor: "white",
//                       width: "100%",
//                       height: "100%",
//                       padding: 16,
//                       borderRadius: 24,
//                       marginTop: 24,
//                       overflowY: "scroll",
//                       minHeight: "100vh",
//                       alignItems: "flex-start",
//                     }}
//                   >
//                     <p className="name-users-style-tickets-head">
//                       Ticket History
//                     </p>
//                     <div className="amosn5">
//                       <div
//                         className="border-line"
//                         style={{
//                           marginTop: 6,
//                           display: "flex",
//                           flexDirection: "column",
//                         }}
//                       >
//                         {clickedUser?.ticket_activity?.map(
//                           (activity, index) => (
//                             <div key={index} style={{ marginTop: 12 }}>
//                               <strong
//                                 style={{
//                                   fontSize: 14,
//                                   backgroundColor: "#ff734212",
//                                   color: "#ff7342",
//                                   padding: 12,
//                                   borderRadius: 24,
//                                 }}
//                               >
//                                 Ticket{" "}
//                                 {activity?.type?.charAt(0)?.toUpperCase() +
//                                   activity?.type?.slice(1)}
//                               </strong>
//                               <p
//                                 style={{
//                                   fontSize: 13,
//                                   lineHeight: 1.6,
//                                   width: "100%",
//                                   color: "#808080",
//                                 }}
//                               >
//                                 Ticket with reference {activity?.reference}{" "}
//                                 {activity?.type} by{" "}
//                                 {activity?.text?.split("by ")[1]} at{" "}
//                                 {activity?.created_at}.
//                               </p>
//                             </div>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal
//         isOpen={isDeleteModalOpen}
//         onOpen={openDetailsTicketModal}
//         onClose={closeDeleteModal}
//         formContent={confirmDeleteModal}
//       />
//       <Modal
//         isOpen={isEditModalOpen}
//         onOpen={openDetailsTicketModal}
//         onClose={closeEditModal}
//         formContent={openEditicketModalContent}
//       />
//     </div>
//   );
// };

// export default TicketDetails;
//import React from 'react'

//type Props = {}

const ViewTicketDetails = () => {
  return <div>ViewTicketDetails</div>;
};

export default ViewTicketDetails;
