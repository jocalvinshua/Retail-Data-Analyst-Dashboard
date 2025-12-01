import { useAppContext } from "../AppContext/AppContext.jsx";
import Table from "../components/Table.jsx";

const DateDimention = () => {
  // PERBAIKAN: Menggunakan nama kolom yang sesuai dengan skema DB (snake_case)
  const columns = [
    { header: "Date Key", accessor: "date_key" },
    { header: "Full Date", accessor: "full_date" },           
    { header: "Year", accessor: "year" },     
    { header: "Month", accessor: "month_name" },         
    { header: "Day", accessor: "day_name" }, 
    { header: "Day Number", accessor: "day_number" },
    { header: "Is Weekend", accessor: "is_weekend" },  
    { header: "Is Holiday", accessor: "is_holiday" },  
    { header: "Holiday", accessor: "holiday_name" },   
    { header: "Fiscal Year", accessor: "fiscal_year" },
    { header: "Fiscal Quarter", accessor: "quarter_number" },  

  ];

  const { date, isLoading } = useAppContext();

  if (isLoading && !date.length) {
    return <p className="text-center text-xl text-blue-500">Loading date Data...</p>;
  }
  
  if (!date || date.length === 0) {
    return <p className="text-center text-xl text-gray-500">No date date Data Available.</p>;
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Date Dimention</h2>
      </div>

      <div className="flex justify-center">
        <Table columns={columns} data={date} />
      </div>
    </>
  );
};

export default DateDimention;