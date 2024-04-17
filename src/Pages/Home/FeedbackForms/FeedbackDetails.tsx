import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SingleFeedback } from "../../../../Redux/Feedback/Feedback";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../Redux/Store";
import {
  Feedback,
  //formatDate
} from "../Users/Components/FeedbackList";
import Sidebar from "../Dashboard/SideBar";
import ShimmerLoaderPage from "../../Utils/ShimmerLoader/ShimmerLoaderPage";
import "./FeedBackForms.css";
import { TbArrowLeft } from "react-icons/tb";
import Modal from "../../../components/Modal/Modal";
import IconComponent from "../Tickets/component/IconComponent";
import {
  MdAssignmentAdd,
  // MdCancel,
  //MdDownload,
  MdSubtitles,
  MdViewArray,
} from "react-icons/md";
import {
  TbBallpenFilled,
  TbCategoryFilled,
  TbMailFilled,
  TbUserFilled,
} from "react-icons/tb";
import FormHeaders from "../../Auth/Components/FormHeaders";
import PasswordWarning from "../../../components/Error/ErrorWarning";
import TextInputDashboard from "../../Auth/Components/TextInouts/TextInputDashboard";
import { GrEmergency } from "react-icons/gr";
import SelectInput from "../../Auth/Components/TextInouts/SelectInput";
import { UsersLogItem } from "../Tickets/Tickets";
import {
  getAllUsers,
  getDepartmentUsers,
  getDepartments,
  getProfile,
} from "../../../../Redux/Profile/Profile";
import HalfButton from "../../Auth/Components/Buttons/HalfBtn";
import { createTicket, getAllTickets } from "../../../../Redux/Tickets/Tickets";
import useCustomToasts from "../../Utils/ToastNotifications/Toastify";
import SuccessModalPop from "../Tickets/component/SuccessModal";
import "./FeedBackForms.css";
import { FaCircleCheck } from "react-icons/fa6";
//import FeedbackMediaComponent from "./Media";

