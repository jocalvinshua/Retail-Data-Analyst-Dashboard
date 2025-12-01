import { useAppContext } from "../AppContext/AppContext.jsx";
import Table from "../components/Table.jsx";
import UpdateSnapshotButton from "../components/UpdateSnapshotButton.jsx";
const InventoryFacts = () => {
    const { snapshotData } = useAppContext();

    const columns = [
        { header: "ID", accessor: "snapshot_key" }, 
        { header: "Date Key", accessor: "date_key" },
        { header: "Product Key", accessor: "product_key" },
        { header: "Store Key", accessor: "store_key" }, 
        { header: "Onhand Quantity", accessor: "on_hand_quantity" },
    ];

    return (
        <>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Inventory Snapshot Table</h2>
                <p className="text-gray-600 mt-1">Snapshot Table 2 hari Kebelakang</p>
            </div>

            <div className="mb-8">
                <UpdateSnapshotButton />
            </div>

            {snapshotData && snapshotData.length > 0 ? (
                <Table columns={columns} data={snapshotData} />
            ) : (
                <p className="text-gray-500 italic">Memuat data atau tidak ada snapshot 2 hari terakhir.</p>
            )}
        </>
    );
};

export default InventoryFacts;