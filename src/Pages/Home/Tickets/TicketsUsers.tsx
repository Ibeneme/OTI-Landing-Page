import React, { ChangeEvent, useEffect, useState } from "react";
import "../Dashboard/styles/cards.css";
import "../Dashboard/Dashboard.css";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import {
  getAllUsers,
  getDepartmentUsers,
  getDepartments,
  getOrganizationProfile,
  getProfile,
} from "../../../../Redux/Profile/Profile";
import Modal from "../../../components/Modal/Modal";
import FormHeaders from "../../Auth/Components/FormHeaders";
import TextInputDashboard from "../../Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../Auth/Components/TextInouts/SelectInput";
import HalfButton from "../../Auth/Components/Buttons/HalfBtn";
import PasswordWarning from "../../../components/Error/ErrorWarning";
import Sidebar from "../Dashboard/SideBar";
import {
  createTicket,
  deleteTicket,
  //getAllTickets,
  getUsersTickets,
  setHandler,
  updateTicket,
} from "../../../../Redux/Tickets/Tickets";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAssignmentAdd, MdCancel, MdSubtitles } from "react-icons/md";
import useCustomToasts from "../../Utils/ToastNotifications/Toastify";
import RandomColorComponent from "../Dashboard/RandomColor";
import ProfileCard from "../../../assets/Dashboard/ProfileCard.png";
import SuccessModalPop from "./component/SuccessModal";
import "./tickets.css";
import { IoTicket } from "react-icons/io5";
import NoTickets from "../../../assets/Dashboard/NoTickets.png";
import NoTicketsMessage from "../Dashboard/Components/NoTickets";
import ShimmerLoaderPage from "../../Utils/ShimmerLoader/ShimmerLoaderPage";
import TicketTable from "./NewTicketTable";
import { Ticket, UsersLogItem } from "./Tickets";
import { FaCircleCheck } from "react-icons/fa6";
import IconComponent from "./component/IconComponent";
import {
  TbBallpenFilled,
  TbCategoryFilled,
  TbMailFilled,
  TbUserFilled,
} from "react-icons/tb";
import { GrEmergency } from "react-icons/gr";

