const Table = ({ columns = [], data = [] }) => {
    
    // Fungsi Helper untuk memformat nilai kosong menjadi dash (—)
    const formatCellValue = (value) => {
        // Cek jika nilai adalah null, undefined, atau string kosong
        if (value === null || value === undefined || value === "") {
            return '—'; 
        }
        
        // Cek jika nilai adalah NaN (umum terjadi pada integer/float yang nullable)
        if (typeof value === 'number' && isNaN(value)) {
             return '—';
        }
        
        // Jika nilai adalah boolean, tampilkan sesuai status (misalnya, untuk Paid Status jika digunakan)
        if (typeof value === 'boolean') {
             return value ? 'Yes' : 'No';
        }

        // Jika bukan salah satu di atas, kembalikan nilai aslinya
        return value;
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.accessor}
                                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                {columns.map((col) => (
                                    <td key={col.accessor} className="px-6 py-4 text-sm text-gray-800">
                                        {/* ✅ PERBAIKAN: Terapkan formatCellValue pada nilai sel */}
                                        {col.cell 
                                            ? col.cell(item[col.accessor], item) 
                                            : formatCellValue(item[col.accessor])
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Table;