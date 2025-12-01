import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState("overview");

    const [revenue, setRevenue] = useState(0);
    const [salesData, setSalesData] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [profitMargin, setProfitMargin] = useState(0);
    const [topProducts, setTopProducts] = useState([]);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [inventory, setinventory] = useState([]);
    const [inventoryTrendline, setInventoryTrendline] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("Toys");  // Toys menjadi default
    const [selectedStoreKey, setSelectedStoreKey] = useState(101); // Store Key default
    const [categoryBreakdown, setCategoryBreakdown] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [unsoldProduct, setUnsoldProduct] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [receipt, setReceipt] = useState([]); // Dipertahankan untuk penggunaan global jika ada
    const [snapshotData, setSnapshotData] = useState([]);
    const [accumulation, setAccumulation] = useState([]);
    const [shippingTime, setShippingTIme] = useState([]);
    const [date, setDate] = useState([]);

    // Filter States
    const [productKey, setProductKey] = useState("");
    const [storeKey, setStoreKey] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [promotionKey, setPromotionKey] = useState(null); // Ubah default ke null agar tidak langsung fetch
    
    // ✅ BARU: State untuk menampung hasil Factless Fact
    const [factless, setFactless] = useState([]) 

    const [isLoading, setIsLoading] = useState(true);
    const [promotionSummary, setPromotionSummary] = useState([]);
    const [triggerFetch, setTriggerFetch] = useState(0); 
    const [isUpdate, setIsUpdate] = useState(false)

