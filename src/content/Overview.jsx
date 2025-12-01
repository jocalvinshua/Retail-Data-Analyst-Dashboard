import { useMemo } from "react";
import { Package } from "lucide-react";
import { useAppContext } from "../AppContext/AppContext.jsx";
import KpiSection from "../components/KPISection.jsx";

import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";

import InventoryTrendline from "./InventoryTrendline.jsx";
import FactlessFact from "./FactlessFact.jsx";

const Overview = () => {
    const {
        salesData = [],
        topProducts = [],
        categoryBreakdown = [],
        isLoading,
        selectedCategory,
        setSelectedCategory,
        allCategories = [],
        selectedStoreKey,
        setSelectedStoreKey,
    } = useAppContext();

    // Store keys options (static for now)
    const storeKeys = [101, 102, 103];

    // Memoized category list
    const categories = useMemo(() => {
        return allCategories.length ? ["All", ...allCategories] : ["All"];
    }, [allCategories]);

    // Memoized chart data to avoid unnecessary re-renders
    const currentChartData = useMemo(() => categoryBreakdown, [categoryBreakdown]);

    // Early return if loading
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-3/4">
                <p className="text-xl font-semibold text-blue-600 animate-pulse">
                    Loading Dashboard Data... 📊
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Page Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
                <p className="text-gray-600 mt-1">Your retail performance at a glance</p>
            </div>

            {/* KPI Section */}
            <KpiSection />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* ============================ */}
                {/* Revenue by Category Chart     */}
                {/* ============================ */}
                
                <div className="bg-white rounded-xl shadow-md p-6 col-span-1 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">
                            Revenue by Category per Month (Store: {selectedStoreKey})
                        </h3>

                        <div className="flex space-x-3">

                            {/* Store Dropdown */}
                            <select
                                value={selectedStoreKey}
                                onChange={(e) => setSelectedStoreKey(Number(e.target.value))}
                                className="px-3 py-2 border rounded-lg text-sm shadow-sm"
                            >
                                {storeKeys.map((key) => (
                                    <option key={key} value={key}>
                                        Store {key}
                                    </option>
                                ))}
                            </select>

                            {/* Category Dropdown */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2 border rounded-lg text-sm shadow-sm"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Chart Display */}
                    {!currentChartData.length ? (
                        <p className="text-gray-500 italic">
                            No data available for {selectedCategory} at Store {selectedStoreKey}.
                        </p>
                    ) : (
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={currentChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month_name" />
                                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                                <Tooltip
                                    labelFormatter={(l) => `Month: ${l}`}
                                    formatter={(v) => `$${v.toLocaleString()}`}
                                />
                                <Legend />
                                <Bar
                                    dataKey="total_revenue"
                                    fill="#3b82f6"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* ============================ */}
                {/* Inventory Trendline */}
                {/* ============================ */}
                <div className="bg-white rounded-xl shadow-md p-6 col-span-1 lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Inventory TrendLine Overview (Semi addictive)
                    </h3>
                    <InventoryTrendline />
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 col-span-1 lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                        Factless Fact Overview
                    </h3>
                    <FactlessFact />
                </div>

                {/* ============================ */}
                {/* Top Products */}
                {/* ============================ */}
                <div className="bg-white rounded-xl shadow-md p-6 col-span-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <Package className="mr-2 text-blue-600" size={20} />
                        Top Products
                    </h3>

                    {!topProducts.length ? (
                        <p className="text-gray-500 italic">No product data available.</p>
                    ) : (
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div
                                    key={product.product_key}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-bold">
                                            {index + 1}
                                        </div>

                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {product.product_name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {product.total_units_sold.toLocaleString()} Units
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right font-bold">
                                        {(product.total_revenue / 1000).toFixed(1)}K
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Overview;
