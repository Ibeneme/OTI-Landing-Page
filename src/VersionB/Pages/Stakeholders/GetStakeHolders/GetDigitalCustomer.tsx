import React, { useState } from "react";
import "./GetStakeholders.css";
import StakeholdersList, { StakeholderData } from "./GetProfileComponent";

interface Data {
  basicDetails: boolean;
  addressAndContact: boolean;
  legalAndFinancial: boolean;
  extras: boolean;
}

const DigitalDigital: React.FC = () => {
  const [activeOption, setActiveOption] = useState<
    "basicDetails" | "addressAndContact" | "legalAndFinancial" | "extras"
  >("basicDetails");

  const handleToggle = (key: keyof Data) => {
    setActiveOption(key);
  };

  const stakeholdersData: StakeholderData[] = [
    {
      title: "Name of Digital Customers",
      value: "Ibeneme Ikenna",
    },
    {
      title: "Digital Products used",
      value: "Neo",
    },
    {
      title: "Financial Type",
      value: "Paying",
    },
    {
      title: "Digital Customer's industry or sector:",
      value: "Farming",
    },
    {
      title: "KYC documents provided",
      value: "NIN",
    },
 
  ];

  const stakeholdersAddress: StakeholderData[] = [
    {
      title: "Digital Customer's Address:",
      value: "#12 Vincent Street",
    },
    {
      title: "Digital Customer's Phone Number:",
      value: "Digital Customer",
    },
    {
      title: "Digital Customer's Email:",
      value: "Sector",
    },
    {
      title: "Digital Customer's Primary Communication Preference:",
      value: "Email",
    },
    {
      title: "Digital Customer's Contact Person Name:",
      value: "Ibeneme Ikenna",
    },
    {
      title: "Digital Customer's Contact Person Title:",
      value: "Mr",
    },
    {
      title: "Digital Customer's Contact Person Email:",
      value: "Ibenemeikenna2021@gmail.com",
    },
    {
      title: "Digital Customer's Contact Person Phone Number:",
      value: "+234 812 071 0198",
    },
  ];

  const stakeholdersContract: StakeholderData[] = [
    {
      title: "Start Date",
      value: "01 - Jan -  2023",
    },
    {
      title: "End Date:",
      value: "01 - Jan -  2023",
    },
    {
      title: "Renewal Date:",
      value: "01 - Jan -  2023",
    },
  ];

  const stakeholdersExtras: StakeholderData[] = [
    {
      title: "Terms:",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec leo ut eros lacinia pellentesque. Proin eleifend ipsum sed nulla consectetur, eu sagittis elit condimentum. Integer efficitur odio non dapibus fermentum. Vivamus a dui urna. Aliquam erat volutpat. Proin dictum odio vitae nisi ultricies, nec condimentum elit fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus ac elit id ante dictum mollis. Donec eleifend, ex sit amet euismod malesuada, ex tellus feugiat neque, at efficitur sapien elit non turpis. Ut fringilla lobortis diam, nec cursus ex vestibulum in. Sed congue, ex sed bibendum vestibulum, justo risus vehicula orci, nec rhoncus turpis arcu sit amet nisl. Suspendisse potenti. Etiam ullamcorper arcu non erat placerat, sed ullamcorper lacus dapibus. Vivamus id massa ac elit congue ultricies a vel velit. Phasellus tincidunt convallis risus non lobortis. Sed lobortis metus et metus consectetur, vitae sollicitudin enim ultricies.",
    },
    {
      title: "Special Notes or Comments:",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec leo ut eros lacinia pellentesque. Proin eleifend ipsum sed nulla consectetur, eu sagittis elit condimentum. Integer efficitur odio non dapibus fermentum. Vivamus a dui urna. Aliquam erat volutpat. Proin dictum odio vitae nisi ultricies, nec condimentum elit fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus ac elit id ante dictum mollis. Donec eleifend, ex sit amet euismod malesuada, ex tellus feugiat neque, at efficitur sapien elit non turpis. Ut fringilla lobortis diam, nec cursus ex vestibulum in. Sed congue, ex sed bibendum vestibulum, justo risus vehicula orci, nec rhoncus turpis arcu sit amet nisl. Suspendisse potenti. Etiam ullamcorper arcu non erat placerat, sed ullamcorper lacus dapibus. Vivamus id massa ac elit congue ultricies a vel velit. Phasellus tincidunt convallis risus non lobortis. Sed lobortis metus et metus consectetur, vitae sollicitudin enim ultricies.",
    },
  ];
  return (
    <div
      style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: 16 }}
    >
      <div
        style={{
          backgroundColor: "#Fff",
          width: "fit-content",
          padding: 12,
          borderRadius: 248,
          marginBottom: -16,
          display: "flex",
        }}
      >
        <div
          onClick={() => handleToggle("basicDetails")}
          style={{
            padding: `12px 16px`,
            marginRight: 0,
            borderRadius: 32,
            border: "none",
            fontSize: 12,
            color: activeOption === "basicDetails" ? "#fff" : "#666",
            backgroundColor:
              activeOption === "basicDetails" ? "#ff6b00" : "transparent",
          }}
        >
          <span>Basic Details</span>
        </div>
        <div
          onClick={() => handleToggle("addressAndContact")}
          style={{
            padding: `12px 16px`,
            marginRight: 0,
            borderRadius: 32,
            border: "none",
            fontSize: 12,
            color: activeOption === "addressAndContact" ? "#fff" : "#666",
            backgroundColor:
              activeOption === "addressAndContact" ? "#ff6b00" : "transparent",
          }}
        >
          <span>Address and Contact</span>
        </div>

        <div
          onClick={() => handleToggle("legalAndFinancial")}
          style={{
            padding: `12px 16px`,
            marginRight: 0,
            borderRadius: 32,
            border: "none",
            fontSize: 12,
            color: activeOption === "legalAndFinancial" ? "#fff" : "#666",
            backgroundColor:
              activeOption === "legalAndFinancial" ? "#ff6b00" : "transparent",
          }}
        >
          <span>Legal and Financial</span>
        </div>

        <div
          onClick={() => handleToggle("extras")}
          style={{
            padding: `12px 16px`,
            marginRight: 0,
            borderRadius: 32,
            border: "none",
            fontSize: 12,
            color: activeOption === "extras" ? "#fff" : "#666",
            backgroundColor:
              activeOption === "extras" ? "#ff6b00" : "transparent",
          }}
        >
          <span>Extras</span>
        </div>
      </div>
      {activeOption === "basicDetails" && (
        <div>
          <div className="white-content-getstakeholders">
            <div className="white-content-getstakeholders-details">
              <span className="span-bg-faint">
                Digital Customers Basic Details
              </span>{" "}
              <br />
              <br />
              <StakeholdersList data={stakeholdersData} />
            </div>
            <div className="getstakeholders-image-left"></div>
            <div
              className="getstakeholders-image"
              style={{
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://f005.backblazeb2.com/file/Webimages-used/001.png')",
              }}
            ></div>
          </div>
        </div>
      )}
      {activeOption === "addressAndContact" && (
        <div>
          <div className="white-content-getstakeholders">
            <div className="white-content-getstakeholders-details">
              <span className="span-bg-faint">
                {" "}
                Digital Customers Address and Contact Details
              </span>{" "}
              <br />
              <br />
              <StakeholdersList data={stakeholdersAddress} />
            </div>
            <div className="getstakeholders-image-left"></div>
            <div
              className="getstakeholders-image"
              style={{
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://f005.backblazeb2.com/file/Webimages-used/001.png')",
              }}
            ></div>
          </div>
        </div>
      )}
      {activeOption === "legalAndFinancial" && (
        <div>
          <div className="white-content-getstakeholders">
            <div className="white-content-getstakeholders-details">
              <span className="span-bg-faint">
                Digital Customers Contract Details
              </span>{" "}
              <br />
              <br />
              <StakeholdersList data={stakeholdersContract} />
            </div>
            <div className="getstakeholders-image-left"></div>
            <div
              className="getstakeholders-image"
              style={{
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://f005.backblazeb2.com/file/Webimages-used/001.png')",
              }}
            ></div>
          </div>
        </div>
      )}
      {activeOption === "extras" && (
        <div>
          <div className="white-content-getstakeholders">
            <div className="white-content-getstakeholders-details">
              <span className="span-bg-faint">
                Digital Customers Extra Details
              </span>{" "}
              <br />
              <br />
              <StakeholdersList data={stakeholdersExtras} />
            </div>
            <div className="getstakeholders-image-left"></div>
            <div
              className="getstakeholders-image"
              style={{
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://f005.backblazeb2.com/file/Webimages-used/001.png')",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalDigital;