// ----------------------------------------------------------------------
// FETCH FUNCTIONS
// ----------------------------------------------------------------------

    const fetchDateDimention = async () => {
        try {
            const {data, error} = await supabase.from("dim_date").select("*").limit(100);
            if (error) throw error;
            setDate(data || []);
        } catch (error) {
            console.error("Error fetching date dimension:", error.message);
        }
    }

    const fetchAvgShippingTime = async () => {
        try {
            const {data, error} = await supabase.rpc("get_avg_shipment_lag_by_warehouse");
            if (error) throw error;
            setShippingTIme(data || []);
        } catch (error) {
            console.error("Error fetching average shipping time:", error.message);
        }
    }

    const fetchAccumulationFact = async () => {
        try {
            const {data, error} = await supabase.from("accumulation_fact").select("*");
            if (error) throw error;
            setAccumulation(data || []);
        } catch (error) {
            console.error("Error fetching accumulation fact:", error.message);
        }
    }

    const fetchUnsoldProducts = async (dateKey) => {
        const dateKeyInt = Number(dateKey);
        
        // ✅ Perbaikan: Keluar segera jika input tidak valid dan reset state
        if (!dateKeyInt || dateKeyInt.toString().length !== 8) {
            console.warn("Invalid date key provided for unsold products fetch.");
            setFactless([]); 
            return; 
        }

        try {
            const { data, error } = await supabase.rpc("get_unsold_products_by_date", {
                p_date_key: dateKeyInt,
            });

            if (error) throw error;
            
            console.log(`Unsold products for ${dateKey}: ${data.length}`);
            setFactless(data || []);

        } catch (error) {
            console.error("Error fetching unsold products:", error.message);
            setFactless([]); // Reset state jika terjadi error
        }
    };

    const fetchRecentSnapshots = async () => {
        try {
            const {data, error} = await supabase.from("snapshot_inventory").select("*").limit(10).order("date_key", {ascending: false});
            if (error) throw error;
            setSnapshotData(data || []);    
        } catch (error) {
            console.error("Error fetching recent snapshots:", error.message);
        }
    };

    const fetchSnapshotTrigger = async (setExternalMessage) => {
            setIsUpdate(false); 
            try {
                const {error} = await supabase.rpc('trigger_inventory_snapshot');
                if(error) throw error;
                
            } catch (error) {
                console.error("Error triggering snapshot:", error.message);
            } finally{
                setIsUpdate(true); 
                setTriggerFetch(prev => prev + 1); 
                setTimeout(() => setExternalMessage(''), 5000); 
            }
        }

        const fetchTransactionReceipt = async (transactionId) => {
            try {
                const {data, error} = await supabase.rpc("get_receipt_detail", {
                    p_transaction_id: transactionId || null,
                });
                if (error) throw error;
                return data || []; 
                
            } catch (error) {
                console.error("Error fetching transaction receipt:", error.message);
                throw error; 
            }
        }

        const fetchTransactionTable = async ()=>{
            try {
                const {data, error} = await supabase.rpc("get_transaction")
                if (error) throw error;
                setTransaction(data || []); 
            } catch (error) {
                console.error("Error fetching transaction table:", error.message);
            }
        }

        const fetchUnsoldProductInPromotion = async () =>{
            if (!promotionKey) return setUnsoldProduct([]);

            try {
                const {data, error} = await supabase.rpc("get_unsold_product_in_promotion",{
                    p_promotion_key: promotionKey,
                });
                if (error) throw error;
                setUnsoldProduct(data || []);
            } catch (error) {
                console.error("Error fetching unsold products in promotions:", error.message);
            }
        }

        const fetchInventoryTrendline = async () => {
            try {
                const productKeyInt = Number(productKey) || 2001;
                const storeKeyInt = Number(storeKey) || 101;
                
                const startDateInt =
                    startDate ? Number(startDate.replace(/-/g, "")) : 20250101;

                const endDateInt =
                    endDate ? Number(endDate.replace(/-/g, "")) : 20250131;
                
                const { data, error } = await supabase.rpc("get_snapshot_stock_trendline", {
                    p_product_key: productKeyInt,
                    p_store_key: storeKeyInt,
                    p_start_date: startDateInt,
                    p_end_date: endDateInt,
                });
                
                if (error) throw error;
                setInventoryTrendline(data || []);
                
            } catch (error) {
                console.error("Error fetching inventory trendline:", error.message);
            }
        };


        const fetchAllCategories = async () => {
            try {
                const { data, error } = await supabase.rpc("get_all_product_categories");
                if (error) throw error;

                const categories = data.map(item => item.category_name);
                setAllCategories(categories || []);
            } catch (error) {
                console.error("Error fetching all categories:", error.message);
                setAllCategories([]);
            }
        };

        const fetchStoreRevenue = async () => {
            try {
                const { data, error } = await supabase.rpc("get_store_monthly_revenue_by_category", {
                    p_store_key: selectedStoreKey,
                    p_category: selectedCategory,
                });
                if (error) throw error;

                setCategoryBreakdown(data || []);
            } catch (error) {
                console.error("Error fetching category breakdown:", error.message);
            }
        };

        const fetchInventoryinventory = async () => {
            try {
                const { data, error } = await supabase
                    .from("inventory_fact")
                    .select("date_key, product_key, store_key, beginning_stock, ending_stock, outbound_quantity, inbound_quantity, inventory_key")
                    .limit(10)
                    .order("date_key", { ascending: false });

                if (error) throw error;
                setinventory(data || []);
            } catch (error) {
                console.error("Error fetching inventory inventory:", error.message);
            }
        };

        const fetchTotalCustomers = async () => {
            try {
                const { data, error } = await supabase.rpc("get_total_customers");
                if (error) throw error;
                setTotalCustomers(data || 0);
            } catch (error) {
                console.error("Error fetching total customers:", error.message);
            }
        };

        const fetchTopProducts = async () => {
            try {
                const { data, error } = await supabase.rpc("get_top_5_selling_products");
                if (error) throw error;
                setTopProducts(data || []);
            } catch (error) {
                console.error("Error fetching top products:", error.message);
                setTopProducts([]);
            }
        };

        const fetchTotalOrders = async () => {
            try {
                const { data, error } = await supabase.rpc("get_total_units_sold");
                if (error) throw error;
                setTotalOrders(data || 0);
            } catch (error) {
                console.error("Error fetching total units sold:", error.message);
            }
        };

        const fetchSalesData = async () => {
            try {
                const { data, error } = await supabase.rpc("get_monthly_revenue");
                if (error) throw error;
                setSalesData(data || []);
            } catch (error) {
                console.error("Failed to fetch sales data:", error.message);
                setSalesData([]);
            }
        };

        const fetchPromotionSummary = async () => {
            try {
                const { data, error } = await supabase.rpc("get_promotion_summary");
                if (error) throw error;
                setPromotionSummary(data || []);
            } catch (error) {
                console.error("Failed to fetch promotion summary:", error.message);
                setPromotionSummary([]);
            }
        };

        const fetchRevenue = async () => {
            try {
                const { data, error } = await supabase.rpc("get_total_revenue");
                if (error) throw error;
                setRevenue(data || 0);
            } catch (error) {
                console.error("Error fetching revenue:", error.message);
            }
        };

        const fetchProfitMargin = async () => {
            try {
                const { data, error } = await supabase.rpc("get_total_profit_margin");
                if (error) throw error;
                setProfitMargin(data || 0);
            } catch (error) {
                console.error("Error fetching profit margin:", error.message);
            }
        };


