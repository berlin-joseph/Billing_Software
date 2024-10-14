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
import {
  ShoppingCartOutlined,
  TagsOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useGetCategoryQuery } from "../Redux/Api/categoryApi";
import { useGetProductsQuery } from "../Redux/Api/productApi";

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
};

const Dashboard = () => {
  const [filter, setFilter] = useState("daily");
  const [dateRange, setDateRange] = useState([null, null]);

  const { data: categoryData } = useGetCategoryQuery();
  const { data: productData } = useGetProductsQuery();

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const cardData = [
    {
      id: 1,
      name: "Total Products",
      data: productData?.data?.length ?? 0,
      icon: <ShoppingCartOutlined />,
    },
    {
      id: 2,
      name: "Total Categories",
      data: categoryData?.data?.length ?? 0,
      icon: <TagsOutlined />,
    },
    { id: 3, name: "Daily Sales", data: 456, icon: <DollarOutlined /> },
    { id: 4, name: "Total Sales", data: 12456, icon: <DollarOutlined /> },
  ];

  return (
    <div className="w-[95%] m-5">
      {/* USER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardData.map((data) => (
          <div
            key={data.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div className=" flex gap-3 items-center">
              <div className="text-3xl text-blue-600 mb-3">{data.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {data.name}
              </h3>
            </div>
            <p className="text-2xl text-blue-600 font-bold">{data.data}</p>
          </div>
        ))}
      </div>

      {/* SALES CHART */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Sales Report</h2>
          <div className="flex items-center">
            <Select
              value={filter}
              onChange={handleFilterChange}
              style={{ width: 120 }}
              className="mr-2"
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
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderRadius: 8 }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4a90e2"
              strokeWidth={2}
              dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BOTTOM CHART */}
      <div className="w-full h-[500px] bg-white rounded-lg shadow-lg"></div>
    </div>
  );
};

export default Dashboard;
