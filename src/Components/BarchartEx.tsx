/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import colors from "tailwindcss/colors";



const BarChartExample = ({data}:any) => {
  return (
    <ResponsiveContainer width={window.innerWidth / 3} height={250}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" stackId="a" fill={colors.lime[500]} />
        {/* <Bar dataKey="unresolved" stackId="a" fill="#8884d8" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartExample;
