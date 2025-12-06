# 🚀 Logistics Performance Dashboard (LPD)
This project represents an end-to-end implementation (ETL, Data Modeling, and Visualization) focused on analyzing and visualizing Logistics Performance, specifically Average Shipment Lag Time, across warehouse operations.

We established a Star Schema architecture to facilitate easy and efficient business intelligence, centering the analysis around the metric difference between the order placement time (date_placed) and the shipment time (date_shipped).

## Key Features
- Warehouse Performance Analysis: Visually displays the average time required for each warehouse to process and dispatch an order (Days to Ship).
- Intuitive Visualization: Uses a Bar Chart (Recharts) for straightforward, comparative analysis of performance between different warehouses.
- Solid Data Modeling: Implementation is based on an Accumulation Fact Table (accumulation_fact) which tracks the entire lifecycle of an order, ensuring all key milestone data is captured.
- Responsive Interface: Built using React.js and styled with Tailwind CSS for a modern and adaptable user experience.

## Architectural Structure (Data Model)
The project leverages a Star Schema model specifically tailored for Warehouse dimension analysis.
1. Dimensions
dim_warehouse: Contains static attributes about the location, type, and status of each warehouse (warehouse_key, warehouse_name, warehouse_region).
2. Facts
accumulation_fact: The primary fact table with transaction-level granularity. It accumulates all milestones and metrics from the start to the end of the order cycle.

Key Metrics:
  - total_revenue
  - total_cost
  - shipping_fee.

Lag Metrics:
  - days_to_ship
  - days_to_deliver

Connecting Keys:
  - warehouse_key
  - customer_key
  - date_placed_key, etc.

## 🛠️ Technologies Used
- Frontend => React.jsThe main library for building the user interface
- Styling => Tailwind
- Visualization => Recharts. A React charting library used to display the performance Bar ChartS
- Data/BackendSQL => (PostgreSQL/T-SQL). Used for defining the DW schema and executing the performance aggregation queries.

## 🤝 Contribution
Interested in contributing? Feel free to open an Issue or submit a Pull Request (PR) with any features or improvements you'd like to add!
