import React, { useState } from "react";
import { useAppContext } from "../AppContext/AppContext.jsx"; 

const UpdateSnapshotButton = () => {
    const { fetchSnapshotTrigger } = useAppContext(); 
    
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpdate = async () => {
        setIsUpdating(true);
        await fetchSnapshotTrigger(setMessage); 
        setIsUpdating(false); 
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
            <h3>Pemicu Snapshot Inventori</h3>
            <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                style={{
                    padding: "10px 20px",
                    backgroundColor: isUpdating ? "#ccc" : "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: isUpdating ? "not-allowed" : "pointer",
                    fontSize: "16px"
                }}
            >
                {isUpdating ? 'Mengupdate...' : 'Trigger Snapshot Inventori'}
            </button>
            {message && <p style={{ 
                marginTop: '10px', 
                fontWeight: 'bold',
                color: message.startsWith('❌') ? 'red' : 'green' 
            }}>{message}</p>}
        </div>
    );
};

export default UpdateSnapshotButton;