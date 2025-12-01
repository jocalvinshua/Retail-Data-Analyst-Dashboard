import React from 'react';
import { useAppContext } from "../AppContext/AppContext";
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

const ShippingChart = () => {
    // Mengambil data dan status loading dari context
    const { shippingTime, isLoading } = useAppContext(); 
    
    // Data yang akan digunakan adalah shippingTime
    const dataToUse = shippingTime;
    
    // Cek apakah data valid dan ada isinya
    const isDataAvailable = dataToUse && dataToUse.length > 0;

    // --- Loading dan Empty State Handling ---
    
    // 1. Sedang Loading
    if (isLoading && !isDataAvailable) {
        return <p className="text-center text-xl text-blue-500">Loading Average Shipping Time Data...</p>;
    }
    
    // 2. Data Kosong (setelah loading selesai atau saat inisialisasi)
    if (!isDataAvailable) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-md">
                 <p className="text-center text-xl text-gray-500">No Average Shipping Time Data Available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
               Average Shipping Time by Warehouse
            </h2>
            <p className="text-gray-600 mb-6">
                Rata-rata waktu (dalam hari) dari pesanan ditempatkan hingga dikirim.
            </p>

            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={dataToUse} // Data langsung dari context
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        
                        {/* Label Sumbu X: Nama Gudang (Data Key: warehouse_name) */}
                        <XAxis 
                            dataKey="warehouse_name" 
                            stroke="#555"
                            angle={-15} 
                            textAnchor="end"
                            height={60} 
                        />
                        
                        {/* Label Sumbu Y: Durasi (Hari) */}
                        <YAxis 
                            stroke="#555" 
                            label={{ value: 'Days to Ship (Avg)', angle: -90, position: 'insideLeft' }}
                        />
                        
                        {/* Tooltip saat kursor diarahkan */}
                        <Tooltip 
                            // Format nilai metrik
                            formatter={(value) => [`${value.toFixed(2)} Hari`, 'Rata-rata Lag']}
                            // Format label (warehouse_name)
                            labelFormatter={(label) => `Gudang: ${label}`}
                        />
                        
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        
                        {/* Bar Chart: Metrik (Data Key: average_shipment_lag_days) */}
                        <Bar 
                            dataKey="average_shipment_lag_days" 
                            name="Avg Days to Ship" 
                            fill="#4F46E5" 
                            label={{ 
                                position: 'top', 
                                formatter: (value) => value ? value.toFixed(1) : 'N/A'
                            }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ShippingChart;