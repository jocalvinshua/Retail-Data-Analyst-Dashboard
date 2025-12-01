import { useAppContext } from "./AppContext/AppContext";
import Overview from './content/Overview.jsx'
import DateDimention from "./content/DateDimention.jsx"
import Promotion from "./content/Promotions.jsx";
import InventorySnapshot from "./content/InventorySnapshot.jsx";
import Sidebar from './components/Sidebar.jsx'
import FactSales from './content/FactSales.jsx';
import AccumulationFact from "./content/AccumulationFact.jsx";

const App = () => {
  const { activeTab } = useAppContext();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'factTable' && <FactSales />}
          {activeTab === 'dateDimention' && <DateDimention />}
          {activeTab === 'promotion' && <Promotion />}
          {activeTab === 'snapshot' && <InventorySnapshot />}
          {activeTab === 'Accumulation Fact' && <AccumulationFact/>}
        </div>
      </div>
    </div>
  );
};

export default App;