const GetUsersTicketsDashboard: React.FC = () => {
  const location = useLocation();
  const user_id_passed_as_params: string =
    (location.state as any)?.user_id_passed_as_params || "";

  const first_name_passed_as_params: string =
    (location.state as any)?.first_name_passed_as_params || "";

  const last_name_passed_as_params: string =
    (location.state as any)?.last_name_passed_as_params || "";
  console.log(user_id_passed_as_params, "user_id_passed_as_params");

  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useCustomToasts();
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [fetchedUsersManager, setFetchedUsersManager] = useState<
    UsersLogItem[]
  >([]);
  const [fetchedUsersSupport, setFetchedUsersSupport] = useState<
    UsersLogItem[]
  >([]);
  const [fetchedUsersExecutive, setFetchedUsersExecutive] = useState<
    UsersLogItem[]
  >([]);
  const [selectedUserIds, setSelectedUserIds] = useState("");
  const [selectedUserIdsUser, setSelectedUserIdsUser] = useState("");
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [loading, setLoading] = useState(false);
  const [shimmerLoader, setShimmerLoader] = useState(false);
  const [fetchedUsers, setFetchedUsers] = useState<UsersLogItem[]>([]);
  const [createTicketLoading, setCreateTicketLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [allTickets, setAllTickets] = useState<any | null>(null);
  const [isTicketSuccessModalOpen, setIsTicketSuccessModalOpen] =
    useState(false);
  const [isTicketEditSuccessModalOpen, setIsTicketEditSuccessModalOpen] =
    useState(false);
  const [isTicketDetailsModalOpen, setIsTicketDetailsModalOpen] =
    useState(false);
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [createTicketFormData, setCreateTicketFormData] = useState({
    priority: "",
    sla_category: "",
    type: "",
    title: "",
    description: "",
    name: "",
    handler_id: "",
    email: "",
    status: "",
  });
  const resetFormData = () => {
    setCreateTicketFormData({
      priority: "",
      sla_category: "",
      type: "",
      title: "",
      description: "",
      name: "",
      handler_id: "",
      email: "",
      status: "",
    });
  };

  const [createTicketFormDataErrors, setCreateTicketFormDataErrors] = useState({
    priority: "",
    sla_category: "",
    type: "",
    title: "",
    description: "",
    name: "",
    handler_id: "",
    email: "",
  });
  const handleCreateTicketInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateTicketFormData((prevData) => ({ ...prevData, [name]: value }));
    setCreateTicketFormDataErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const result = await dispatch(getAllUsers());
        setFetchedUsers(result.payload);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrganizationProfile()).then(() => {});
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        setShimmerLoader(true);
        const result = await dispatch(
          getUsersTickets({ user_id: user_id_passed_as_params })
        );
        setAllTickets(result.payload);
      } catch (error) {
        setShimmerLoader(false);
      } finally {
        setShimmerLoader(false);
      }
    };
    fetchAllTickets();
  }, [dispatch]);

  const renderOptions = () => {
    if (fetchedUsers?.length > 0) {
      return fetchedUsers?.map((users) => (
        <option key={users.id} value={users.id}>
          {users.first_name} {users.last_name}
        </option>
      ));
    } else {
      return (
        <option value={userProfile?.id} disabled>
          {userProfile?.first_name} {userProfile?.last_name}
        </option>
      );
    }
  };

  useEffect(() => {
    if (loading) {
      dispatch(getOrganizationProfile()).then(() => {
        // setOrganizationProfile(result.payload);
      });
      dispatch(getProfile()).then((result) => {
        setUserProfile(result.payload);
      });
    }
    if (createTicketLoading) {
      dispatch(getUsersTickets({ user_id: user_id_passed_as_params })).then(
        (result) => {
          // setFilteredTickets(result.payload);
          setAllTickets(result.payload);
        }
      );
    }
  }, [profile]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const result = await dispatch(getAllUsers());

        const managerUsers = result.payload.filter(
          (user: UsersLogItem) => user.permission_type === "manager"
        );
        const supportUsers = result.payload.filter(
          (user: UsersLogItem) => user.permission_type === "support"
        );
        const executiveUsers = result.payload.filter(
          (user: UsersLogItem) => user.permission_type === "executive"
        );
        setFetchedUsers(result.payload);
        // console.log(managerUsers, "managerUsers");
        // console.log(supportUsers, "supportUsers");
        // console.log(executiveUsers, "executiveUsers");
        setFetchedUsersManager(managerUsers);
        setFetchedUsersSupport(supportUsers);
        setFetchedUsersExecutive(executiveUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
    dispatch(getDepartments()).then((result) => {
      //.log(result.payload, "deptsSupport", deptsSupport);
      getDeptSupport(result.payload);
      // const departmentNamesAndIds = result.payload.map(department => ({
      //   id: department.id,
      //   name: department.name
      // }));
      console.log(result.payload, "departmentNamesAndIds");
    });
  }, [dispatch]);

  const [isSEManagerSelected, setIsSEManagerSelected] = useState(false);
  const [isSEExecutiveSelected, setIsSEExecutiveSelected] = useState(false);
  const [isSupportSelected, setIsSupportSelected] = useState(false);
  // const [isSupportSelectedDepts, setIsSupportSelectedDepts] = useState(false);
  const [deptsSupport, getDeptSupport] = useState<UsersLogItem[]>([]);
  //const [deptsFlag, setDeptFlag] = useState(false);
  const [deptsFlags, setDeptFlags] = useState(false);
  const [deptsSupportDatauSERS, getDeptSupportDatauSERS] = useState<
    UsersLogItem[]
  >([]);

  const fetchDepartsID = (department_id: string) => {
    const id = department_id;
    console.log(id, "department_iddepartment_id");
    dispatch(getDepartmentUsers(department_id))
      .then((result) => {
        getDeptSupportDatauSERS(result.payload);
        setDeptFlags(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleOptionSelect = (option: any, values?: string) => {
    setSelectedValue(option);
    console.log(fetchedUsersSupport, values, "handleOptionSelect");
    setIsSEManagerSelected(option === "manager");
    setIsSEExecutiveSelected(option === "executive");
    setIsSupportSelected(option === "support");
    //setIsSupportSelectedDepts(option === "supportDepts");

    // console.log(values, "getDeptSupportData(values);", option);
    // if (option === "support") {
    //   setDeptFlag(true);
    // } else {
    //   setDeptFlag(false);
    // }
  };

  const renderOptionsManager = () => {
    const placeholderOption = (
      <option value="" disabled selected>
        Choose a SE Manager
      </option>
    );

    const placeholderOptions = (
      <option value="" disabled selected>
        You have no SE Manager user
      </option>
    );
    if (fetchedUsersManager?.length > 0) {
      return [
        placeholderOption,
        ...fetchedUsersManager?.map((user: UsersLogItem) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </option>
        )),
      ];
    } else if (fetchedUsersManager?.length === 0) {
      return [placeholderOptions];
    } else return null;
  };

  const renderOptionsExecutive = () => {
    const placeholderOption = (
      <option value="" disabled selected>
        Choose a SE Executive
      </option>
    );
    const placeholderOptions = (
      <option value="" disabled selected>
        You have no SE Executive user
      </option>
    );
    if (fetchedUsersExecutive?.length > 0) {
      return [
        placeholderOption,
        ...fetchedUsersExecutive?.map((user: UsersLogItem) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </option>
        )),
      ];
    } else if (fetchedUsersExecutive?.length === 0) {
      return [placeholderOptions];
    } else return null;
  };

  useEffect(() => {
    if (loading) {
      dispatch(getProfile()).then((result) => {
        setUserProfile(result.payload);
      });
    }
    if (createTicketLoading) {
      // dispatch(getAllTickets()).then((result) => {
      //   setFilteredTickets(result.payload);
      //   setAllTickets(result.payload);
      // });
    }
  }, [profile]);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [selectedValue, setSelectedValue] = useState<string>("");

  const openCreateTicketModal = () => {
    setIsCreateTicketModalOpen(true);
    setCreateTicketLoading(false);
  };
  const openSuccessTicketModal = () => {
    setIsTicketSuccessModalOpen(true);
    setCreateTicketLoading(false);
  };
  const closeSuccessTicketModal = () => {
    //fetchTickets();
    setIsTicketSuccessModalOpen(false);
    setCreateTicketLoading(false);
  };
  const openEditSuccessTicketModal = () => {
    setIsTicketEditSuccessModalOpen(true);
    setCreateTicketLoading(false);
  };
  const closeEditSuccessTicketModal = () => {
    //fetchTickets();
    setIsTicketEditSuccessModalOpen(false);
    setCreateTicketLoading(false);
  };
  const openDetailsTicketModal = (item: Ticket) => {
    setClickedUser(item);
    console.log(item);
    setIsTicketDetailsModalOpen(true);
    setCreateTicketLoading(false);
  };
  const closeDetailsTicketModal = () => {
    //fetchTickets();
    setIsTicketDetailsModalOpen(false);
    setCreateTicketLoading(false);
  };

  const closeCreateTicketModal = () => {
    setIsCreateTicketModalOpen(false);
    setCreateTicketLoading(false);
  };

  const handleCreateTicket = () => {
    let hasErrors = false;
    const newErrors = { ...createTicketFormDataErrors };
    if (!createTicketFormData.name.trim()) {
      newErrors.name = "Stakholders Name is required";
      hasErrors = true;
    }
    if (!createTicketFormData.email.trim()) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(createTicketFormData.email)) {
        newErrors.email = "Invalid email format";
        hasErrors = true;
      }
    }
    if (!createTicketFormData.priority.trim()) {
      newErrors.priority = "Ticket Priority is required";
      hasErrors = true;
    }
    if (!createTicketFormData.sla_category.trim()) {
      newErrors.sla_category = "SLA Category is required";
      hasErrors = true;
    }
    if (!createTicketFormData.handler_id.trim()) {
      newErrors.handler_id = "Ticket Handler is required";
      hasErrors = true;
    }
    if (!createTicketFormData.description.trim()) {
      newErrors.description = "Description is required";
      hasErrors = true;
    }
    if (createTicketFormData?.email) {
      console.log("jj");
      if (!createTicketFormData.email.trim()) {
        newErrors.email = "Email is required";
        hasErrors = true;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(createTicketFormData.email)) {
          newErrors.email = "Invalid email format";
          hasErrors = true;
        }
      }
    }
    if (hasErrors) {
      setFormErrors("Please fill forms correctly");
      setCreateTicketFormDataErrors(newErrors);
      return;
    }
    setFormErrors("");
    setCreateTicketLoading(true);
    setCreateLoading(true);
    dispatch(createTicket(createTicketFormData))
      .then((response) => {
        setLoading(false);
        setCreateTicketLoading(false);
        setCreateLoading(false);
        switch (response?.payload) {
          case 201:
            // useFetchAllTickets();
            setLoading(false);
            setCreateTicketLoading(false);
            resetFormData();
            closeCreateTicketModal();
            openSuccessTicketModal();
            setIsSupportSelected(false);
            setIsSEManagerSelected(false);
            setIsSEExecutiveSelected(false);
            break;
          case 400:
            setCreateTicketLoading(false);
            setCreateTicketLoading(false);
            setFormErrors("Please Fill these forms correctly to Proceed.");
            break;
          default:
            setLoading(false);
            setCreateTicketLoading(false);
            setCreateTicketLoading(false);
            console.log("Unexpected response payload:", response);
            showErrorToast("An Error Occurred");
            break;
        }
      })

      .catch((error) => {
        setCreateLoading(false);
        setLoading(false);
        setCreateTicketLoading(false);
        console.error("Error creating ticket:", error);
      });
    setCreateTicketLoading(false);
  };
  const handleEditTicket = async () => {
    try {
      const ticket_id = clickedUser?.id;
      let hasErrors = false;
      const newErrors: Record<string, string> = {};

      if (createTicketFormData.email) {
        if (!createTicketFormData.email?.trim()) {
          newErrors.email = "Email is required";
          hasErrors = true;
          console.log("war");
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(createTicketFormData.email)) {
            newErrors.email = "Invalid email format";
            hasErrors = true;
            console.log("warrior");
          }
        }
      }

      if (!hasErrors) {
        try {
          setCreateTicketLoading(true);

          const action = await dispatch(
            updateTicket({
              updateTicket: {
                priority: createTicketFormData?.priority
                  ? createTicketFormData?.priority
                  : clickedUser?.priority,
                sla_category: createTicketFormData?.sla_category
                  ? createTicketFormData?.sla_category
                  : clickedUser?.sla_category,
                title: createTicketFormData?.title
                  ? createTicketFormData?.title
                  : clickedUser?.title,
                description: createTicketFormData?.description
                  ? createTicketFormData?.description
                  : clickedUser?.description,
                name: createTicketFormData?.name
                  ? createTicketFormData?.name
                  : clickedUser?.customer?.name,
                email: createTicketFormData?.email
                  ? createTicketFormData?.email
                  : clickedUser?.customer?.email,
              },
              ticket_id: ticket_id ?? "",
            })
          );

          setCreateTicketLoading(false);
          if (updateTicket.fulfilled.match(action)) {
            switch (action.payload) {
              case 200:
                setCreateTicketLoading(false);
                closeEditModal();
                openEditSuccessTicketModal();
                // fetchTickets();
                break;
              case 400:
                setCreateTicketLoading(false);
                setFormErrors(
                  "Please fill out these forms correctly to proceed."
                );
                break;
              default:
                setCreateTicketLoading(false);
                console.log("Unexpected response payload:", action.payload);
                showErrorToast("An error occurred");
                break;
            }
          } else if (updateTicket.rejected.match(action)) {
            // Handle rejected action
            setCreateTicketLoading(false);
            console.error("Error dispatching updateTicket:", action.error);
          }
        } catch (error) {
          setCreateTicketLoading(false);
          console.error("Error dispatching updateTicket:", error);
        }
      }
    } catch (error) {
      setCreateTicketLoading(false);
      console.log("Error updating ticket:", error);
    }
  };
  const handleDeleteTicket = async () => {
    try {
      setFormErrors("");
      setCreateTicketLoading(true);
      const payload = clickedUser?.id;
      console.log("Deleting ticket with ID:", payload);
      dispatch(deleteTicket({ ticket_id: payload }))
        .then((response) => {
          switch (response?.payload) {
            case 200:
              // useFetchAllTickets();
              // Wait for 1 second before fetching tickets and completing the process
              setTimeout(() => {
                setCreateTicketLoading(false);
                closeDeleteModal();
                //    fetchTickets();

                console.log("Ticket successfully deleted:", response);
                closeDeleteModal();
              }, 1000);
              break;
            case 400:
              setCreateTicketLoading(false);
              setCreateTicketLoading(false);
              setFormErrors("Please fill out the forms correctly to proceed.");
              break;
            default:
              setCreateTicketLoading(false);
              setCreateTicketLoading(false);
              console.log("Unexpected response payload:", response);
              break;
          }
        })
        .catch((error) => {
          setCreateTicketLoading(false);
          console.error("Error deleting ticket:", error);
        })
        .finally(() => {
          setCreateTicketLoading(false);
        });
    } catch (error) {
      console.error("Error in handleDeleteTicket:", error);
      setCreateTicketLoading(false);
    }
  };

  const [resolveLoading, setResolveLoading] = useState(false);
  const [resolveSuccess, setResolveSuccess] = useState(true);
  const [createLoadind, setCreateLoading] = useState(false);
  const handleResolveTicket = async () => {
    try {
      setFormErrors("");
      setResolveLoading(true);
      setCreateTicketLoading(true);
      const payload = clickedUser?.id;
      console.log("Resolving ticket with ID:", payload);

      dispatch(
        updateTicket({
          updateTicket: {
            status: "resolved",
          },
          ticket_id: payload,
        })
      )
        .then((response) => {
          setResolveLoading(false);
          switch (response?.payload) {
            case 200:
              // useFetchAllTickets();
              setResolveSuccess(false);
              setIsTicketDetailsModalOpen(false);
              setTimeout(() => {
                // fetchTickets();
                // fetchTickets();
                setCreateTicketLoading(false);
                ///setIsTicketDetailsModalOpen(true);
                console.log("Ticket successfully resolved:", response);
              }, 2000);
              break;
            case 400:
              setResolveLoading(false);
              setCreateTicketLoading(false);
              setFormErrors("Please fill out the forms correctly to proceed.");
              break;
            default:
              setResolveLoading(false);
              setCreateTicketLoading(false);
              console.log("Unexpected response payload:", response);
              break;
          }
        })
        .catch((error) => {
          console.error("Error resolving ticket:", error);
        })
        .finally(() => {
          setResolveLoading(false);
          setCreateTicketLoading(false);
        });
    } catch (error) {
      setResolveLoading(false);
      console.error("Error in handleResolveTicket:", error);
      setCreateTicketLoading(false);
    }
  };

  const handleReAssignTicket = async () => {
    try {
      setFormErrors("");
      setCreateTicketLoading(true);
      const payload = clickedUser?.id;

      //console.log("Resolving ticket with ID:", selectedUserId);
      dispatch(
        setHandler({
          user_id: createTicketFormData?.handler_id,
          ticket_id: payload,
        })
      )
        .then((response) => {
          console.log(response?.payload, "payload");
          switch (response?.payload) {
            case 200:
              setTimeout(() => {
                //    fetchTickets();
               // setSelectedUserId("");
                showSuccessToast("Ticket Re-assigned successfully");
                setCreateTicketLoading(false);
                closeDetailsTicketModal();
                handleReassignClick();
                console.log("Ticket successfully resolved:", response);
              }, 40);
              break;
            case 400:
              setCreateTicketLoading(false);
              showErrorToast("an Error Ocuurred");
              break;
            default:
              setCreateTicketLoading(false);
              showErrorToast("an Error Ocuurred");
              break;
          }
        })
        .catch((error) => {
          console.error("Error resolving ticket:", error);
        })
        .finally(() => {
          setCreateTicketLoading(false);
        });
    } catch (error) {
      console.error("Error in handleResolveTicket:", error);
      setCreateTicketLoading(false);
    }
  };

  const openDeleteModal = (item: Ticket) => {
    console.log("Open Delete Modal for item:", item);
    setClickedUser(item);
    setDeleteModalOpen(true);
    setIsTicketDetailsModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const openEditModal = (item: Ticket) => {
    console.log("Open Edit Modal for item:", item);
    setClickedUser(item);
    setEditModalOpen(true);
    setIsTicketDetailsModalOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    //resetForms();
  };

  const successModal = (
    <SuccessModalPop
      title="Ticket Created Successfully"
      message="You’ve successfully created a ticket"
      buttonText="Proceed to Tickets"
      onClose={closeSuccessTicketModal}
    />
  );
  const successModalEdit = (
    <SuccessModalPop
      title="Ticket has been Successfully Edited"
      message="You’ve successfully Edited a ticket"
      buttonText="Proceed to Tickets"
      onClose={closeEditSuccessTicketModal}
    />
  );

  const [clickedUser, setClickedUser] = useState<Ticket | null>(null);

  const profilePicStyle: React.CSSProperties = {
    backgroundColor: (() => {
      switch (clickedUser?.status) {
        case "new":
          return "#0564FF";
        case "due":
          return "#FDBA10";
        case "overdue":
          return "red";
        case "resolved":
          return "#0FC136";
        default:
          return "transparent";
      }
    })(),
  };

  const confirmDeleteModal = (
    <div className="form_content_display-dashboard">
      <br />
      <h3 className="clickedUser-h3">
        Confirm you want to Delete Ticket with id{" "}
        <span style={{ color: "orangered" }}>
          {/* {clickedUser?.first_name} {""}
          {clickedUser?.last_name} */}
          <p className="name-users-style-bold-email">
            Ticket ID: {clickedUser?.id}{" "}
          </p>
        </span>
      </h3>
      {/* <p className="clickedUser-p">This action cannot be undone</p> */}
      <div className="clickedUser-p-div">
        <div style={{ width: "100%" }}>
          <button
            style={{ width: "100%" }}
            onClick={closeDeleteModal}
            className={`custom-containers`}
          >
            Go Back
          </button>
        </div>
        <button
          className={`${loading ? "loading" : "custom-container"}`}
          onClick={handleDeleteTicket}
        >
          {createTicketLoading ? (
            <div className="loader">
              {[...Array(5)].map((_, index) => (
                <div key={index}></div>
              ))}
            </div>
          ) : (
            "Delete Ticket"
          )}
        </button>
      </div>
    </div>
  );

  const first_name_color = clickedUser?.handler.first_name;
  const last_name_color = clickedUser?.handler.last_name;
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [buttonText, setButtonText] = useState("Re-assign Ticket");
  //const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Track selected user ID

  const handleReassignClick = () => {
    setShowTicketDetails(!showTicketDetails);
    setButtonText(showTicketDetails ? "Re-assign Ticket" : "Cancel");
  };

  // const handleUserClick = (userId: string) => {
  //   setSelectedUserId(userId); // Set the selected user ID
  //   console.log(userId); // Log the selected user's ID
  // };

  const ticketContent = (
    <div className="amosn5">
      <div className="top-bar">
        {userProfile?.permission_type !== "support" && (
          <div className="action-buttons">
            <p
              onClick={() => openDeleteModal(clickedUser!)}
              style={{ cursor: "pointer" }}
            >
              Delete
            </p>
            <p
              onClick={() => openEditModal(clickedUser!)}
              style={{ cursor: "pointer" }}
            >
              Edit
            </p>
          </div>
        )}
      </div>
      <div
        className="profile-image-container"
        style={{ backgroundColor: profilePicStyle.backgroundColor }}
      >
        <img className="profile-image" src={ProfileCard} alt={"ProfileCard"} />
      </div>
      <div className="profile-info-container">
        <div
          className="initials-container"
          style={{ backgroundColor: profilePicStyle.backgroundColor }}
          onClick={(e) => e.stopPropagation()}
        >
          {<IoTicket size={24} />}
        </div>
        <br />
        <div>
          <p className="name-users-style-bold-email-ticket">
            Ticket ID: {clickedUser?.reference}{" "}
          </p>
        </div>
        <br />
        <div>
          <p className="name-users-style">Ticket Title</p>
        </div>
        <div style={{ marginTop: -7 }}>
          <p className="name-users-style-bold">{`${clickedUser?.title}`}</p>
        </div>
        <br />
        <div className="div-borderline">
          <p className="name-users-style-tickets-head">Ticket Details</p>
          <div className="border-line">
            <div>
              <p className="name-users-style-tickets">Ticket Status</p>
              <p
                className="name-users-style-tickets-texts"
                style={{ color: "#0564FF", backgroundColor: "#0564FF10" }}
              >
                {" "}
                {clickedUser?.status.toLowerCase() === "open"
                  ? "Open"
                  : clickedUser?.status.toLowerCase() === "due"
                  ? "Due"
                  : clickedUser?.status.toLowerCase() === "overdue"
                  ? "Overdue"
                  : clickedUser?.status.toLowerCase() === "resolved"
                  ? "Resolved"
                  : ""}
              </p>
            </div>
            <div>
              <p className="name-users-style-tickets">Ticket Priority</p>
              <p
                className="name-users-style-tickets-texts"
                style={{ color: "#0CC74C", backgroundColor: "#0CC74C25" }}
              >
                {clickedUser?.priority.toLowerCase() === "low"
                  ? "Low"
                  : clickedUser?.priority.toLowerCase() === "medium"
                  ? "Medium"
                  : clickedUser?.priority.toLowerCase() === "high"
                  ? "High"
                  : ""}
              </p>
            </div>

            <div>
              <p className="name-users-style-tickets">SLA Category</p>
              <p
                className="name-users-style-tickets-texts"
                style={{ color: "#C30CC7", backgroundColor: "#C30CC710" }}
              >
                {clickedUser?.sla_category.toLowerCase() === "standard"
                  ? "Standard"
                  : clickedUser?.sla_category.toLowerCase() === "medium"
                  ? "Medium"
                  : clickedUser?.sla_category.toLowerCase() === "complex"
                  ? "Complex"
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="div-borderline">
          <p className="name-users-style-tickets-head">Stakeholders Details</p>
          <div className="border-line" style={{ flexDirection: "column" }}>
            {clickedUser?.customer?.name ? (
              <div>
                <p className="tickets-stakeholders-name">Stakeholders Name</p>
                <p className="tickets-stakeholders-name-texts">
                  {clickedUser?.customer?.name}
                </p>
              </div>
            ) : null}
            <div>
              <p className="tickets-stakeholders-name">Stakeholders Email</p>
              <p className="tickets-stakeholders-name-texts">
                {clickedUser?.customer?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="div-borderline">
          <p className="name-users-style-tickets-head">
            Ticket Handler's Details
          </p>

          <div className="border-line" style={{ flexDirection: "column" }}>
            {clickedUser?.status !== "resolved" &&
              userProfile?.permission_type !== "support" && (
                <p
                  className="re-assign-ticket-texts-btn"
                  onClick={handleReassignClick}
                >
                  {buttonText}
                </p>
              )}

            <div>
              <p className="tickets-stakeholders-name-texts">
                <RandomColorComponent
                  firstName={first_name_color || ""}
                  lastName={last_name_color || ""}
                />
              </p>
              <div>
                <p className="tickets-stakeholders-name">
                  {" "}
                  {clickedUser?.handler?.first_name}{" "}
                  {clickedUser?.handler?.last_name}
                </p>
                <p className="tickets-stakeholders-name-texts">
                  {clickedUser?.handler?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        {showTicketDetails && (
          <div
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <IconComponent
                icon={<MdAssignmentAdd color="#fff" size="24" />}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <label className="business-name-label">
                  {" "}
                  Re-assign ticket to
                </label>
                <select
                  style={{ height: 48, padding: 12, width: "100%" }}
                  className="select-dashboard"
                  value={selectedValue}
                  onChange={(e) => {
                    resetFormData();
                    const selectedValue = e.target.value;
                    handleOptionSelect(selectedValue);
                    console.log(selectedValue, "selectedValue;");
                    if (selectedValue === "executive") {
                      setValueDropdown("SE Executive");
                    }
                  }}
                >
                  <option value="" disabled>
                    {/* {valueDropdown}{" "} */} Select a User Group
                  </option>
                  <option value="manager">
                    {/* {!isSEManagerSelected ? "SE Manager" : valueDropdown}{" "} */}
                    SE Manager
                  </option>
                  <option value="executive">
                    {" "}
                    SE Executive
                    {/* {!isSEExecutiveSelected ? "SE Executive" : valueDropdown}{" "} */}
                  </option>
                  <option value="support">
                    {" "}
                    Support
                    {/* {!isSupportSelected ? "Support" : valueDropdown}{" "} */}
                  </option>
                </select>

                {isSEManagerSelected ? (
                  <>
                    <p
                      style={{
                        margin: 0,
                        color: "#808080",
                        fontSize: 12,
                        marginTop: 28,
                      }}
                    >
                      {" "}
                      Choose a SE Manager
                    </p>

                    <select
                      style={{ height: 48, padding: 12, width: "100%" }}
                      className={`${"select-dashboard"}`}
                      value={createTicketFormData.handler_id}
                      onChange={(e) => {
                        setSelectedUserIdsUser(e.target.value);
                        setCreateTicketFormData((prevData) => ({
                          ...prevData,
                          handler_id: e.target.value,
                        }));
                      }}
                    >
                      {renderOptionsManager()}
                    </select>
                  </>
                ) : null}
                {isSEExecutiveSelected ? (
                  <>
                    <p
                      style={{
                        margin: 0,
                        color: "#808080",
                        fontSize: 12,
                        marginTop: 28,
                      }}
                    >
                      {" "}
                      Choose a SE Executive
                    </p>
                    <select
                      style={{ height: 48, padding: 12, width: "100%" }}
                      className={`${"select-dashboard"}`}
                      value={createTicketFormData.handler_id}
                      onChange={(e) => {
                        setSelectedUserIdsUser(e.target.value);
                        setCreateTicketFormData((prevData) => ({
                          ...prevData,
                          handler_id: e.target.value,
                        }));
                      }}
                    >
                      {renderOptionsExecutive()}
                    </select>
                  </>
                ) : null}
                {isSupportSelected ? (
                  <>
                    <p
                      style={{
                        margin: 0,
                        color: "#808080",
                        fontSize: 12,
                        marginTop: 28,
                        marginBottom: 6,
                      }}
                    >
                      {" "}
                      Choose a Department
                    </p>{" "}
                    <div
                      style={{
                        border: "0.6px solid #808080",
                        borderRadius: 8,
                        paddingLeft: 12,
                        padding: 6,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      {" "}
                      {Array.isArray(deptsSupport) &&
                        deptsSupport.length > 0 &&
                        deptsSupport.map((user: UsersLogItem) => (
                          <button
                            style={{
                              margin: 0,
                              fontSize: 12,
                              paddingTop: 8,
                              paddingBottom: 8,
                              cursor: "pointer",
                              backgroundColor:
                                selectedUserIds === user.id
                                  ? "var(--darkOrange)"
                                  : "transparent", // Apply background color if user is selected
                              border: "none",
                              width: "100%",
                              alignItems: "flex-start",
                              textAlign: "left",
                              borderRadius: 4,
                              display: "flex",
                              justifyContent: "space-between",
                              color:
                                selectedUserIds === user.id
                                  ? "#fff"
                                  : "#808080", // Apply background color if user is selected
                            }}
                            onClick={() => {
                              resetFormData();
                              fetchDepartsID(user.id);
                              setSelectedUserIds(user.id); // Update selected user ID
                            }}
                            key={user?.id}
                          >
                            <p style={{ margin: 0 }}> {user?.name}</p>{" "}
                            <FaCircleCheck
                              style={{
                                display:
                                  selectedUserIds === user.id
                                    ? "block"
                                    : "none",
                              }}
                            />
                          </button>
                        ))}{" "}
                    </div>
                  </>
                ) : null}

                {isSupportSelected && deptsSupportDatauSERS.length > 0 ? (
                  <>
                    {Array.isArray(deptsSupportDatauSERS) &&
                    deptsSupportDatauSERS.length > 0 ? (
                      deptsSupportDatauSERS?.filter(
                        (user: UsersLogItem) =>
                          user?.permission_type === "support"
                      )?.length > 0 ? (
                        deptsSupportDatauSERS
                          ?.filter(
                            (user: UsersLogItem) =>
                              user?.permission_type === "support"
                          )
                          ?.map((user: UsersLogItem) => (
                            <>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#808080",
                                  fontSize: 12,
                                  marginTop: 28,
                                  marginBottom: 6,
                                }}
                              >
                                Choose a Support User
                              </p>
                              <div
                                style={{
                                  border: "0.6px solid #808080",
                                  borderRadius: 8,
                                  paddingLeft: 12,
                                  padding: 6,
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  display: "flex",
                                  flexWrap: "wrap",
                                }}
                              >
                                <button
                                  style={{
                                    margin: 0,
                                    fontSize: 12,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    cursor: "pointer",
                                    backgroundColor:
                                      selectedUserIdsUser === user.id
                                        ? "var(--darkOrange)"
                                        : "transparent", // Apply background color if user is selected
                                    border: "none",
                                    width: "100%",
                                    alignItems: "flex-start",
                                    textAlign: "left",
                                    borderRadius: 4,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color:
                                      selectedUserIdsUser === user.id
                                        ? "#fff"
                                        : "#808080", // Apply background color if user is selected
                                  }}
                                  onClick={() => {
                                    setSelectedUserIdsUser(user.id);
                                    setCreateTicketFormData((prevData) => ({
                                      ...prevData,
                                      handler_id: user.id,
                                    }));
                                  }}
                                  key={user.id}
                                >
                                  <p style={{ margin: 0 }}>
                                    {user?.first_name} {user?.last_name}
                                  </p>
                                  <FaCircleCheck
                                    style={{
                                      display:
                                        selectedUserIdsUser === user.id
                                          ? "block"
                                          : "none",
                                    }}
                                  />
                                </button>
                              </div>
                            </>
                          ))
                      ) : (
                        <div
                          style={{
                            borderRadius: 8,
                            paddingLeft: 12,
                            padding: 16,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            marginTop: 24,
                            backgroundColor: "#ff6b0015",
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              color: "var(--darkOrange)",
                              fontSize: 12,
                            }}
                          >
                            No Support users in this department
                          </p>
                        </div>
                      )
                    ) : (
                      <div
                        style={{
                          borderLeft: "2px var(--darkOrange) solid",
                          borderRadius: 8,
                          paddingLeft: 12,
                          padding: 16,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          marginTop: 24,
                          backgroundColor: "#ff6b0015",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            color: "var(--darkOrange)",
                            fontSize: 12,
                          }}
                        >
                          No Support users in this department
                        </p>
                      </div>
                    )}{" "}
                  </>
                ) : null}

                {deptsFlags && deptsSupportDatauSERS.length === 0 ? (
                  <div
                    style={{
                      borderLeft: "2px var(--darkOrange solid",
                      borderRadius: 8,
                      paddingLeft: 12,
                      padding: 16,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginTop: 24,
                      backgroundColor: "#ff6b0015",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "var(--darkOrange",
                        fontSize: 12,
                      }}
                    >
                      No Support users in this department
                    </p>
                  </div>
                ) : null}

                {createTicketFormData?.handler_id ? (
                  <button
                    className={`${
                      createTicketLoading ? "loading" : "save-reassign"
                    }`}
                    onClick={handleReAssignTicket}
                  >
                    {createTicketLoading ? (
                      <div className="loader">
                        {[...Array(5)].map((_, index) => (
                          <div key={index}></div>
                        ))}
                      </div>
                    ) : (
                      "Confirm Re-assign"
                    )}
                  </button>
                ) : null}
              </div>{" "}
            </div>
          </div>
        )}
        <br />
        <div
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p className="name-users-style-tickets-head">Description</p>
          <div className="border-line">
            <p style={{ fontSize: 13, lineHeight: 1.6, width: "100%" }}>
              {" "}
              {clickedUser?.description}
            </p>
          </div>
        </div>{" "}
        <br /> <br />
        {resolveSuccess
          ? userProfile?.permission_type !== "support" &&
            clickedUser?.status !== "resolved" && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: 6,
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className={`${
                    resolveLoading ? "loading" : "reassign-ticket"
                  }`}
                  onClick={handleResolveTicket}
                >
                  {resolveLoading ? (
                    <div className="loader">
                      {[...Array(5)].map((_, index) => (
                        <div key={index}></div>
                      ))}
                    </div>
                  ) : (
                    "Resolve Ticket"
                  )}
                </button>
              </div>
            )
          : null}
        <br />
        <br />
        <div className="div-borderline">
          <p className="name-users-style-tickets-head">Ticket History</p>{" "}
        </div>
        <div
          className="border-line"
          style={{ marginTop: -32, display: "flex", flexDirection: "column" }}
        >
          {clickedUser?.ticket_activity?.map((activity, index) => (
            <div key={index}>
              <strong style={{ fontSize: 14, color: "#000" }}>
                Ticket{" "}
                {activity?.type?.charAt(0)?.toUpperCase() +
                  activity?.type?.slice(1)}
              </strong>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  width: "100%",
                  marginTop: -1,
                  marginBottom: 16,
                  color: "#808080",
                }}
              >
                Ticket with ID {activity?.reference} {activity?.type} by{" "}
                {activity?.text?.split("by ")[1]} at {activity?.created_at}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const [valueDropdown, setValueDropdown] = useState("Select an User Group");
  console.log(valueDropdown);
  const openCreateTicketModalContent = (
    <div className="form_content_display-dashboard">
      <br />

      <FormHeaders
        step=""
        activeStepNumber={1}
        totalStepNumbers={2}
        colored="gray"
        title="Create a Ticket"
        accountText={"Complete these to create a unique Ticket"}
      />
      <PasswordWarning formErrors={formErrors} />
      <br />
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <IconComponent icon={<TbMailFilled color="#fff" size="24" />} />

        <TextInputDashboard
          label="Email"
          value={createTicketFormData.email}
          onChange={handleCreateTicketInputChange}
          type="email"
          id="email"
          name="email"
          placeholder="Stakeholders Email Address"
          error={createTicketFormDataErrors.email}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <IconComponent icon={<TbUserFilled color="#fff" size="24" />} />

        <TextInputDashboard
          label="Stakeholders Name"
          value={createTicketFormData.name}
          onChange={handleCreateTicketInputChange}
          type="text"
          id="name"
          name="name"
          placeholder="Stakeholders Name"
          error={createTicketFormDataErrors.name}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <IconComponent icon={<MdSubtitles color="#fff" size="24" />} />

        <TextInputDashboard
          label="Ticket Title"
          value={createTicketFormData.title}
          onChange={handleCreateTicketInputChange}
          type="text"
          id="title"
          name="title"
          placeholder="Ticket title"
          error={createTicketFormDataErrors.title}
          required
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <IconComponent icon={<GrEmergency color="#fff" size="24" />} />

        <SelectInput
          placeholder="Select Ticket Priority"
          label="Select Ticket Priority"
          value={createTicketFormData.priority}
          onChange={(e) =>
            setCreateTicketFormData((prevData) => ({
              ...prevData,
              priority: e.target.value,
            }))
          }
          id="selectPriority"
          name="selectPriority"
          options={["low", "medium", "high"]}
          error={createTicketFormDataErrors.priority}
          required
        />
      </div>
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <IconComponent icon={<TbCategoryFilled color="#fff" size="24" />} />
        <SelectInput
          placeholder="SLA Category"
          label="SLA Category"
          value={createTicketFormData.sla_category}
          onChange={(e) =>
            setCreateTicketFormData((prevData) => ({
              ...prevData,
              sla_category: e.target.value,
            }))
          }
          id="selectPriority"
          name="selectPriority"
          options={["standard", "medium", "complex"]}
          error={createTicketFormDataErrors.sla_category}
          required
        />
      </div>
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <IconComponent icon={<MdAssignmentAdd color="#fff" size="24" />} />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <label className="business-name-label"> Assign ticket to</label>
          <select
            style={{ height: 48, padding: 12, width: "100%" }}
            className="select-dashboard"
            value={selectedValue}
            onChange={(e) => {
              const selectedValue = e.target.value;
              handleOptionSelect(selectedValue);
              console.log(selectedValue, "selectedValue;");
              if (selectedValue === "executive") {
                setValueDropdown("SE Executive");
              }
            }}
          >
            <option value="" disabled>
              {/* {valueDropdown}{" "} */} Select a User Group
            </option>
            <option value="manager">
              {/* {!isSEManagerSelected ? "SE Manager" : valueDropdown}{" "} */}
              SE Manager
            </option>
            <option value="executive">
              {" "}
              SE Executive
              {/* {!isSEExecutiveSelected ? "SE Executive" : valueDropdown}{" "} */}
            </option>
            <option value="support">
              {" "}
              Support
              {/* {!isSupportSelected ? "Support" : valueDropdown}{" "} */}
            </option>
          </select>

          {isSEManagerSelected ? (
            <>
              <p
                style={{
                  margin: 0,
                  color: "#808080",
                  fontSize: 12,
                  marginTop: 28,
                }}
              >
                {" "}
                Choose a SE Manager
              </p>

              <select
                style={{ height: 48, padding: 12, width: "100%" }}
                className={`${"select-dashboard"}`}
                value={createTicketFormData.handler_id}
                onChange={(e) =>
                  setCreateTicketFormData((prevData) => ({
                    ...prevData,
                    handler_id: e.target.value,
                  }))
                }
              >
                {renderOptionsManager()}
              </select>
            </>
          ) : null}
          {isSEExecutiveSelected ? (
            <>
              <p
                style={{
                  margin: 0,
                  color: "#808080",
                  fontSize: 12,
                  marginTop: 28,
                }}
              >
                {" "}
                Choose a SE Executive
              </p>
              <select
                style={{ height: 48, padding: 12, width: "100%" }}
                className={`${"select-dashboard"}`}
                value={createTicketFormData.handler_id}
                onChange={(e) =>
                  setCreateTicketFormData((prevData) => ({
                    ...prevData,
                    handler_id: e.target.value,
                  }))
                }
              >
                {renderOptionsExecutive()}
              </select>
            </>
          ) : null}

          {isSupportSelected ? (
            <>
              <p
                style={{
                  margin: 0,
                  color: "#808080",
                  fontSize: 12,
                  marginTop: 28,
                  marginBottom: 6,
                }}
              >
                {" "}
                Choose a Department
              </p>{" "}
              <div
                style={{
                  border: "0.6px solid #808080",
                  borderRadius: 8,
                  paddingLeft: 12,
                  padding: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {" "}
                {deptsSupport?.map((user: UsersLogItem) => (
                  <button
                    style={{
                      margin: 0,
                      fontSize: 12,
                      paddingTop: 8,
                      paddingBottom: 8,
                      cursor: "pointer",
                      backgroundColor:
                        selectedUserIds === user.id
                          ? "var(--darkOrange)"
                          : "transparent", // Apply background color if user is selected
                      border: "none",
                      width: "100%",
                      alignItems: "flex-start",
                      textAlign: "left",
                      borderRadius: 4,
                      display: "flex",
                      justifyContent: "space-between",
                      color: selectedUserIds === user.id ? "#fff" : "#808080", // Apply background color if user is selected
                    }}
                    onClick={() => {
                      fetchDepartsID(user.id);
                      setSelectedUserIds(user.id); // Update selected user ID
                    }}
                    key={user?.id}
                  >
                    <p style={{ margin: 0 }}> {user?.name}</p>{" "}
                    <FaCircleCheck
                      style={{
                        display: selectedUserIds === user.id ? "block" : "none",
                      }}
                    />
                  </button>
                ))}{" "}
              </div>
            </>
          ) : null}

          {isSupportSelected && deptsSupportDatauSERS.length > 0 ? (
            <>
              <p
                style={{
                  margin: 0,
                  color: "#808080",
                  fontSize: 12,
                  marginTop: 28,
                  marginBottom: 6,
                }}
              >
                Choose a Support User
              </p>
              <div
                style={{
                  border: "0.6px solid #808080",
                  borderRadius: 8,
                  paddingLeft: 12,
                  padding: 6,
                  flexDirection: "column",
                  alignItems: "flex-start",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {deptsSupportDatauSERS
                  ?.filter(
                    (user: UsersLogItem) => user.permission_type === "support"
                  )
                  ?.map((user: UsersLogItem) => (
                    <button
                      style={{
                        margin: 0,
                        fontSize: 12,
                        paddingTop: 8,
                        paddingBottom: 8,
                        cursor: "pointer",
                        backgroundColor:
                          selectedUserIdsUser === user.id
                            ? "var(--darkOrange)"
                            : "transparent", // Apply background color if user is selected
                        border: "none",
                        width: "100%",
                        alignItems: "flex-start",
                        textAlign: "left",
                        borderRadius: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        color:
                          selectedUserIdsUser === user.id ? "#fff" : "#808080", // Apply background color if user is selected
                      }}
                      onClick={() => {
                        setSelectedUserIdsUser(user.id),
                          setCreateTicketFormData((prevData) => ({
                            ...prevData,
                            handler_id: user.id,
                          }));
                      }}
                      key={user.id}
                    >
                      <p style={{ margin: 0 }}>
                        {" "}
                        {user?.first_name} {user?.last_name}
                      </p>{" "}
                      <FaCircleCheck
                        style={{
                          display:
                            selectedUserIdsUser === user.id ? "block" : "none",
                        }}
                      />
                    </button>
                  ))}
              </div>
            </>
          ) : null}

          {deptsFlags && deptsSupportDatauSERS.length === 0 ? (
            <div
              style={{
                borderLeft: "2px var(--darkOrange solid",
                borderRadius: 8,
                paddingLeft: 12,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: 24,
                backgroundColor: "#ff6b0015",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "var(--darkOrange",
                  fontSize: 12,
                  //marginTop: 28,
                  // marginBottom: 12,
                }}
              >
                No Support users in this department
              </p>
            </div>
          ) : null}

          <p
            className="business-name-label"
            style={{
              marginTop: 4,
              marginBottom: -0,
              color: "#FF7342",
              textAlign: "right",
            }}
            onClick={() => navigate("/users")}
          >
            {fetchedUsers?.length > 0
              ? null
              : "Add More Users to handle tickets"}
          </p>
        </div>{" "}
      </div>
      <br />
      {/* <div
      </div> */}
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <IconComponent icon={<TbBallpenFilled color="#fff" size="24" />} />
        <TextInputDashboard
          label="Description"
          value={createTicketFormData.description}
          onChange={(e) =>
            setCreateTicketFormData((prevData) => ({
              ...prevData,
              description: e.target.value,
            }))
          }
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          height
          error={createTicketFormDataErrors.description}
        />
      </div>
      <PasswordWarning formErrors={formErrors} />
      <br />
      <HalfButton
        onClick={handleCreateTicket}
        text="Create Ticket"
        loading={createLoadind}
        disabled={createLoadind}
      />
      <div>{/* ... (other form elements) */}</div>
    </div>
  );

  const openEditicketModalContent = (
    <div className="form_content_display-dashboard">
      <br />
      <MdCancel
        onClick={closeEditModal}
        size={24}
        color={"#FF7342"}
        style={{ cursor: "pointer" }}
      />
      <FormHeaders
        step=""
        activeStepNumber={1}
        totalStepNumbers={2}
        colored="gray"
        title="Edit a Ticket"
        accountText={"Complete these to edit Ticket"}
      />
      <PasswordWarning formErrors={formErrors} />
      <br />
      <br />
      <TextInputDashboard
        placeholderVisible
        label="Email"
        value={createTicketFormData.email}
        onChange={handleCreateTicketInputChange}
        type="email"
        id="email"
        name="email"
        placeholder={`${clickedUser?.customer?.email}`}
      />
      <TextInputDashboard
        placeholderVisible
        label="Stakeholders Name"
        value={createTicketFormData.name}
        onChange={handleCreateTicketInputChange}
        type="text"
        id="name"
        name="name"
        placeholder="Stakeholders Name"
      />
      <TextInputDashboard
        placeholderVisible
        label="Ticket Title"
        value={createTicketFormData.title}
        onChange={handleCreateTicketInputChange}
        type="text"
        id="title"
        name="title"
        placeholder={`${clickedUser?.title}`}
        required
      />
      <SelectInput
        placeholder={`${clickedUser?.priority}`}
        label="Select Ticket Priority"
        value={createTicketFormData.priority}
        onChange={(e) =>
          setCreateTicketFormData((prevData) => ({
            ...prevData,
            priority: e.target.value,
          }))
        }
        id="selectPriority"
        name="selectPriority"
        options={["low", "medium", "high"]}
        required
      />
      <SelectInput
        placeholder={`${clickedUser?.sla_category}`}
        label="SLA Category"
        value={createTicketFormData.sla_category}
        onChange={(e) =>
          setCreateTicketFormData((prevData) => ({
            ...prevData,
            sla_category: e.target.value,
          }))
        }
        id="selectPriority"
        name="selectPriority"
        options={["standard", "medium", "complex"]}
        required
      />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label className="business-name-label"> Select a Department </label>

        <select
          style={{ height: 48, padding: 12, width: "100%" }}
          className={`${"select-dashboard"}`}
          value={createTicketFormData.handler_id}
          onChange={(e) =>
            setCreateTicketFormData((prevData) => ({
              ...prevData,
              handler_id: e.target.value,
            }))
          }
        >
          {renderOptions()}
        </select>
        <p
          className="business-name-label"
          style={{
            marginTop: 4,
            marginBottom: -0,
            color: "#FF7342",
            textAlign: "right",
          }}
          onClick={() => navigate("/users")}
        >
          {fetchedUsers?.length > 0 ? null : "Add More Users to handle tickets"}
        </p>
      </div>
      <br />
      <SelectInput
        placeholder={`${clickedUser?.type}`}
        label="Select Ticket Type"
        value={createTicketFormData.type}
        onChange={(e) =>
          setCreateTicketFormData((prevData) => ({
            ...prevData,
            type: e.target.value,
          }))
        }
        id="selectType"
        name="selectType"
        options={["standard", "medium", "complex"]}
        required
      />
      <TextInputDashboard
        placeholderVisible
        label="Description"
        value={createTicketFormData.description}
        onChange={(e) =>
          setCreateTicketFormData((prevData) => ({
            ...prevData,
            description: e.target.value,
          }))
        }
        type="text"
        id="description"
        name="description"
        placeholder={`${clickedUser?.description}`}
        height
      />

      <PasswordWarning formErrors={formErrors} />
      <br />
      <HalfButton
        onClick={handleEditTicket}
        text="Edit Ticket"
        loading={createTicketLoading}
        disabled={createTicketLoading}
      />
    </div>
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content-container">
        <div className="dashboard-cards-container">
          <div className="dashboard-content">
            <div className="main-content-container">
              <div className="main-content-dashboard-div">
                <div>
                  <div>
                    <h2
                      className="main-content-dashboard-h2"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/tickets")}
                    >
                      Tickets &gt;&gt; {first_name_passed_as_params}{" "}
                      {last_name_passed_as_params}
                    </h2>
                    <p className="main-content-dashboard-p">
                      View all Tickets linked to {first_name_passed_as_params}{" "}
                      {last_name_passed_as_params}
                    </p>
                  </div>{" "}
                </div>

                <div className="dashboard-bell-search-icons">
                  {/* <TbSearch className="hide" onClick={openModalSearch} />
                   */}{" "}
                </div>
              </div>

              {shimmerLoader ? (
                <div
                  style={{
                    marginTop: 44,
                    backgroundColor: "#fff",
                    borderRadius: 24,
                  }}
                >
                  <ShimmerLoaderPage />
                </div>
              ) : (
                <div>
                  {allTickets?.length === 0 ? (
                    <div
                      style={{
                        marginTop: 44,
                        backgroundColor: "#fff",
                        borderRadius: 24,
                        gap: 48,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <NoTicketsMessage
                        heading="Whoops... No Tickets Logged"
                        paragraph="No tickets created yet"
                        imageUrl={NoTickets}
                        imageAlt="No Tickets"
                        buttonText="+ Create a Ticket"
                        onClick={openCreateTicketModal}
                      />
                    </div>
                  ) : null}
                  {allTickets?.length > 0 ? (
                    <div
                      style={{
                        marginTop: 44,
                        backgroundColor: "#fff",
                        borderRadius: 24,
                        gap: 48,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        className="tickets-history-log"
                        style={{ marginTop: 24, paddingTop: -24 }}
                      >
                        <TicketTable
                          tickets={allTickets}
                          openDetailsTicketModal={openDetailsTicketModal}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        ifClose={true}
        isOpen={isCreateTicketModalOpen}
        onOpen={openCreateTicketModal}
        onClose={closeCreateTicketModal}
        formContent={openCreateTicketModalContent}
      />
      <Modal
        ifClose={true}
        isOpen={isTicketSuccessModalOpen}
        onOpen={openSuccessTicketModal}
        onClose={closeSuccessTicketModal}
        formContent={successModal}
      />
      <Modal
        ifClose={true}
        isOpen={isTicketEditSuccessModalOpen}
        onOpen={openEditSuccessTicketModal}
        onClose={closeEditSuccessTicketModal}
        formContent={successModalEdit}
      />
      <Modal
        ifClose={true}
        isOpen={isTicketDetailsModalOpen}
        // onOpen={openDetailsTicketModal}
        onClose={closeDetailsTicketModal}
        formContent={ticketContent}
      />
      <Modal
        ifClose={true}
        isOpen={isDeleteModalOpen}
        // onOpen={openDetailsTicketModal}
        onClose={closeDeleteModal}
        formContent={confirmDeleteModal}
      />
      <Modal
        ifClose={true}
        isOpen={isEditModalOpen}
        // onOpen={openDetailsTicketModal}
        onClose={closeEditModal}
        formContent={openEditicketModalContent}
      />
    </div>
  );
};

export default GetUsersTicketsDashboard;
