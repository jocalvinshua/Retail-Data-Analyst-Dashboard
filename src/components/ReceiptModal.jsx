import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext/AppContext';
import { X } from 'lucide-react'; 

export default function ReceiptModal({ isOpen, onClose, transactionId }) {
    // Menggunakan fetchTransactionReceipt dari context
    const { fetchTransactionReceipt } = useAppContext(); 
    
    const [receiptData, setReceiptData] = useState(null);
    const [loadingReceipt, setLoadingReceipt] = useState(false);
    const [errorReceipt, setErrorReceipt] = useState(null);

    // --- Fetch Data Struk Saat Modal Dibuka ---
    useEffect(() => {
        if (isOpen && transactionId) {
            const fetchDetail = async () => {
                setLoadingReceipt(true);
                setErrorReceipt(null);
                setReceiptData(null); // Reset data saat membuka

                try {
                    const data = await fetchTransactionReceipt(transactionId); 
                    setReceiptData(data);
                } catch (err) {
                    setErrorReceipt("Gagal memuat detail struk.");
                    console.error("Fetch Receipt Error:", err);
                } finally {
                    setLoadingReceipt(false);
                }
            };
            fetchDetail();
        } else if (!isOpen) {
            setReceiptData(null);
        }
    }, [isOpen, transactionId, fetchTransactionReceipt]); 

    if (!isOpen) return null;

    // --- Logic untuk Mengambil Detail dan Menghitung Total ---
    const grandTotal = receiptData ? receiptData.reduce((sum, item) => sum + parseFloat(item.price_total), 0) : 0;
    
    // Asumsi: Kita hanya perlu detail header dari baris pertama
    const firstItem = receiptData && receiptData.length > 0 ? receiptData[0] : {};
    
    // Ekstraksi data
    const dateKey = firstItem.date_key || 'N/A';
    const storeKey = firstItem.store_key || 'N/A';
    const rawPromotionKey = firstItem.promotion_key; 
    
    // ✅ TAMBAHAN: Ambil customer_key
    const customerKey = firstItem.customer_key || 'N/A'; 
    
    // Penanganan kondisional untuk Promotion Key (0, null, atau undefined -> '-')
    const displayPromotionKey = (rawPromotionKey === null || rawPromotionKey === undefined || rawPromotionKey === 0 || rawPromotionKey === '') 
        ? '-' 
        : rawPromotionKey;
    

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            {/* Konten Modal */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-6 h-6" />
                </button>

                <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                    Struk Transaksi #{transactionId}
                </h3>

                {loadingReceipt && <p className="text-center py-8">Memuat detail transaksi...</p>}
                {errorReceipt && <p className="text-center text-red-500 py-8">{errorReceipt}</p>}
                
                {receiptData && !loadingReceipt && (
                    <div className="space-y-4 w-full">
                        {/* Header Transaksi */}
                        <div className="text-sm mb-4 border-b pb-2">
                            <p><strong>Tanggal:</strong> {dateKey}</p>
                            <p><strong>Store Key:</strong> {storeKey}</p>
                            {/* ✅ CUSTOMER KEY DITAMBAHKAN */}
                            <p><strong>Customer Key:</strong> {customerKey}</p> 
                            <p><strong>Promotion Key:</strong> {displayPromotionKey}</p>
                            <p>-----------------------------------</p>
                        </div>

                        {/* Detail Item Header */}
                        <div className="flex justify-between font-semibold text-sm mb-2">
                            <span className="w-1/2">ITEM</span>
                            <span className="w-1/4 text-right">HARGA/UNIT</span>
                            <span className="w-1/4 text-right">TOTAL</span>
                        </div>
                        
                        {/* Detail Item List */}
                        <ul className="space-y-1 text-sm border-b pb-2">
                            {receiptData.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                    <span className="w-1/2">{item.product_name}</span>
                                    <span className="w-1/4 text-right">{item.unit_quantity} x ${parseFloat(item.unit_price).toFixed(2)}</span>
                                    <span className="w-1/4 text-right">${parseFloat(item.price_total).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Total */}
                        <div className="pt-4 flex justify-between text-lg font-bold">
                            <span>GRAND TOTAL:</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="text-center text-xs pt-8 text-gray-500">
                            Terima Kasih Atas Kunjungan Anda!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}