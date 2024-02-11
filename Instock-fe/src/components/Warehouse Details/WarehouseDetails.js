import React from "react";
import { useParams } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import './warehousedetails.scss';
import EditIcon from '../../assets/icons/edit-24px.svg';
import Dropdown from '../../assets/icons/arrow_drop_down-24px.svg';
import WarehouseInventory from '../WarehouseInventory/WarehouseInventory';
import { Link } from "react-router-dom";
import InventoryList from './../InventoryList/InventoryList'


export default function WarehouseDetails() {
  const { id } = useParams();
  const [warehouseDetails, setWarehouseDetails] = useState([]);
  const [inventoryDetails, setInventoryDetails] = useState([]);

  const getWarehouseDetails = async () => {
    try{
        const urlAPI = `http://localhost:8088/api/warehouses/${id}`;
        const response = await axios.get(urlAPI);
        setWarehouseDetails(response.data)
    }
    catch(error){
        console.error("Error fetching warehouse: ", error.message)
    }
    
  }

    useEffect(() =>{

        const fetchWarehouseDetails = async () => {
            try{
                const response = await axios.get(`/api/warehouse/${id}`);
                setWarehouse(response.data)
            }
            catch(error){
                console.error('Oops! Error encountered when fetching warehouse details:', error)
            }
        };

        fetchWarehouseDetails();

    }, [id])

    return(
        <div className="container--title">
            
        </div>
    )
}
