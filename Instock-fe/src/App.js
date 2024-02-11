import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import components
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import Warehouse from "./components/Warehouse/Warehouse";
import WarehouseDetails from "./components/Warehouse Details/WarehouseDetails";
import { useState, useEffect } from "react";
import Axios from "axios";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import AddWarehouse from "./components/AddWarehouse/Addwarehouse";
// import Inventory from "./components/pages/inventory/Inventory";
import InventoryDetails from "./components/inventoryDetails/InventoryDetails";
// import DeleteWarehouse from "./components/deleteWarehouse/DeleteWarehouse";
import Editinventory from "./components/EditInventory/Editinventory";
import AddInventory from "./components/AddInventory/AddInventory";
import InventoryList from "./components/InventoryList/InventoryList";
// import DeleteInventory from "./components/delteInventory/DeleteInventory";

function App() {
  useEffect(() => {
    document.title = "InStock | Where Inventory Meets Excellence. ";
  }, []);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const urlAPI = "http://localhost:8088/api/warehouses";
        const response = await Axios.get(urlAPI);
        setWarehouses(response.data.warehouseList);
        console.log(response.data.warehouseList);
      } catch (error) {
        console.error("Error fetching warehouse:", error.message);
      }
    };

    fetchWarehouse();
  }, []);

  return (
    <>
      <div className="App" id="App">
        <BrowserRouter>
          <Header />
          <main>
          <Routes>
            {/* Warehouse routes */}
            <Route
              path="/"
              exact
              element={<Warehouse warehouses={warehouses} />}
            />
            <Route
              path="/warehouse"
              element={<Warehouse warehouses={warehouses} />}
            />
            <Route path="/warehouse/:id" element={<WarehouseDetails />} />
            <Route path="/warehouse/add" element={<AddWarehouse />} />

            <Route path="/warehouse/:id/edit" element={<EditWarehouse />} />

            {/* Inventory routes */}
            <Route path="/inventory/:id" element={<InventoryDetails />} />
            <Route path="/inventory/:id/edit" element={<Editinventory />} />
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/inventory/add" element={<AddInventory />} />
            {/* <Route path="/inventory/:id/delete" element={<DeleteInventory />} /> */}
          </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
