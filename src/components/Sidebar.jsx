import React from "react";
import { 
  BarChart3, Truck, DollarSign, Users, CalendarDays, Package, Scan 
} from "lucide-react";
import {useAppContext} from "../AppContext/AppContext.jsx"
const Sidebar = () => {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <div className="relative w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <BarChart3 size={32} className="text-blue-300" />
          <h1 className="text-2xl font-bold">RetailDW</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <SidebarButton
            icon={<BarChart3 size={20} />}
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          {/* <SidebarButton
            icon={<Package size={20} />}
            label="Fact Sales"
            active={activeTab === "factTable"}
            onClick={() => setActiveTab("factTable")}
          /> */}
          <SidebarButton
            icon={<CalendarDays size={20} />}
            label="Date Dimention"
            active={activeTab === "dateDimention"}
            onClick={() => setActiveTab("dateDimention")}
          />
          <SidebarButton
            icon={<DollarSign size={20} />}
            label="Promotion Fact"
            active={activeTab === "promotion"}
            onClick={() => setActiveTab("promotion")}
          />
          <SidebarButton
            icon={<Scan size={20}/>}
            label="Inventory Snapshot"
            active={activeTab === "snapshot"}
            onClick={() => setActiveTab("snapshot")}
          />
          <SidebarButton
            icon={<Truck size={20}/>}
            label="Accumulation Fact"
            active={activeTab === "Accumulation Fact"}
            onClick={() => setActiveTab("Accumulation Fact")}
          /> 
        </nav>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-6 border-t border-blue-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-blue-300">admin@retail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable sidebar button
const SidebarButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
      active ? "bg-blue-700 shadow-lg" : "hover:bg-blue-800"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default Sidebar;
