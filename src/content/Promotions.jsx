import React from "react";
import { useAppContext } from "../AppContext/AppContext.jsx";
import Table from "../components/Table.jsx";
import UnsoldProducts from "./UnsoldProducts.jsx";

const Promotion = () => {
    // Ambil promotionKey (untuk conditional rendering) dan setPromotionKey
    const { promotionSummary, isLoading, setPromotionKey, promotionKey } = useAppContext();

    // --- Fungsi Formatting ---
    const formatRevenue = (value) => {
        if (!value) return "0";
        return Math.round(value).toLocaleString("en-US"); 
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const d = new Date(dateStr); 
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = String(d.getFullYear()).slice(2);
        return `${day}/${month}/${year}`;
    };

    // --- Fungsi Aksi ---
    const handleDetail = (row) => {
        setPromotionKey(row.promotion_key); 
    };

    const handleBack = () => {
        setPromotionKey(null);
    };

    // --- Definisi Kolom ---
    const columns = [
        { header: "Promotion Key", accessor: "promotion_key" },
        // ... (kolom lain sama) ...
        { header: "Promotion Name", accessor: "promotion_name" },
        {
            header: "Start Date",
            accessor: "start_date",
            cell: (value) => formatDate(value),
        },
        {
            header: "End Date",
            accessor: "end_date",
            cell: (value) => formatDate(value),
        },
        {
            header: "Total Revenue ($)",
            accessor: "total_revenue",
            cell: (value) => formatRevenue(value),
        },
        {
            header: "Total Units Sold",
            accessor: "total_units_sold",
            cell: (value) => value.toLocaleString("en-US"),
        },
        {
            header: "Action",
            accessor: "action",
            cell: (_, row) => (
                <div className="flex justify-center">
                    <button
                        onClick={() => handleDetail(row)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Detail
                    </button>
                </div>
            ),
        },
    ];

    // --- Conditional Rendering ---
    if (isLoading) {
        return (
            <div className="text-center text-gray-500 mt-10">
                Loading promotion summary...
            </div>
        );
    }
    
    // 🚩 JIKA promotionKey ADA, TAMPILKAN DETAIL PRODUK TIDAK TERJUAL 🚩
    if (promotionKey) {
        // Ambil nama promosi yang sedang dilihat dari promotionSummary
        const currentPromotion = promotionSummary.find(p => p.promotion_key === promotionKey);
        
        return (
            <UnsoldProducts 
                promotionKey={promotionKey} 
                promotionName={currentPromotion?.promotion_name}
                onBack={handleBack} // Kirimkan fungsi kembali
            />
        );
    }

    // Tampilan Ringkasan Promosi (Default)
    if (!promotionSummary || promotionSummary.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">
                No promotion summary available.
            </div>
        );
    }

    return (
        <>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Promotion Summary</h2>
                <p className="text-gray-600 mt-1">
                    Total revenue and units sold per promotion
                </p>
            </div>

            <Table columns={columns} data={promotionSummary} />
        </>
    );
};

export default Promotion;