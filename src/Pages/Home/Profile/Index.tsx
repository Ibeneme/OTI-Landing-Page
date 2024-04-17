import React, { ChangeEvent, useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
// import Overdue from "../../../assets/Dashboard/NewOverDue.png";
// import Due from "../../../assets/Dashboard/NewDue.png";
// import Recent from "../../../assets/Dashboard/NewRecent.png";
import { TbSearch } from "react-icons/tb";
import image from "../../../assets/Landingpage/SectionA/memoji/nastyatoki.png";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import {
  getOrganizationProfile,
  getProfile,
  updateOrganizationProfile,
  updatePersonalProfile,
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
import SettingsToggle from "./Components/SettingsToggle";
import profileImage from "../../../assets/Dashboard/Company.png";
import orgImage from "../../../assets/Dashboard/Company.png";
import "./Profile.css";
import { MdCancel, MdEdit, MdLogout } from "react-icons/md";

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
  first_name: string;
  last_name: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [organizationProfile, setOrganizationProfile] = useState<any | null>(
    null
  );
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getOrganizationProfile()).then((result) => {
      setOrganizationProfile(result.payload);
    });

    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      dispatch(getOrganizationProfile()).then((result) => {
        setOrganizationProfile(result.payload);
      });

      dispatch(getProfile()).then((result) => {
        setUserProfile(result.payload);
        console.log("lal", result);
      });
    }
  }, [profile]);

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
  const Logout = () => {
    localStorage.removeItem("srm_access_token");
    window.location.reload();
    console.log("User logged out.");
  };

  const confirmDeleteModal = (
    <div
      className="form_content_display-dashboard"
      style={{ alignItems: "center" }}
    >
      <br />
      <h3
        className="clickedUser-h3"
        style={{
          marginTop: -0,
          textAlign: "center",
        }}
      >
        Confirm you want to Log out <span style={{ color: "orangered" }}></span>
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "#808080",
          paddingBottom: 20,
          textAlign: "center",
          marginTop: -12,
          width: "100%",
        }}
      >
        This action will log you out
      </p>
      <div className="clickedUser-p-div">
        <div style={{ width: "100%" }}>
          <button
            style={{ width: "100%" }}
            onClick={() => setDeleteModalOpen(false)}
            className={`custom-containers`}
          >
            Go Back
          </button>
        </div>
        <button
          className={`${loading ? "loading" : "custom-container"}`}
          onClick={Logout}
        >
          {loading ? (
            <div className="loader">
              {[...Array(5)].map((_, index) => (
                <div key={index}></div>
              ))}
            </div>
          ) : (
            "Log Out"
          )}
        </button>
      </div>
    </div>
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
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
    setFormData({
      first_name: organizationProfile?.name,
      last_name: "",
      email: "",
    });
    setSelectedCountry(organizationProfile?.country);
    setSelectedValue(organizationProfile?.staff_count);
    setIsModalOpen(false);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleFirstModalContinue = () => {
    setFormErrors("");
    setLoading(true);
    dispatch(
      updateOrganizationProfile({
        staff_count: selectedValue,
        country: selectedCountry,
        name: formData.first_name
          ? formData.first_name
          : organizationProfile?.name,
        email: formData.last_name
          ? formData.last_name
          : organizationProfile?.email,
      })
    )
      .then((response) => {
        setLoading(false);
        switch (response?.payload) {
          case 200:
            console.log(response?.payload);
            setFormData({
              first_name: " ",
              last_name: "",
              email: "",
            });
            setSelectedCountry(organizationProfile?.country);
            setSelectedValue(organizationProfile?.staff_count);

            closeModal();
            break;
          case 400:
            setFormErrors("Please enter data correctly");
            break;
          case 422:
            setFormErrors("Please enter a valid email address");
            break;
          case 500:
            setFormErrors("Server Error");
            break;
          case 403:
            setFormErrors(
              "Sorry only creators of accounts are allowed to do this"
            );
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
  };
  const handleSecondModalContinue = async () => {
    try {
      setFormErrors("");
      if (formData?.first_name?.length > 0 || formData?.last_name?.length > 0) {
        setLoading(true);

        const response = await dispatch(updatePersonalProfile(formData));
        setLoading(false);
        switch (response?.payload) {
          case 200:
            console.log("Profile successfully updated:", response);
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
            });
            closeSecondModal();
            break;
          case 400:
            setFormErrors("Please Enter a Business Name to Proceed.");
            break;
          default:
            console.log("Unexpected response payload:", response);
            break;
        }
      } else {
        setFormErrors("Please Enter details to edit to Proceed.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating organization profile:", error);
    }
  };

  const formContentFirstModal = (
    <div className="form_content_display-dashboard">
      <br />
      <div style={{ position: "absolute" }}>
        <MdCancel
          size={24}
          color="orangered"
          onClick={closeModal}
          style={{
            position: "relative",
          }}
        />
      </div>
      <FormHeaders
        step=""
        activeStepNumber={0}
        totalStepNumbers={0}
        colored="gray"
        title="Edit your Organisation"
        //errorText={formErrors}
        accountText={"Complete these to edit your organisation"}
      />
      <PasswordWarning formErrors={formErrors} />
      <br />
      <br />
      <TextInputDashboard
        label="Business Name"
        value={formData.first_name}
        onChange={handleChange}
        type="text"
        id="first_name"
        name="first_name"
        placeholder={`${organizationProfile?.name}`}
        placeholderVisible
      />
      {/* <TextInputDashboard
        label="Email Address"
        value={
          formData.last_name ? formData.last_name : organizationProfile?.email
        }
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Enter a Email Address"
      /> */}
      <SelectInput
        placeholder="Select Number of Staff"
        label="Average Number of Staff"
        value={selectedValue ? selectedValue : organizationProfile?.staff_count}
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
        value={selectedCountry ? selectedCountry : organizationProfile?.country}
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
      <div></div>
    </div>
  );

  const formContentSecondModal = (
    <div
      className="form_content_display-dashboard"
      style={{ position: "relative" }}
    >
      <br />
      <MdCancel
        style={{
          fontSize: 28,
          color: "var(--darkOrange)",
          cursor: "pointer",
          position: "absolute",
          top: 0,
          right: 0,
        }}
        onClick={closeSecondModal}
      />
      <br />
      <br />
      <FormHeaders
        activeStepNumber={0}
        totalStepNumbers={0}
        title="Edit your profile"
        //errorText={formErrors}
        accountText={"Edit your Personal Profile"}
      />{" "}
      <PasswordWarning formErrors={formErrors} />
      <br /> <br />
      <TextInputDashboard
        label="First Name"
        value={formData.first_name}
        onChange={handleChange}
        type="text"
        id="first_name"
        name="first_name"
        placeholder="Enter a First Name"
      />
      <TextInputDashboard
        label="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Enter a Last Name"
      />
      <HalfButton
        onClick={handleSecondModalContinue}
        text="Continue"
        loading={loading}
        disabled={loading}
      />
      <div></div>
    </div>
  );

  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  const SearchContent = (
    <div className="FormHeader">
      <div className="vw">
        <h3 className="vw-text">Search</h3>
        <TextInputDashboard
          value={formData.first_name}
          onChange={handleChange}
          type="text"
          id="first_name"
          name="first_name"
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

  const accountSettingsContent = (
    <div>
      <div className="acc-settings-row-reverse">
        <div className="account-settings-background">
          <img src={profileImage} width="300" />
        </div>
        <div style={{ padding: 24 }}>
          <div className="slides-settings">
            <p className="slides-settings-p">First Name</p>
            <p className="slides-settings-bold">{userProfile?.first_name}</p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-p">Last Name</p>
            <p className="slides-settings-bold">{userProfile?.last_name}</p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-p">Email Address</p>
            <p className="slides-settings-bold">{userProfile?.email}</p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-p">Account Type</p>
            <p className="slides-settings-bold">
              {userProfile?.permission_type === "manager" ? "SE Manager" : null}
              {userProfile?.permission_type === "executive"
                ? "SE Executive"
                : null}
              {userProfile?.permission_type === "support" ? "SE Support" : null}
            </p>
          </div>
          <br />
          <div className="slides-settings">
            <p className="slides-settings-edit" onClick={openSecondModal}>
              <MdEdit /> Edit
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const orgSettingsContent = (
    <div>
      <div className="acc-settings-row-reverse">
        <div className="account-settings-background">
          <img src={orgImage} width="300" />
        </div>
        <div style={{ padding: 24 }}>
          <div className="slides-settings">
            <p className="slides-settings-p">Business Name</p>
            <p className="slides-settings-bold">{organizationProfile?.name}</p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-p">Country of Operation</p>
            <p className="slides-settings-bold">
              {organizationProfile?.country}
            </p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-p">Email Address</p>
            <p className="slides-settings-bold">{organizationProfile?.email}</p>
          </div>
          <div className="slides-settings">
            <p className="slides-settings-p">Staff Count</p>
            <p className="slides-settings-bold">
              {organizationProfile?.staff_count}
            </p>
          </div>
          {userProfile?.org_origin === true && (
            <div className="slides-settings">
              <p className="slides-settings-edit" onClick={openModal}>
                Edit <MdEdit />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  console.log(userProfile?.org_origin, "userProfile?.org_origin");

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
                    <h2 className="main-content-dashboard-h2">
                      Hello, {userProfile?.first_name} {userProfile?.last_name}{" "}
                      👋
                    </h2>
                    <p className="main-content-dashboard-p">
                      Let's optimize your profile page for better functionality
                    </p>
                  </div>{" "}
                </div>
                <div
                  className="dashboard-bell-search-icons"
                  style={{ cursor: "pointer" }}
                  onClick={() => setDeleteModalOpen(true)}
                >
                  <TbSearch
                    className="hide"
                    style={{ display: "none" }}
                    onClick={openModalSearch}
                  />
                  Log Out
                  <MdLogout
                    onClick={() => setDeleteModalOpen(true)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

              <div
                className="main-content-dashboard-div"
                style={{ marginTop: 12 }}
              >
                <SettingsToggle
                  accountSettingsContent={accountSettingsContent}
                  orgSettingsContent={orgSettingsContent}
                />
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
        isOpen={isSecondModalOpen}
        onOpen={openSecondModal}
        onClose={closeSecondModal}
        formContent={formContentSecondModal}
      />
      <Modal
        isOpen={isModalOpen}
        onOpen={openModal}
        onClose={closeModal}
        formContent={formContentFirstModal}
      />

      {userProfile?.permission_type === "managere" && (
        <>
          {!organizationProfile?.setup_complete && (
            <Modal
              isOpen={isModalOpen}
              onOpen={openModal}
              onClose={closeModal}
              formContent={formContentFirstModal}
            />
          )}
        </>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        formContent={confirmDeleteModal}
      />
    </div>
  );
};

export default Profile;
