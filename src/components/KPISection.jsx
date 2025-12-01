import React from "react";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useAppContext } from "../AppContext/AppContext.jsx";

const KpiCard = ({ title, value, icon, color, change }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between mb-2">
      <div className={`p-2 bg-${color}-100 rounded-lg`}>{icon}</div>
      <span className={`text-${color}-600 text-sm font-semibold`}>{change}</span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

const KpiSection = () => {
  const { revenue, metrics, profitMargin , totalOrders, isLoading, totalCustomers } = useAppContext(); // ✅ lowercase

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-lg font-semibold text-blue-600 animate-pulse">
          Loading KPI Data... 💹
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KpiCard
        title="Total Revenue (Supabase)"
        value={
          revenue
            ? revenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })
            : "$0"
        }
        icon={<DollarSign className="text-green-600" size={24} />}
        color="green"
      />
      <KpiCard
        title="Total Orders (Supabase)"
        value={`${totalOrders.toLocaleString()} Units`}
        icon={<ShoppingCart className="text-blue-600" size={24} />}
        color="blue"
      />
      <KpiCard
        title="Profit Margin Percentage (Supabase)"
        value={profitMargin ? `${profitMargin.toFixed(2)}%` : "0%"}
        icon={<TrendingUp className="text-purple-600" size={24} />}
        color="purple"
      />
      <KpiCard
        title="Active Customers (Supabase)"
        value={totalCustomers.toLocaleString()}
        icon={<Users className="text-orange-600" size={24} />}
        color="orange"
      />
    </div>
  );
};

export default KpiSection;
