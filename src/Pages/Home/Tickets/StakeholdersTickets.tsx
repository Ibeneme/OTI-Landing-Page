import React, { ChangeEvent, useEffect, useState } from "react";
import "../Dashboard/styles/cards.css";
import "../Dashboard/Dashboard.css";
import image from "../../../assets/Landingpage/SectionA/memoji/nastyatoki.png";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import {
  getAllUsers,
  getOrganizationProfile,
  getProfile,
  updateOrganizationProfile,
} from "../../../../Redux/Profile/Profile";
import Modal from "../../../components/Modal/Modal";
import FormHeaders from "../../Auth/Components/FormHeaders";
import TextInputDashboard from "../../Auth/Components/TextInouts/TextInputDashboard";
import SelectInput from "../../Auth/Components/TextInouts/SelectInput";
import HalfButton from "../../Auth/Components/Buttons/HalfBtn";
import PasswordWarning from "../../../components/Error/ErrorWarning";
import ModalSearch from "../../../components/Modal/ModalSearch";
import NotificationListComponent from "../Dashboard/Components/Notifications/NotificationsList";
import Sidebar from "../Dashboard/SideBar";
import {
  createTicket,
  deleteTicket,
  getAllTickets,
  setHandler,
  updateTicket,
} from "../../../../Redux/Tickets/Tickets";
import { useNavigate } from "react-router-dom";
import { MdAssignmentAdd, MdSubtitles } from "react-icons/md";
import useCustomToasts from "../../Utils/ToastNotifications/Toastify";
import RandomColorComponent from "../Dashboard/RandomColor";
import ProfileCard from "../../../assets/Dashboard/ProfileCard.png";
import SuccessModalPop from "./component/SuccessModal";
import "./tickets.css";
import { IoTicket } from "react-icons/io5";
import NoTickets from "../../../assets/Dashboard/NoTickets.png";
import NoTicketsMessage from "../Dashboard/Components/NoTickets";
import ShimmerLoaderPage from "../../Utils/ShimmerLoader/ShimmerLoaderPage";
import IconComponent from "./component/IconComponent";
import {
  TbBallpenFilled,
  TbCategoryFilled,
  TbMailFilled,
  TbUserFilled,
} from "react-icons/tb";
import { GrEmergency } from "react-icons/gr";
import TicketTable from "./NewTicketTable";
interface Ticket {
  title: string;
  reference: string;
  created_at: string;
  handler: {
    first_name: string;
    last_name: string;
    email: string;
  };
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    name: string;
  };
  image: string;
  id: string;
  status: string;
  priority: string;
  type: string;
  sla_category: string;
  description: string;
  ticket_activity: TicketActivity[];
}

interface TicketActivity {
  created_at: string;
  id: string;
  reference: string;
  text: string;
  type: string;
  updated_at: string;
}

const notificationsData = [
  {
    title: "Assigned a Ticket",
    text: "You just Assigned Hephizbah a New Ticket",
    iconColor: "#3498db",
    textColor: "#80808085",
    titleColor: "#121212",
    image: image,
  },
  {
    title: "Notification Title",
    text: "Don't forget to complete your tasks.",
    iconColor: "#FF7342",
    textColor: "#80808085",
    titleColor: "#121212",
  },
];

interface FormData {
  email: string;
  name: string;
  last_name: string;
  company_name: string;
}
interface UsersLogItem {
  department: string | null;
  status: string;
  permission_type: string;
  first_name: string;
  title: string;
  email: string;
  image: string;
  last_name: string;
  id: string;
  phone_number: string;
  email_verified: string;
}

interface StakeholdersTicketComponentDashboardProps {
  headersTickets?: string;
  ticketStatusProps?: string;
  ticketPriorityProps?: string;
  unResolvedProps?: string;
  ticketReturn?: boolean;
  //unResolved?: boolean;
}
const StakeholdersTicketComponentDashboard: React.FC<
  StakeholdersTicketComponentDashboardProps
