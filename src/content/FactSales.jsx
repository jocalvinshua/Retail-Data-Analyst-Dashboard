import React, { useState } from "react"; 
import { useAppContext } from "../AppContext/AppContext";
import Table from "../components/Table.jsx";
import ReceiptModal from "../components/ReceiptModal.jsx"; // Import komponen Modal

export default function FactSales(){
    // Tambahkan state untuk mengelola modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);

    const { transaction, isLoading } = useAppContext();

    // --- Fungsi Handler ---
    const handleViewReceipt = (transactionId) => {
        // 1. Set ID transaksi yang dipilih
        setSelectedTransactionId(transactionId);
        // 2. Buka modal
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        // 1. Tutup modal
        setIsModalOpen(false);
        // 2. Reset ID transaksi yang dipilih
        setSelectedTransactionId(null);
    };

    // --- Kolom Tabel ---
    const columns = [
        { header: "Date Key", accessor: "date_key" },
        { header: "Transaction ID", accessor: "transaction_id" },
        { header: "Store Key", accessor: "store_key" },
        { header: "Total Units", accessor: "total_units" },
        { header: "Revenue", accessor: "total_revenue" },
        { 
            header: "Action", 
            accessor: "action",
            // Akses row data untuk mendapatkan transaction_id
            cell: (_, row) => ( 
                <button 
                    onClick={() => handleViewReceipt(row.transaction_id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    View Receipt
                </button>
            )
        },
    ]

    // --- Conditional Rendering (Loading/Empty State) ---
    if (isLoading && !transaction.length) {
        return <p className="text-center text-xl text-blue-500">Loading Fact Sales Data...</p>;
    }
    if (!transaction || transaction.length === 0) {
        return <p className="text-center text-xl text-gray-500">No Fact Sales Data Available.</p>;
    }


    // --- Render Komponen ---
    return(
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Transaction Table</h2>
            <p className="text-gray-600 mt-1">Transaksi Terbaru (10 Baris)</p>
          </div>

          <div className="flex justify-center">
            <Table columns={columns} data={transaction} />
          </div>
          
          {/* Tambahkan Modal di sini */}
          <ReceiptModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              transactionId={selectedTransactionId}
          />
        </>
    )
}