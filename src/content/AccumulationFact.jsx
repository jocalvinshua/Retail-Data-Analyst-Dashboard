import React from "react";
import { useAppContext } from "../AppContext/AppContext";
import Table from "../components/Table.jsx";
import ShippingChart from "../components/ShippingChart.jsx";

const AccumulationFact = () => {
    const { accumulation = [], isLoading } = useAppContext();

    // --- Helper to format cell values ---
    const formatCellValue = (value) => {
        if (value === null || value === undefined || value === "" || (typeof value === "number" && isNaN(value))) {
            return "—";
        }
        return value;
    };

    // --- Table Column Config ---
    const columns = [
        { header: "Key", accessor: "accumulation_key" },
        { header: "Transaction ID", accessor: "transaction_id" },
        { header: "Customer Key", accessor: "customer_key" },
        { header: "Warehouse Key", accessor: "warehouse_key" },
        { header: "Placed Date", accessor: "date_placed_key" },
        { header: "Paid Date", accessor: "date_paid_key" },
        { header: "Status", accessor: "current_status" },
        { header: "Shipped Date", accessor: "date_shipped_key" },
        { header: "Delivered Date", accessor: "date_delivered_key" },
        { header: "Days To Ship", accessor: "days_to_ship" },
        { header: "Days To Deliver", accessor: "days_to_deliver" },
    ];

    // --- Loading ---
    if (isLoading && accumulation.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-xl font-semibold text-blue-500 animate-pulse">
                    Loading Accumulation Fact Data...
                </p>
            </div>
        );
    }

    // --- Empty State ---
    if (accumulation.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-xl text-gray-500 italic">
                    No Accumulation Fact Data Available.
                </p>
            </div>
        );
    }

    // --- Render Content ---
    return (
        <>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Accumulation Fact</h2>
                <p className="text-gray-600 mt-1">Monitoring the shipping lifecycle performance</p>
            </div>

            {/* Chart Section */}
            <div className="p-6 mb-8">
                <ShippingChart />
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Accumulation Fact Table</h3>
                <div className="flex justify-center overflow-x-auto">
                    <Table 
                        columns={columns}
                        data={accumulation}
                        formatCellValue={formatCellValue}
                    />
                </div>
            </div>
        </>
    );
};

export default AccumulationFact;
