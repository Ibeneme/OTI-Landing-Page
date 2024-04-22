import React from "react";

export interface StakeholderData {
  title: string;
  value: string;
}

interface StakeholdersListProps {
  data: StakeholderData[];
}

const StakeholdersList: React.FC<StakeholdersListProps> = ({ data }) => {
  const renderStakeholders = data.map((stakeholder, index) => (
    <div className="white-content-getstakeholders-name" key={index}>
      <span className="white-content-getstakeholders-name-span">
        {stakeholder.title}
      </span>{" "}
      <span
        style={{
          backgroundColor: "#80808019",
          padding: "14px 16px",
          color: "#000",
          fontSize: 16,
        }}
        className="stakeholders-boxes"
      >
        {stakeholder.value}
      </span>
    </div>
  ));

  return <div>{renderStakeholders}</div>;
};

export default StakeholdersList;