// ----------------------------------------------------------------------
// USE EFFECTS
// ----------------------------------------------------------------------

    // Initial Data Load (Memuat semua data awal)
    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    fetchRevenue(),
                    fetchPromotionSummary(),
                    fetchSalesData(),
                    fetchTotalOrders(),
                    fetchProfitMargin(),
                    fetchTopProducts(),
                    fetchTotalCustomers(),
                    fetchInventoryinventory(),
                    fetchAllCategories(),
                    fetchTransactionTable(),
                    fetchRecentSnapshots(),
                    fetchAccumulationFact(),
                    fetchAvgShippingTime(),
                    fetchDateDimention(),
                ]);
            } catch (error) {
                console.error("Initialization failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, []);

    // Re-fetch category breakdown and promotions (Dipicu oleh filter state)
    useEffect(() => {
        if (!isLoading) {
            fetchStoreRevenue();
            fetchUnsoldProductInPromotion(); 
        }
    }, [selectedCategory, promotionKey, isLoading, selectedStoreKey]); // ✅ selectedStoreKey ditambahkan

    // Re-fetch trendline (Dipicu oleh triggerFetch manual)
    useEffect(() => {
        if (!isLoading && triggerFetch > 0) {
            console.log("Refetching inventory trendline data via button click...");
            fetchInventoryTrendline(); 
        }
    }, [triggerFetch, isLoading]);


// ----------------------------------------------------------------------
// CONTEXT VALUE
// ----------------------------------------------------------------------

    const contextValue = {
        // Functions
        fetchTransactionReceipt,
        fetchDateDimention,
        fetchRecentSnapshots,
        fetchSnapshotTrigger,
        fetchUnsoldProducts, // ✅ Function Factless Fact
        fetchInventoryinventory,
        fetchTotalCustomers,
        fetchTopProducts,
        fetchTotalOrders,
        fetchSalesData,
        fetchPromotionSummary,
        fetchRevenue,
        fetchProfitMargin,
        fetchStoreRevenue,
        fetchAllCategories,
        fetchInventoryTrendline,
        fetchUnsoldProductInPromotion,
        fetchTransactionTable,
        fetchAccumulationFact,
        fetchAvgShippingTime,

        // Data States
        accumulation,
        date,
        shippingTime,
        factless, // ✅ Data Factless Fact
        snapshotData,
        isUpdate,
        inventory,
        totalCustomers,
        topProducts,
        isLoading,
        revenue,
        activeTab,
        profitMargin,
        setActiveTab,
        salesData,
        totalOrders,
        categoryBreakdown,
        promotionSummary,
        allCategories,
        inventoryTrendline,
        unsoldProduct,
        transaction,
        receipt,

        // Filter States
        productKey,
        setProductKey,
        storeKey,
        setStoreKey,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        promotionKey,
        setPromotionKey,

        selectedCategory,
        setSelectedCategory,
        selectedStoreKey, // ✅ Dipindahkan ke Context Value
        setSelectedStoreKey, // ✅ Dipindahkan ke Context Value
        setTriggerFetch,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);