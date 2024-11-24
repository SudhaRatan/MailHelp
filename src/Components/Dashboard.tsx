/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { CartesianGrid } from "recharts";
import { BarChart, XAxis, YAxis, Legend, Bar, Tooltip } from "recharts";
import WeekRangeSwitcher, { DateRange } from "./WeeklyDateSwitcher";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../Constants/config";
import PercentagePieChart from "./PercentagePieChart";
import BarChartExample from "./BarchartEx";
import { generatePDF } from "../Utils/GeneratePdf";

function Dashboard() {
  const [data, setData] = useState<any>([]);
  const transformData = (inputData: any) => {
    // Create a map to aggregate data by label
    const aggregatedData = new Map();

    // Process each input item
    inputData.forEach((item: any) => {
      const label = item.label;
      if (!aggregatedData.has(label)) {
        aggregatedData.set(label, {
          name: label,
          unresolved: 0,
          resolved: 0,
        });
      }

      const current = aggregatedData.get(label);
      if (item.resolved === 0) {
        current.unresolved += item.Count;
      } else {
        current.resolved += item.Count;
      }
    });

    // Convert map to array
    return Array.from(aggregatedData.values());
  };

  const [weeklyRange, setWR] = useState<DateRange>();
  const getData = async () => {
    const res = await axios.post(API_URL + "/dashboard", {
      startDate: weeklyRange?.start,
      endDate: weeklyRange?.end,
    });
    setData(transformData(res.data.recordset));
    console.log(transformData(res.data.recordset));
  };

  useEffect(() => {
    getData();
  }, [weeklyRange]);

  return (
    <div className="flex-1 p-5 flex flex-wrap overflow-auto" id="Dashboard">
      <div className="flex w-full justify-between">
        <div className="text-xl">Dashboard</div>
        <WeekRangeSwitcher onRangeChange={(range) => setWR(range)} />
      </div>
      <div>
        <div className="text-lg font-semibold m-2">
          Weekly Email Status Chart
        </div>
        <BarChart
          width={window.innerWidth * 0.75}
          height={window.innerHeight * 0.3}
          data={data}
          barSize="20"
          barGap="5"
        >
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="resolved" fill="#8884d8" stackId="1" />
          <Bar dataKey="unresolved" fill="#82ca9d" stackId="2" />
        </BarChart>
      </div>

      <div>
        <PercentagePieChart data={data} />
      </div>
      <div>
        <BarChartExample
          data={data.map((i: any) => ({
            name: i.name,
            total: Number(i.resolved) + Number(i.unresolved),
          }))}
        />
      </div>
      <div
        className="btn btn-success absolute bottom-3 right-3"
        onClick={() => {
          generatePDF("Dashboard")
        }}
      >
        Download as PDF
      </div>
    </div>
  );
}

export default Dashboard;
