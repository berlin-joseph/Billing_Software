import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DatePicker, Select } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const salesData = {
  daily: [
    { name: "Mon", sales: 4000 },
    { name: "Tue", sales: 3000 },
    { name: "Wed", sales: 2000 },
    { name: "Thu", sales: 2780 },
    { name: "Fri", sales: 1890 },
    { name: "Sat", sales: 2390 },
    { name: "Sun", sales: 3490 },
  ],
  weekly: [
    { name: "Week 1", sales: 10000 },
    { name: "Week 2", sales: 15000 },
    { name: "Week 3", sales: 13000 },
    { name: "Week 4", sales: 20000 },
  ],
  monthly: [
    { name: "Jan", sales: 30000 },
    { name: "Feb", sales: 40000 },
    { name: "Mar", sales: 35000 },
    { name: "Apr", sales: 45000 },
  ],
  yearly: [
    { name: "2021", sales: 500000 },
    { name: "2022", sales: 600000 },
    { name: "2023", sales: 700000 },
  ],
};

const Dashboard = () => {
  const [filter, setFilter] = useState("daily");
  const [dateRange, setDateRange] = useState([null, null]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    // Logic to filter salesData based on dates can be added here
  };

  return (
    <div className="bg-white h-screen ml-[1%] p-[3%] flex flex-col">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Cards Section */}

        <div className="flex flex-wrap gap-4 w-full md:w-2/5">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 w-full sm:w-1/2 md:w-1/3 flex-grow">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl text-blue-600">1128</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 w-full sm:w-1/2 md:w-1/3 flex-grow">
            <h3 className="text-lg font-semibold">Total Categories</h3>
            <p className="text-3xl text-blue-600">32</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 w-full sm:w-1/2 md:w-1/3 flex-grow">
            <h3 className="text-lg font-semibold">Daily Sales</h3>
            <p className="text-3xl text-blue-600">456</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 w-full sm:w-1/2 md:w-1/3 flex-grow">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-3xl text-blue-600">12456</p>
          </div>
        </div>

        {/* Graph Section */}
        <div className="flex-grow md:w-3/5 p-4 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sales Report</h2>
            <div>
              <Select
                id="filter"
                value={filter}
                onChange={handleFilterChange}
                style={{ width: 100 }}
              >
                <Select.Option value="daily">Daily</Select.Option>
                <Select.Option value="weekly">Weekly</Select.Option>
                <Select.Option value="monthly">Monthly</Select.Option>
                <Select.Option value="yearly">Yearly</Select.Option>
              </Select>
              <RangePicker
                value={dateRange}
                onChange={handleDateChange}
                format="YYYY-MM-DD"
                className="ml-2"
              />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData[filter]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4a90e2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
