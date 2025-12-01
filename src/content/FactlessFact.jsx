// factlessfact.jsx
import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext/AppContext.jsx";
import { ListX, Calendar, Search } from "lucide-react";

const FactlessFact = () => {
    // ✅ PERBAIKAN: Ekstrak factless (data state) dan fetchUnsoldProducts (function) dari context.
    const { factless, fetchUnsoldProducts, isLoading } = useAppContext(); 
    
    // ✅ PENGHAPUSAN: Hapus local state 'unsoldProducts' karena sekarang kita menggunakan 'factless' dari context
    // const [unsoldProducts, setUnsoldProducts] = useState([]);
    
    const [filterDate, setFilterDate] = useState("2025-01-01"); // Default date YYYY-MM-DD
    const [isFetching, setIsFetching] = useState(false);

    // Fungsi untuk mengonversi format YYYY-MM-DD menjadi YYYYMMDD (Integer)
    const formatDateToKey = (dateString) => {
        return dateString.replace(/-/g, "");
    };

    const handleFetch = async (e) => {
        if (e) e.preventDefault();
        
        const dateKey = formatDateToKey(filterDate);
        if (!dateKey) return;

        setIsFetching(true);
        try {
            // ✅ PERBAIKAN: Panggil function fetchUnsoldProducts dari context, 
            // biarkan function tersebut mengupdate state 'factless' secara global.
            await fetchUnsoldProducts(dateKey); 
            
        } catch (error) {
            console.error("Fetch failed in component:", error);
            // setUnsoldProducts([]); // Tidak diperlukan lagi
        } finally {
            setIsFetching(false);
        }
    };

    // Panggil fetch awal saat komponen dimuat
    useEffect(() => {
        if (!isLoading) {
            handleFetch();
        }
    }, [isLoading]);
    
    // Gunakan 'factless' dari context sebagai data yang ditampilkan
    const currentUnsoldProducts = factless;

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <p className="text-gray-600 mb-6">
                Daftar produk yang tidak memiliki catatan penjualan (Revenue = 0) pada tanggal yang dipilih.
            </p>

            {/* Filter Section */}
            <form onSubmit={handleFetch} className="flex space-x-4 mb-8 items-end">
                <div className="flex flex-col">
                    <label htmlFor="date-filter" className="text-sm font-medium text-gray-700 mb-1">
                        Pilih Tanggal (Date Key)
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="date"
                            id="date-filter"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isFetching || isLoading}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition duration-150"
                >
                    <Search className="mr-2 h-5 w-5" />
                    {isFetching ? "Mencari..." : "Cari Produk Tidak Terjual"}
                </button>
            </form>

            {/* Result Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Key
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isFetching || isLoading ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">Loading...</td>
                            </tr>
                        ) : currentUnsoldProducts.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-700 italic">
                                    Tidak ada produk tidak terjual pada **{filterDate}** atau tidak ada data ditemukan.
                                </td>
                            </tr>
                        ) : (
                            currentUnsoldProducts.map((product) => (
                                <tr key={product.product_key}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {product.product_key}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {product.product_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">
                                        {product.category}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FactlessFact;