> = ({
  headersTickets,
  ticketStatusProps,
  ticketPriorityProps,
  ticketReturn,
  //unResolved,
  unResolvedProps,
}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useCustomToasts();
  const [organizationProfile, setOrganizationProfile] = useState<any | null>(
    null
  );
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shimmerLoader, setShimmerLoader] = useState(false);
  const [fetchedUsers, setFetchedUsers] = useState<UsersLogItem[]>([]);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [createTicketLoading, setCreateTicketLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [allTickets, setAllTickets] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    last_name: "",
    company_name: "",
    email: "",
  });

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
    dispatch(getOrganizationProfile()).then((result) => {
      setOrganizationProfile(result.payload);
    });
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        setShimmerLoader(true);
        const result = await dispatch(getAllTickets());
        // setFilteredTickets(result.payload);
        setAllTickets(result.payload);
      } catch (error) {
        setShimmerLoader(false);
      } finally {
        setShimmerLoader(false);
      }
    };
    fetchAllTickets();
  }, [dispatch]);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (allTickets) {
      const filtered = allTickets.filter(
        (ticket: Ticket) =>
          ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          ticket.priority.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length === 0) {
        // setShowNoItemsFound(true);
        //setFilteredTickets(filtered);
      } else {
        // setFilteredTickets(filtered);
        //setShowNoItemsFound(false);
      }
    }
  }, [searchQuery, allTickets]);

  //   const //fetchTickets = async () => {
  //     try {
  //       setLoading(true);
  //       const result = await dispatch(getAllTickets());
  //       //setFilteredTickets(result.payload);
  //       setAllTickets(result.payload);
  //     } catch (error) {
  //     } finally {
  //       setIsTicketSuccessModalOpen(false);
  //       setIsTicketEditSuccessModalOpen(false);
  //     }
  //   };

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
      dispatch(getOrganizationProfile()).then((result) => {
        setOrganizationProfile(result.payload);
      });
      dispatch(getProfile()).then((result) => {
        setUserProfile(result.payload);
      });
    }
  }, []);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isModalOpenSearch, setIsModalOpenSearch] = useState(false);
  const [isModalOpenNotifications, setIsModalOpenNotifications] =
    useState(false);
  const openModalSearch = () => {
    setIsModalOpenSearch(true);
  };
  const closeModalSearch = () => {
    setIsModalOpenSearch(false);
  };
  const openModalNotifications = () => {
    setIsModalOpenNotifications(true);
  };
  const closeModalNotifications = () => {
    setIsModalOpenNotifications(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormErrors("");
    setSelectedCountry(e.target.value);
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormErrors("");
    setSelectedValue(e.target.value);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };
  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };
  const handleFirstModalContinue = () => {
    setFormErrors("");
    if (selectedValue && selectedCountry) {
      setLoading(true);
      dispatch(
        updateOrganizationProfile({
          staff_count: selectedValue,
          country: selectedCountry,
        })
      )
        .then((response) => {
          setLoading(false);
          switch (response?.payload) {
            case 200:
              closeModal();
              openSecondModal();
              break;
            case 400:
              setFormErrors("Please enter data correctly");
              break;
            case 500:
              setFormErrors("Server Error");
              break;
            default:
              setFormErrors("Network Error");
              break;
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating organization profile:", error);
        });
    } else {
      setFormErrors(
        "Please choose both Average Number of Staff and Country of Operation."
      );
    }
  };
  const handleSecondModalContinue = () => {
    setFormErrors("");
    if (formData?.name?.length > 0) {
      setLoading(true);
      dispatch(
        updateOrganizationProfile({
          nature_of_business: formData?.name,
        })
      )
        .then((response) => {
          setLoading(false);
          switch (response?.payload) {
            case 200:
              closeSecondModal();
              break;
            case 400:
              setFormErrors("Please Enter a Business Name to Proceed.");
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating organization profile:", error);
        });
    } else {
      setFormErrors("Please Enter a Business Name to Proceed.");
    }
  };
  const openCreateTicketModal = () => {
    setIsCreateTicketModalOpen(true);
  };
  const openSuccessTicketModal = () => {
    setIsTicketSuccessModalOpen(true);
  };
  const closeSuccessTicketModal = () => {
    ////fetchTickets();
    setIsTicketSuccessModalOpen(false);
  };
  const openEditSuccessTicketModal = () => {
    setIsTicketEditSuccessModalOpen(true);
  };
  const closeEditSuccessTicketModal = () => {
    ////fetchTickets();
    setIsTicketEditSuccessModalOpen(false);
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
  };

  const closeCreateTicketModal = () => {
    setIsCreateTicketModalOpen(false);
  };

  const handleCreateTicket = () => {
    let hasErrors = false;
    const newErrors = { ...createTicketFormDataErrors };

    if (!createTicketFormData.name.trim()) {
      newErrors.name = "Stakholders Name is required";
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
    dispatch(createTicket(createTicketFormData))
      .then((response) => {
        setCreateTicketLoading(false);
        switch (response?.payload) {
          case 201:
            closeCreateTicketModal();
            openSuccessTicketModal();
            break;
          case 400:
            setFormErrors("Please Fill these forms correctly to Proceed.");
            break;
          default:
            console.log("Unexpected response payload:", response);
            showErrorToast("An Error Occurred");
            break;
        }
      })

      .catch((error) => {
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
                status: createTicketFormData?.status
                  ? createTicketFormData?.status
                  : clickedUser?.status,
                type: createTicketFormData?.type
                  ? createTicketFormData?.type
                  : createTicketFormData?.title,
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

          // Check the action type and payload
          if (updateTicket.fulfilled.match(action)) {
            // Access the payload from the action
            switch (action.payload) {
              case 200:
                setCreateTicketLoading(false);
                closeEditModal();
                openEditSuccessTicketModal();
                //fetchTickets();
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
              // Wait for 1 second before fetching tickets and completing the process
              setTimeout(() => {
                closeDeleteModal();
                //fetchTickets();
                setCreateTicketLoading(false);
                console.log("Ticket successfully deleted:", response);
                closeDeleteModal();
              }, 1000);
              break;
            case 400:
              setCreateTicketLoading(false);
              setFormErrors("Please fill out the forms correctly to proceed.");
              break;
            default:
              setCreateTicketLoading(false);
              console.log("Unexpected response payload:", response);
              break;
          }
        })
        .catch((error) => {
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

  const handleResolveTicket = async () => {
    try {
      setFormErrors("");
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
          switch (response?.payload) {
            case 200:
              setIsTicketDetailsModalOpen(false);
              setResolveLoading(false);
              setTimeout(() => {
                //fetchTickets();
                setCreateTicketLoading(false);
                setResolveSuccess(false);
                //setIsTicketDetailsModalOpen(true);
                console.log("Ticket successfully resolved:", response);
              }, 2000);
              break;
            case 400:
              setCreateTicketLoading(false);
              setFormErrors("Please fill out the forms correctly to proceed.");
              break;
            default:
              setCreateTicketLoading(false);
              console.log("Unexpected response payload:", response);
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

  const handleReAssignTicket = async () => {
    try {
      setFormErrors("");
      setCreateTicketLoading(true);
      const payload = clickedUser?.id;
      console.log("Resolving ticket with ID:", payload);
      dispatch(setHandler({ user_id: selectedUserId, ticket_id: payload }))
        .then((response) => {
          setCreateTicketLoading(false);
          switch (response?.payload) {
            case 200:
              setTimeout(() => {
                //fetchTickets();
                setSelectedUserId("");
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
  const formContentFirstModal = (
    <div className="form_content_display-dashboard">
      <br />
      <FormHeaders
        step="Step"
        activeStepNumber={1}
        totalStepNumbers={2}
        colored="gray"
        title="Setup your Organisation"
        //errorText={formErrors}
        accountText={"Complete these to set up your organisation"}
      />
      <PasswordWarning formErrors={formErrors} />
      <div className="business-name-div">
        <p className="business-name-label">Business Name</p>
        <p className="business-name-fetched">{organizationProfile?.name}</p>
      </div>
      <SelectInput
        placeholder="Select Number of Staff"
        label="Average Number of Staff"
        value={selectedValue}
        onChange={handleSelectChange}
        id="selectOption"
        name="selectOption"
        options={[
          "0 - 10",
          "11 - 50",
          "51 - 100",
          "100 - 500",
          "500 and Above",
        ]}
        required
      />
      <SelectInput
        placeholder="Choose your Country of Operation"
        label="Country of Operation"
        value={selectedCountry}
        onChange={handleCountryChange}
        id="selectCountry"
        name="selectCountry"
        options={["Nigeria", "Ghana"]}
        required
      />
      <HalfButton
        onClick={handleFirstModalContinue}
        text="Continue"
        loading={loading}
        disabled={loading}
      />
      <PasswordWarning formErrors={formErrors} />
      <div>{/* ... (other form elements) */}</div>
    </div>
  );

  const formContentSecondModal = (
    <div className="form_content_display-dashboard">
      <br />
      <FormHeaders
        step="Step"
        activeStepNumber={2}
        totalStepNumbers={2}
        colored="gray"
        title="Setup your Organisation"
        accountText={"Complete these to set up your organisation"}
      />
      <PasswordWarning formErrors={formErrors} />
      <div className="business-name-div">
        <p className="business-name-label">Business Name</p>
        <p className="business-name-fetched">{organizationProfile?.name}</p>
      </div>
      <TextInputDashboard
        label="Nature of Business"
        value={formData.name}
        onChange={handleChange}
        type="text"
        id="name"
        name="name"
        placeholder="Nature of Business"
      />
      <HalfButton
        onClick={handleSecondModalContinue}
        text="Continue"
        loading={loading}
        disabled={loading}
      />
      <br />
      <PasswordWarning formErrors={formErrors} />
      <div>{/* ... (other form elements) */}</div>
    </div>
  );

  const SearchContent = (
    <div className="FormHeader">
      <div className="vw">
        <h3 className="vw-text">Search</h3>
        {/* <p style={{ display: "none" }}>{searchTerm}</p> */}
        <TextInputDashboard
          value={formData.name}
          onChange={handleChange}
          type="text"
          id="name"
          name="name"
          placeholder="Search"
        />
      </div>
    </div>
  );

  const NotificationsDisplay = (
    <div className="FormHeader">
      <div className="vw">
        <NotificationListComponent notifications={notificationsData} />
      </div>
    </div>
  );

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
      <TextInputDashboard
        label="Email"
        value={createTicketFormData.email}
        onChange={handleCreateTicketInputChange}
        type="email"
        id="email"
        name="email"
        placeholder="Email Address"
        error={createTicketFormDataErrors.email}
      />
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

      <TextInputDashboard
        label="Ticket Title"
        value={createTicketFormData.title}
        onChange={handleCreateTicketInputChange}
        type="text"
        id="title"
        name="title"
        placeholder="Enter a ticket title"
        error={createTicketFormDataErrors.title}
        required
      />

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
        placeholder="Select Ticket Type"
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
        error={createTicketFormDataErrors.type}
        required
      />
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

      <PasswordWarning formErrors={formErrors} />
      <br />
      <HalfButton
        onClick={handleCreateTicket}
        text="Create Ticket"
        loading={createTicketLoading}
        disabled={createTicketLoading}
      />
    </div>
  );

  const [clickedUser, setClickedUser] = useState<Ticket | null>(null);
  const [resolveLoading, setResolveLoading] = useState(false);
  const [resolveSuccess, setResolveSuccess] = useState(true);

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
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleReassignClick = () => {
    setShowTicketDetails(!showTicketDetails);
    setButtonText(showTicketDetails ? "Re-assign Ticket" : "Cancel");
  };

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    console.log(userId);
  };

  const ticketContent = (
    <div className="amosn5">
      <div className="top-bar">
        {userProfile?.permission_type === "manager" && (
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
            <p className="name-users-style-tickets-head">Re-assign Ticket to</p>
            <div
              className="border-line"
              style={{
                flexDirection: "column",
                paddingBottom: 48,
                paddingTop: 24,
                gap: 6,
              }}
            >
              {fetchedUsers?.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  style={{
                    border:
                      selectedUserId === user.id
                        ? "2px solid #031849"
                        : "2px solid transparent",
                    cursor: "pointer",
                    paddingTop: 6,
                    paddingBottom: 10,
                    backgroundColor:
                      selectedUserId === user.id ? "#031849" : "#Fff",
                    color: selectedUserId === user.id ? "#fff" : "",
                  }}
                  className="fetchedUsers-reasign-tickets"
                >
                  <br />
                  <div className="fetchedUsers-reasign-tickets">
                    <RandomColorComponent
                      firstName={user.first_name || ""}
                      lastName={user.last_name || ""}
                    />
                    <div>
                      <p className="users-tickets-re-assign-name">
                        {" "}
                        {user.first_name} {user.last_name}
                      </p>
                      <p
                        style={{
                          color: selectedUserId === user.id ? "#fff" : "",
                        }}
                        className="users-tickets-re-assign-email"
                      >
                        {" "}
                        {user.email}
                      </p>
                    </div>{" "}
                  </div>
                </div>
              ))}
              {selectedUserId ? (
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
                Ticket with reference {activity?.reference} {activity?.type} by{" "}
                {activity?.text?.split("by ")[1]} at {activity?.created_at}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const openEditicketModalContent = (
    <div className="form_content_display-dashboard">
      <br />

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
          placeholderVisible
          label="Stakeholders Email"
          value={createTicketFormData.email}
          onChange={handleCreateTicketInputChange}
          type="email"
          id="email"
          name="email"
          placeholder={`${clickedUser?.customer?.email}`}
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
          placeholderVisible
          label="Stakeholders Name"
          value={createTicketFormData.name}
          onChange={handleCreateTicketInputChange}
          type="text"
          id="name"
          name="name"
          placeholder="Stakeholders Name"
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
      </div>
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
      </div>
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
          <label className="business-name-label">Assign Ticket to </label>

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
            {fetchedUsers?.length > 0
              ? null
              : "Add More Users to handle tickets"}
          </p>
        </div>{" "}
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
        <IconComponent icon={<TbBallpenFilled color="#fff" size="24" />} />

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
      </div>
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

  const resolvedItems = allTickets?.filter(
    (ticket: {
      id: string;
      title: string;
      description: string;
      status: string;
      priority: string;
    }) => {
      if (ticketReturn === true) {
        return allTickets;
      } else if (ticketStatusProps) {
        return ticket.status === `${ticketStatusProps}`;
      } else if (ticketPriorityProps) {
        return ticket.priority === `${ticketPriorityProps}`;
      } else if (unResolvedProps) {
        return ticket.status !== `${unResolvedProps}`;
      } else {
        return true;
      }
    }
  );

  return (
    <div className="dashboard-container">
      {ticketReturn ? null : <Sidebar />}
      <div className="main-content-container">
        <div className="dashboard-cards-container">
          <div className="dashboard-content">
            <div className="main-content-container">
              <div className="main-content-dashboard-div">
                <div>
                  {headersTickets ? (
                    <div>
                      <h2 className="main-content-dashboard-h2">
                        {headersTickets}
                      </h2>
                      <p className="main-content-dashboard-p">
                        Create and view all your tickets here
                      </p>
                    </div>
                  ) : null}
                </div>
                <input
                  onChange={handleSearchInputChange}
                  style={{ display: "none" }}
                />
                <div className="dashboard-bell-search-icons">
                  {/* <TbSearch className="hide" onClick={openModalSearch} />
                   */}{" "}
                </div>
              </div>

              <div>
                {shimmerLoader ? (
                  <div
                    style={{
                      marginTop: ticketReturn ? -10 : 44,
                      backgroundColor: "#fff",
                      borderRadius: 24,
                    }}
                  >
                    <ShimmerLoaderPage />
                  </div>
                ) : (
                  <div>
                    {resolvedItems?.length === 0 ? (
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
                          heading={`Whoops... no ${
                            ticketStatusProps ? ticketStatusProps : ""
                          } ${unResolvedProps ? unResolvedProps : ""} ${
                            ticketPriorityProps ? ticketPriorityProps : ""
                          } tickets`}
                          paragraph="No tickets created yet"
                          imageUrl={NoTickets}
                          imageAlt="No Tickets"
                        />
                      </div>
                    ) : null}
                    {resolvedItems?.length > 0 ? (
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
                          style={{ marginTop: -24, paddingTop: -24 }}
                        >
                          <TicketTable
                            tickets={resolvedItems}
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
      </div>
      <ModalSearch
        isOpen={isModalOpenSearch}
        onOpen={openModalSearch}
        onClose={closeModalSearch}
        formContent={SearchContent}
      />
      <ModalSearch
        isOpen={isModalOpenNotifications}
        onOpen={openModalNotifications}
        onClose={closeModalNotifications}
        formContent={NotificationsDisplay}
      />

      <Modal
        isOpen={isCreateTicketModalOpen}
        onOpen={openCreateTicketModal}
        onClose={closeCreateTicketModal}
        formContent={openCreateTicketModalContent}
        ifClose={true}
      />
      <Modal
        isOpen={isTicketSuccessModalOpen}
        onOpen={openSuccessTicketModal}
        onClose={closeSuccessTicketModal}
        formContent={successModal}
      />
      <Modal
        isOpen={isTicketEditSuccessModalOpen}
        onOpen={openEditSuccessTicketModal}
        onClose={closeEditSuccessTicketModal}
        formContent={successModalEdit}
      />
      <Modal
        isOpen={isTicketDetailsModalOpen}
        // onOpen={openDetailsTicketModal}
        onClose={closeDetailsTicketModal}
        formContent={ticketContent}
        ifClose={true}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        // onOpen={openDetailsTicketModal}
        onClose={closeDeleteModal}
        formContent={confirmDeleteModal}
      />
      <Modal
        isOpen={isEditModalOpen}
        // onOpen={openDetailsTicketModal}
        onClose={closeEditModal}
        formContent={openEditicketModalContent}
        ifClose={true}
      />
      {userProfile?.permission_type === "executive" && (
        <>
          {!userProfile?.org_setup_complete && (
            <Modal
              isOpen={isModalOpen}
              onOpen={openModal}
              onClose={closeModal}
              formContent={formContentFirstModal}
            />
          )}
        </>
      )}

      {isSecondModalOpen && (
        <Modal
          isOpen={isSecondModalOpen}
          onOpen={openSecondModal}
          onClose={closeSecondModal}
          formContent={formContentSecondModal}
        />
      )}
    </div>
  );
};

export default StakeholdersTicketComponentDashboard;
