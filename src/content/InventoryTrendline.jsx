import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { useAppContext } from "../AppContext/AppContext.jsx"; 

// ... (productOptions, storeOptions, formatXAxis, FilterControls tetap sama) ...

const productOptions = [
    { key: "2001", name: "Product 2001" },
    { key: "2002", name: "Product 2002" },
    { key: "2003", name: "Product 2003" },
    { key: "2004", name: "Product 2004" },
    { key: "2005", name: "Product 2005" },
    { key: "2006", name: "Product 2006" },
    { key: "2007", name: "Product 2007" },
    { key: "2008", name: "Product 2008" },
    { key: "2009", name: "Product 2009" },
    { key: "2010", name: "Product 2010" },
];

const storeOptions = [
    { key: "101", name: "Store 101" },
    { key: "102", name: "Store 102" },
    { key: "103", name: "Store 103" },
];

const formatXAxis = (tickItem) => {
    if (tickItem && tickItem.toString().length === 8) {
        const s = tickItem.toString();
        return `${s.slice(6, 8)}/${s.slice(4, 6)}`;
    }
    return tickItem;
};

const FilterControls = () => {
    const {
        productKey,
        setProductKey,
        storeKey,
        setStoreKey,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        setTriggerFetch 
    } = useAppContext();

    const handleUpdateClick = () => {
        if (setTriggerFetch) {
            setTriggerFetch(prev => prev + 1); 
        }
    }
    const inputStyle = { padding: "8px", marginLeft: "5px", width: '100%', boxSizing: 'border-box' };
    
    const filterContainerStyle = {
        display: "flex", 
        gap: "15px", 
        alignItems: "flex-end",
        marginBottom: "20px", 
        padding: "15px", 
        border: "1px solid #ddd", 
        borderRadius: "8px",
        flexWrap: 'wrap', 
    };

    const filterGroupStyle = { 
        display: 'flex', 
        flexDirection: 'column', 
        minWidth: '150px', 
        flexGrow: 1, 
    };
    return (
        <div style={filterContainerStyle}>
            {/* Product */}
            <div style={filterGroupStyle}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Product:</label>
                <select
                    value={productKey}
                    onChange={(e) => setProductKey(e.target.value)}
                    style={{ ...inputStyle, minWidth: '150px' }} 
                >
                    {productOptions.map((p) => (
                        <option key={p.key} value={p.key}>{p.name}</option>
                    ))}
                </select>
            </div>
            {/* Store */}
            <div style={filterGroupStyle}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Store:</label>
                <select
                    value={storeKey}
                    onChange={(e) => setStoreKey(e.target.value)}
                    style={{ ...inputStyle, minWidth: '150px' }}
                >
                    {storeOptions.map((s) => (
                        <option key={s.key} value={s.key}>{s.name}</option>
                    ))}
                </select>
            </div>
            {/* Start Date */}
            <div style={filterGroupStyle}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ ...inputStyle, minWidth: '150px' }}
                />
            </div>
            {/* End Date */}
            <div style={filterGroupStyle}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ ...inputStyle, minWidth: '150px' }}
                />
            </div>
            {/* Update Button */}
            <button
                onClick={handleUpdateClick}
                style={{
                    padding: "8px 15px", 
                    height: "38px", 
                    backgroundColor: "#007bff",
                    color: "white", 
                    border: "none", 
                    cursor: "pointer", 
                    borderRadius: "4px",
                    alignSelf: 'flex-end', 
                    minWidth: '120px', 
                    flexShrink: 0, 
                }}
            >
                Update Chart
            </button>
        </div>
    );
};

export const InventoryTrendline = () => {
    const {
        inventoryTrendline,
        productKey,
        storeKey,
    } = useAppContext();

    const currentProduct =
        productOptions.find((p) => p.key === productKey)?.name || `Product Key: ${productKey}`;

    const currentStore =
        storeOptions.find((s) => s.key === storeKey)?.name || `Store Key: ${storeKey}`;

    const processedData = inventoryTrendline.map(item => ({
        ...item,
        date_key: item.date_key ? item.date_key.toString() : ''
    }));

    return (
        <div style={{ padding: "20px" }}> 
            <FilterControls /> 
            <hr />
            <h2>{`Stok Snapshot Harian (On-Hand): ${currentProduct} di ${currentStore}`}</h2>

            {inventoryTrendline?.length > 0 ? (
                <div style={{ width: "100%", height: 450 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            // ✅ MENGGUNAKAN DATA YANG SUDAH DIPROSES
                            data={processedData} 
                            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date_key" 
                                tickFormatter={formatXAxis}
                                label={{ value: "Tanggal (DD/MM)", position: "bottom" }}
                            />
                            <YAxis
                                label={{ value: "Stok On-Hand", angle: -90, position: "insideLeft" }}
                            />
                            <Tooltip labelFormatter={formatXAxis} />
                            <Legend layout="horizontal" verticalAlign="top" align="center" />
                            <Line
                                type="monotone"
                                dataKey="on_hand_quantity"
                                stroke="#17a2b8"
                                name="Stok On-Hand"
                                strokeWidth={3}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                    Data tidak tersedia. Pilih filter lalu klik **Update Chart**.
                </p>
            )}
        </div>
    );
};

export default InventoryTrendline;