// import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import components
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
// import Warehouse from "./components/pages/warehouse/Warehouse";
// import WarehouseDetails from "./components/warehouseDetails/WarehouseDetails";
import EditWarehouse from "./components/editwarehouse/EditWarehouse";
// import AddWarehouse from "./components/addwarehouse/AddWarehouse";
// import Inventory from "./components/pages/inventory/Inventory";
// import InventoryDetails from "./components/inventoryDetails/InventoryDetails";
// import DeleteWarehouse from "./components/deleteWarehouse/DeleteWarehouse";
// import EditInventory from "./components/editInventory/EditInventory";
// import AddInventory from "./components/AddInventory/AddInventory";
// import DeleteInventory from "./components/delteInventory/DeleteInventory";

function App() {



  return (
    <>
      <div className="App" id="App">
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Warehouse routes */}
            {/* <Route path="/" exact element={<Warehouse />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/warehouse/:id" element={<WarehouseDetails />} />
            <Route path="/warehouse/add" element={<AddWarehouse />} />*/}
            <Route path="/warehouse/:id/edit" element={<EditWarehouse />} /> 

            {/* Inventory routes */}
            {/* <Route path="/inventory" element={<Inventory />} />
            }
            <Route path="/inventory/:id/edit" element={<EditInventory />} /> */}
            {/* <Route path="/inventory/:id" element={<InventoryDetails />}/> */}
            {/* <Route path="/inventory/add" element={<AddInventory/>} /> */}
            {/* <Route path="/inventory/:id/delete" element={<DeleteInventory />} /> */}

          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

