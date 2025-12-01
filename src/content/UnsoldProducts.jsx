import React from "react";
import { useAppContext } from "../AppContext/AppContext.jsx";
import Table from '../components/Table.jsx';
import { ArrowLeft } from 'lucide-react'; // ✅ Import ikon ArrowLeft dari 'lucide-react'

const UnsoldProducts = ({ promotionKey, promotionName, onBack }) => {
    // Ambil data produk yang tidak terjual dari context
    const { unsoldProduct, isLoading } = useAppContext();

    const columns = [
        { header: "Product Key", accessor: "product_key" },
        { header: "Product Name", accessor: "product_name" },
        { header: "Category", accessor: "product_category" },
    ];

    return (
        <div className="p-4 bg-white rounded-xl shadow-md">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    Produk Tidak Terjual (Factless Fact): {promotionName || `Promosi #${promotionKey}`}
                </h2>
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                    {/* ✅ Penggunaan ikon Lucide: ArrowLeft */}
                    <ArrowLeft className="w-4 h-4" /> 
                    Kembali ke Ringkasan
                </button>
            </div>
            
            <p className="text-gray-600 mb-4">
                Daftar produk yang tersedia di gudang/toko, tetapi tidak tercatat penjualannya selama promosi ini.
            </p>

            {/* Menampilkan data yang sudah difilter oleh AppContext */}
            {isLoading && <div className="text-center text-gray-500">Memuat data produk...</div>}
            
            {!isLoading && (unsoldProduct && unsoldProduct.length > 0 ? (
                <Table columns={columns} data={unsoldProduct} />
            ) : (
                <div className="text-center text-green-500 p-8 border border-dashed border-green-300 rounded-lg">
                    🎉 Semua produk terjual! Tidak ada produk yang tidak terjual pada promosi ini.
                </div>
            ))}
        </div>
    );
};

export default UnsoldProducts;