const metrics = {
  totalRevenue: 2847650,
  totalOrders: 15847,
  avgOrderValue: 179.67,
  activeCustomers: 8934,
};

const salesData = [
  { month: 'Jan', sales: 245000 },
  { month: 'Feb', sales: 289000 },
  { month: 'Mar', sales: 312000 },
  { month: 'Apr', sales: 298000 },
  { month: 'May', sales: 356000 },
  { month: 'Jun', sales: 387000 },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 1247, revenue: 124700 },
  { name: 'Smart Watch', sales: 983, revenue: 196600 },
  { name: 'Laptop Stand', sales: 856, revenue: 42800 },
  { name: 'USB-C Hub', sales: 745, revenue: 37250 },
  { name: 'Desk Lamp', sales: 623, revenue: 31150 },
];

const mockInventoryData = [
  { id: 'INV001', product: 'Wireless Headphones', category: 'Electronics', stock: 245, reorderPoint: 100, status: 'In Stock' },
  { id: 'INV002', product: 'Smart Watch', category: 'Electronics', stock: 67, reorderPoint: 80, status: 'Low Stock' },
  { id: 'INV003', product: 'Laptop Stand', category: 'Accessories', stock: 423, reorderPoint: 150, status: 'In Stock' },
  { id: 'INV004', product: 'USB-C Hub', category: 'Accessories', stock: 89, reorderPoint: 100, status: 'Low Stock' },
  { id: 'INV005', product: 'Desk Lamp', category: 'Furniture', stock: 12, reorderPoint: 50, status: 'Critical' },
  { id: 'INV006', product: 'Ergonomic Mouse', category: 'Accessories', stock: 334, reorderPoint: 120, status: 'In Stock' },
  { id: 'INV007', product: 'Mechanical Keyboard', category: 'Electronics', stock: 156, reorderPoint: 80, status: 'In Stock' },
  { id: 'INV008', product: 'Monitor Arm', category: 'Furniture', stock: 45, reorderPoint: 60, status: 'Low Stock' },
];

const snapshotData = {
  daily: [
    { date: 'Nov 4', orders: 234, revenue: 41890 },
    { date: 'Nov 5', orders: 267, revenue: 47956 },
    { date: 'Nov 6', orders: 289, revenue: 51897 },
    { date: 'Nov 7', orders: 245, revenue: 44015 },
    { date: 'Nov 8', orders: 312, revenue: 56044 },
    { date: 'Nov 9', orders: 298, revenue: 53522 },
    { date: 'Nov 10', orders: 278, revenue: 49956 },
  ],
  categoryBreakdown: [
    { category: 'Electronics', percentage: 45, revenue: 1281428 },
    { category: 'Accessories', percentage: 30, revenue: 854295 },
    { category: 'Furniture', percentage: 15, revenue: 427148 },
    { category: 'Office Supplies', percentage: 10, revenue: 284779 },
  ],
};

const mockPromotionData = [
  { id: 'PROMO001', name: 'Black Friday Sale', discount: '30%', startDate: '2024-11-24', endDate: '2024-11-30', revenue: 345600, orders: 1823 },
  { id: 'PROMO002', name: 'Cyber Monday', discount: '25%', startDate: '2024-11-27', endDate: '2024-11-28', revenue: 289400, orders: 1456 },
  { id: 'PROMO003', name: 'Holiday Bundle', discount: '20%', startDate: '2024-12-01', endDate: '2024-12-25', revenue: 567800, orders: 2134 },
  { id: 'PROMO004', name: 'New Year Special', discount: '15%', startDate: '2024-12-26', endDate: '2025-01-05', revenue: 423900, orders: 1789 },
  { id: 'PROMO005', name: 'Flash Sale', discount: '40%', startDate: '2024-11-15', endDate: '2024-11-15', revenue: 178900, orders: 945 },
];

const maxSales = Math.max(...salesData.map(d => d.sales));

export {
  metrics,
  salesData,
  topProducts,
  mockInventoryData,
  snapshotData,
  mockPromotionData,
  maxSales,
};
