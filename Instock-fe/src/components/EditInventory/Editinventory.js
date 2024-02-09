import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./EditInventory.scss";

function EditInventory() {
  const [itemDetails, setItemDetails] = useState({
    item_name: '',
    description: '',
    category: '',
    status: '',
    warehouse_id: ''
  });
  const { id } = useParams();
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (parmid) => {
    try {
      const response = await axios.get(`http://localhost:8088/inventory/${parmid}`);
      const currentItem = response.data;
  
      if (currentItem) {
        setItemDetails({
          item_name: currentItem.item_name,
          description: currentItem.description,
          category: currentItem.category,
          status: currentItem.status,
          warehouse_id: currentItem.warehouse_id
        });
      } else {
        console.error(`Item with id ${id} not found.`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };
  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8088/inventory/${id}`, itemDetails);
      console.log(response.data); 
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  return (
    <div className="edit">
      <h1>Item Details</h1>
      <form className="edit__form">
        <div className="edit__form-first">
          <label className="edit__form-first--name">Item Name</label>
          <input
            type="text"
            name="item_name"
            value={itemDetails.item_name}
            onChange={handleChange}
            className="edit__form-name--value"
          />
          <label className="edit__form-first--description">Description</label>
          <input
            type="text"
            name="description"
            value={itemDetails.description}
            onChange={handleChange}
            className="edit__form-description--value"
          />
          <label className="edit__form-first--category">Category</label>
          <input
            type="text"
            name="category"
            value={itemDetails.category}
            onChange={handleChange}
            className="edit__form-category--value"
          />
        </div>
        <div className="edit__form-second">
          <h3>Item Availability</h3>
          <label className="edit__form-second--status">Status</label>
          <input
            type="text"
            name="status"
            value={itemDetails.status}
            onChange={handleChange}
            className="edit__form-second--status---instock"
          />
          <label className="edit__form-second--warehouse">Warehouse</label>
          <input
            type="text"
            name="warehouse_id"
            value={itemDetails.warehouse_id}
            onChange={handleChange}
            className="edit__form-second--warehouse---value"
          />
          <div className="edit__form-second--buttons">
            <button type="button" className="edit__form-second--buttons---cancel">
              CANCEL
            </button>
            <button type="button" className="edit__form-second--buttons---save" onClick={handleSave}>
              SAVE
              </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditInventory;