const FeedbackDetails = () => {
  const { feedback_id } = useParams<{ feedback_id: string }>();
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(feedback_id, "feedback_id");
  const { showErrorToast } = useCustomToasts();
  const [fetchedUsers, setFetchedUsers] = useState<UsersLogItem[]>([]);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [isTicketSuccessModalOpen, setIsTicketSuccessModalOpen] =
    useState(false);

  const [fetchedUsersManager, setFetchedUsersManager] = useState<
    UsersLogItem[]
  >([]);
  const [fetchedUsersSupport, setFetchedUsersSupport] = useState<
    UsersLogItem[]
  >([]);
  const [fetchedUsersExecutive, setFetchedUsersExecutive] = useState<
    UsersLogItem[]
  >([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const [isSEManagerSelected, setIsSEManagerSelected] = useState(false);
  const [isSEExecutiveSelected, setIsSEExecutiveSelected] = useState(false);
  const [isSupportSelected, setIsSupportSelected] = useState(false);
  const [isSupportSelectedDepts, setIsSupportSelectedDepts] = useState(false);
  const [deptsSupport, getDeptSupport] = useState<UsersLogItem[]>([]);
  const [deptsFlag, setDeptFlag] = useState(false);
  const [deptsFlags, setDeptFlags] = useState(false);
  const [deptsSupportDatauSERS, getDeptSupportDatauSERS] = useState<
    UsersLogItem[]
  >([]);
  const [selectedUserIds, setSelectedUserIds] = useState(""); // Initialize selectedUserId state
  const [selectedUserIdsUser, setSelectedUserIdsUser] = useState(""); // Initialize selectedUserId state
  console.log(
    deptsFlag,
    isSupportSelectedDepts,
    fetchedUsersSupport,
    "isSupportSelectedDepts"
  );
  const fetchDepartsID = (department_id: string) => {
    const id = department_id;
    console.log(id, "department_iddepartment_id");
    dispatch(getDepartmentUsers(department_id))
      .then((result) => {
        getDeptSupportDatauSERS(result.payload);
        setDeptFlags(true);
        console.log(result.payload, department_id, "getDeptSupportDatauSERS");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        console.log(managerUsers, "managerUsers");
        console.log(supportUsers, "supportUsers");
        console.log(executiveUsers, "executiveUsers");
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
      console.log(result.payload, "deptsSupport", deptsSupport);
      getDeptSupport(result.payload);
      // const departmentNamesAndIds = result.payload.map(department => ({
      //   id: department.id,
      //   name: department.name
      // }));
      console.log(result.payload, "departmentNamesAndIds");
    });
  }, [dispatch]);

  const handleOptionSelect = (option: any, values?: string) => {
    setSelectedValue(option);
    console.log(option, "handleOptionSelect");
    setIsSEManagerSelected(option === "manager");
    setIsSEExecutiveSelected(option === "executive");
    setIsSupportSelected(option === "support");
    setIsSupportSelectedDepts(option === "supportDepts");

    console.log(values, "getDeptSupportData(values);", option);
    if (option === "support") {
      setDeptFlag(true);
    } else {
      setDeptFlag(false);
    }
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
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

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

  const [formErrors, setFormErrors] = useState("");
  const [createTicketLoading, setCreateTicketLoading] = useState(false);
  const [createTicketFormData, setCreateTicketFormData] = useState({
    priority: "",
    sla_category: "",
    title: "",
    description: "",
    name: feedback?.customer?.name ?? "",
    handler_id: "",
    email: feedback?.customer?.email ?? "",
    status: "",
  });

  useEffect(() => {
    if (loading) {
      dispatch(getProfile()).then((result) => {
        setUserProfile(result.payload);
      });
    }
    if (createTicketLoading) {
      dispatch(getAllTickets()).then(() => {});
    }
  }, []);
  const resetFormData = () => {
    setCreateTicketFormData({
      priority: "",
      sla_category: "",
      title: "",
      description: "",
      name: feedback?.customer?.name ?? "",
      handler_id: "",
      email: feedback?.customer?.email ?? "",
      status: "",
    });
  };

  const [createTicketFormDataErrors, setCreateTicketFormDataErrors] = useState({
    priority: "",
    sla_category: "",
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
    dispatch(SingleFeedback(feedback_id as string))
      .then((response) => {
        setFeedback(response.payload);
        console.log(response?.payload, "restde");
        setLoading(false);
      })
      .catch(() => {
        //setError(error.message);
        setLoading(false);
      });
  }, [dispatch, feedback_id]);

  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);

  const closeCreateTicketModal = () => {
    setIsCreateTicketModalOpen(false);
    //setCreateTicketLoading(false);
  };

  const openCreateTicketModal = () => {
    setIsCreateTicketModalOpen(true);
    //setCreateTicketLoading(false);
  };

  const openSuccessTicketModal = () => {
    setIsTicketSuccessModalOpen(true);
    setCreateTicketLoading(false);
  };
  const closeSuccessTicketModal = () => {
    setIsTicketSuccessModalOpen(false);
    setCreateTicketLoading(false);
    navigate("/tickets");
  };
  const closeSuccessTicketModalMain = () => {
    setIsTicketSuccessModalOpen(false);
    setCreateTicketLoading(false);
  };
  const [createLoadind, setCreateLoading] = useState(false);

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
            setLoading(false);
            setCreateTicketLoading(false);
            resetFormData();
            closeCreateTicketModal();
            openSuccessTicketModal();
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
            <option value="executive"> SE Executive</option>
            <option value="support"> Support</option>
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

  const successModal = (
    <SuccessModalPop
      title="Ticket Created Successfully"
      message="You’ve successfully created a ticket"
      buttonText="Proceed to Tickets"
      onClose={closeSuccessTicketModal}
      onBack={closeSuccessTicketModalMain}
    />
  );

  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, "_blank");
  };

  const handleImageDownload = (imageUrl: string) => {
    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download image");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png"); // Specify the file name with .png extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <Modal
        ifClose={true}
        isOpen={isCreateTicketModalOpen}
        onOpen={openCreateTicketModal}
        onClose={closeCreateTicketModal}
        formContent={openCreateTicketModalContent}
      />
      <Modal
        isOpen={isTicketSuccessModalOpen}
        onOpen={openSuccessTicketModal}
        onClose={closeSuccessTicketModal}
        formContent={successModal}
      />
      <Sidebar />
      <div className="main-content-container">
        <div className="dashboard-cards-container">
          <div className="dashboard-content">
            <div
              className="main-content-container"
              style={{ backgroundColor: "white", borderRadius: 12 }}
            >
              <div className="main-content-dashboard-div"></div>
              {loading ? (
                <ShimmerLoaderPage />
              ) : (
                <div className="div-split-tickets">
                  <div className="feedback-details">
                    <span
                      style={{
                        backgroundColor: "var(--darkOrange)",
                        padding: 12,
                        width: 12,
                        height: 12,
                        borderRadius: 666,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(-1)}
                    >
                      <TbArrowLeft
                        style={{
                          color: "white",
                          fontSize: 24,
                          cursor: "pointer",
                        }}
                      />
                    </span>
                    <h3>{feedback?.subject}</h3>
                    <div className="feedback-item">
                      <p className="label-feedback">Stakeholder Name</p>
                      <p className="value">{feedback?.customer?.name}</p>
                    </div>
                    <div className="feedback-item">
                      <p className="label-feedback">
                        Stakeholder Email Address
                      </p>
                      <p className="value">{feedback?.customer?.email}</p>
                    </div>
                    <div className="feedback-item">
                      <p className="label-feedback">Product</p>
                      <p className="value">{feedback?.project_name}</p>
                    </div>
                    <div className="feedback-item">
                      <p className="label-feedback">ID</p>
                      <p className="value">{feedback?.reference}</p>
                    </div>
                    <div className="feedback-item">
                      <p className="label-feedback">Subject</p>
                      <p className="value">{feedback?.subject}</p>
                    </div>
                    <div className="feedback-item">
                      <p className="label-feedback">Message</p>
                      <p className="value" style={{ fontSize: 12 }}>
                        {feedback?.message}
                      </p>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {feedback?.feedback_media?.map(
                        (imageItem: any, index: number) => (
                          <div
                            key={index}
                            style={{
                              minWidth: "100px",
                              margin: 4,
                              borderRadius: 24,
                              position: "relative",
                            }}
                          >
                            <img
                              src={imageItem.location}
                              alt={`Image ${index}`}
                              onClick={() =>
                                handleImageClick(imageItem.location)
                              }
                              style={{
                                cursor: "zoom-in",
                                width: 150,
                                borderRadius: 12,
                              }}
                            />
                            <br />
                            <br />
                            <br />
                            <br />
                            <button
                              onClick={() =>
                                handleImageDownload(imageItem.location)
                              }
                              style={{
                                backgroundColor: "var(--darkOrange)",
                                borderRadius: 833,
                                border: "2px solid white",
                                padding: 8,
                                color: "white",
                                position: "absolute",
                                top: "66%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 36,
                                height: 36,
                              }}
                            >
                              <MdViewArray
                                style={{ fontSize: 16 }}
                                onClick={() =>
                                  handleImageDownload(imageItem.location)
                                }
                              />
                            </button>
                          </div>
                        )
                      )}
                    </div>

                    <div>
                      {userProfile?.permission_type !== "support" ? (
                        <button
                          style={{
                            backgroundColor: "var(--darkOrange)",
                            padding: 12,
                            borderRadius: 24,
                            width: 140,
                            border: "none",
                            color: "white",
                            height: 50,
                          }}
                          onClick={() => setIsCreateTicketModalOpen(true)}
                        >
                          + Create a Ticket
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
              <div className="div-split-tickets"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
