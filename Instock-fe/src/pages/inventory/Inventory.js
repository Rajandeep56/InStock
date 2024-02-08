import React from "react";
import InventoryList from "../../components/inventoryList/InventoryList";
import InventoryDetails from "../../components/inventoryDetails/InventoryDetails";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer/Footer";
export default function Inventory() {
  return (
    <>
      <Header />
      <InventoryList />
      <InventoryDetails/>
      <Footer />
    </>
  );
}
