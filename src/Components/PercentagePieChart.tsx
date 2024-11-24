/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const PercentagePieChart = ({data}: any) => {

  // Calculate total for percentages
  const total = data.reduce(
    (sum:any, item:any) => sum + item.resolved + item.unresolved,
    0
  );

  // Calculate percentage for each item
  const processedData = data.map((item:any) => ({
    name: item.name,
    value: item.resolved + item.unresolved,
    percentage: (((item.resolved + item.unresolved) / total) * 100).toFixed(1),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Custom label to show percentage
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
    percentage,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name} ${percentage}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width={window.innerWidth / 3} height={250}>
        <PieChart>
          <Pie
            data={processedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {processedData.map((entry:any, index:any) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              `${props.payload.percentage}%`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PercentagePieChart;
