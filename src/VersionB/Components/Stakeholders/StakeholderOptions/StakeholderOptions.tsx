import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import "./StakeholdersOption.css";
import { useNavigate } from "react-router-dom";

const StakeholdersOption: React.FC<{
  data: { title: string; description: string; index: number }[];
}> = ({ data }) => {
  const itemStyles = [
    { backgroundColor: "#E4ECC474", color: "#3C4C2C" }, // First item
    { backgroundColor: "#ACDCF474", color: "#044474" }, // Second item
    { backgroundColor: "#F2961225", color: "#F26F1D" }, // Third item
    { backgroundColor: "#DCD4FC75", color: "#54245C" }, // Fourth item
  ];

  const navigate = useNavigate();
  const handleClick = (item: {
    title: string;
    description: string;
    index: number;
  }) => {
    console.log("Clicked item:", item);
    console.log("Index:", item.index);
    if (item.index === 1) {
      navigate("/client-step1");
    } else if (item.index === 2) {
      navigate("/customer-step1");
    } else if (item.index === 3) {
      navigate("/digital-step1");
    } else if (item.index === 4) {
      navigate("/others-step1");
    }
  };

  return (
    <div>
      {data.map((item) => (
        <div
          key={item.index}
          onClick={() => handleClick(item)}
          className="stakeholder-item"
          style={{
            marginBottom: 12,
            padding: `24px 18px`,
            cursor: "pointer",
            justifyContent: "space-between",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            gap: 48,
            borderRadius: 12,
            backgroundColor: itemStyles[item.index - 1].backgroundColor,
            color: itemStyles[item.index - 1].color,
          }}
        >
          <div>
            <h4 style={{ margin: 0 }}>{item.title}</h4>
            <p style={{ margin: 0, marginTop: 6, fontSize: 14 }}>
              {item.description}
            </p>
          </div>

          <div>
            <FaArrowRight color={"#66666675"} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StakeholdersOption;
