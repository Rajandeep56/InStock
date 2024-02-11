import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteIcon from "../../assets/icons/delete_outline-24px.svg";
import EditIcon from "../../assets/icons/edit-24px.svg";
import { Link } from "react-router-dom";
import "./warehouseinventory.scss";

export default function AvailableItems() {
  const { id } = useParams();
  const [warehouseDetails, setWarehouseDetails] = useState([]);
  const [inventoryDetails, setInventoryDetails] = useState([]);

  useEffect(() => {
  const getWarehouseDetails = async () => {
    try {
      const urlAPI = `http://localhost:8088/api/warehouses/${id}`;
      const response = await axios.get(urlAPI);
      setWarehouseDetails(response.data);
    } catch (error) {
      console.error("Error fetching warehouse: ", error.message);
    }
  };
  getWarehouseDetails();
  },[]);
  useEffect(() => {
  const getInventoryDetails = async () => {
    try {
      const urlAPI = `http://localhost:8088/inventory/`;
      const response = await axios.get(urlAPI);
      setInventoryDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching inventory: ", error.message);
    }
  };


    getInventoryDetails();
 
  },[]);

  

  const filteredItems = inventoryDetails.filter(
    (inventory) => inventory.warehouse_id == id
  );
  console.log(filteredItems);
  return (
    <ul>
      {filteredItems.map((inventory) => (
        <li className="inventory--container-list" key={inventory.id}>
          <div className="inventory--name">
            <Link
              to={`/inventory/${inventory.id}`}
              key={inventory.id}
              className="inventory--link"
            >
              {inventory.item_name}
            </Link>
          </div>
          <div className="inventory--category">
            <p>{inventory.category}</p>
          </div>
          <div className="inventory--status">
            <p>{inventory.status}</p>
          </div>
          <div className="inventory--quantity">
            <p>{inventory.quantity}</p>
          </div>
          <div className="action--icons">
            <img src={DeleteIcon} alt="delete" />
            <img src={EditIcon} alt="edit" />
          </div>
        </li>
      ))}
    </ul>
  );
}
