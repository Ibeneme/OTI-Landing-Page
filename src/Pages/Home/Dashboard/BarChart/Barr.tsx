import React, { ReactNode } from "react";
import "./BarChart.css";

interface BarChartProps {
  data: { label: string; value: number }[];
  total: ReactNode;
}

const BarChart: React.FC<BarChartProps> = ({ data, total }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  // Define color mapping
  const colorMap: { [key: string]: string } = {
    Acadaboo: "#6610f265",
    Oberon: "#19875465",
    AG_Site: "#0d6efd65",
  };

  return (
    <div className="bar-chart-total">
      <div style={{ marginBottom: 12 }} className="total">
        <span>{total}</span>
      </div>
      <div className="bar-chart">
        {data.map((item) => (
          <div
            key={item.label}
            className="bar"
            style={{
              height: `${(item.value / maxValue) * 100}%`,
              backgroundColor: colorMap[item.label],
            }}
          >
            <div style={{ marginTop: 12 }}>
              <span className="label">
                {item.label}({item.value})
              </span>
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
