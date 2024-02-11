import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import "./EditInventory.scss";
import arrowBack from '../../assets/icons/arrow_back-24px.svg';

function EditInventory() {
  const [itemDetails, setItemDetails] = useState({
    item_name: '',
    description: '',
    category: '',
    status: '',
    quantity:'',
    warehouse_id: '',
    warehouse_name:''
  });

  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchData(id);
    fetchCategories();
    fetchWarehouses();
  }, [id]);

  const fetchData = async (parmid) => {
    try {
      const response = await axios.get(`http://localhost:8088/inventory/${parmid}`);
      const currentItem = response.data;
  
      if (currentItem) {
        const warehouseResponse = await axios.get(`http://localhost:8088/api/warehouses/${currentItem.warehouse_id}`);
        const warehouseData = warehouseResponse.data;

        setItemDetails({
          item_name: currentItem.item_name,
          description: currentItem.description,
          category: currentItem.category,
          status: currentItem.status ,
          quantity: currentItem.quantity,
          warehouse_id: currentItem.warehouse_id,
          warehouse_name: warehouseData.warehouse_name 
        });
      } else {
        console.error(`Item with id ${id} not found.`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8088/inventory/cat/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/warehouses/list/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const selectedWarehouse = warehouses.find(warehouse => 
        warehouse.warehouse_name.toLowerCase() === itemDetails.warehouse_name.toLowerCase()
      );
      
      if (!selectedWarehouse) {
        alert('Selected warehouse not found.');
        return;
      }
      
      console.log(selectedWarehouse);
      const response = await axios.put(`http://localhost:8088/inventory/${id}`, {
        ...itemDetails,
        warehouse_id: selectedWarehouse.id, 
        quantity: itemDetails.quantity
      });

      console.log(response.data);
          alert('Data saved successfully!');

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <section className="editInventory">
      {/* edit inventory item */}
      <div className="editInventory__heading">
      <Link to='/inventory'><img src={arrowBack} alt="Back arrow" className="editInventory__heading-arrow"/></Link>
        <h1 className="editInventory__heading-title">Edit Inventory Item</h1>
      </div>
      {/* Item Details  */}
      <div className="editInventory__container">
        <form className="item-form">
          <div className="item-form__details">
            <h2 className="item-form__title">Item Details</h2>
            {/* Item Name Input */}
            <label className="item-form__label">Item Name</label>
            <input
              className="item-form__input"
              type="text"
              placeholder="Item Name"
              name="item_name"
              value={itemDetails.item_name}
              onChange={handleChange}
            />
            {/* Description Input */}
            <label className="item-form__label">Description</label>
            <textarea
              type="text"
              name="description"
              value={itemDetails.description}
              onChange={handleChange}
              className="item-form__description-input"
            />
            {/* Category Select */}
            <label className="item-form__label">Category</label>
            <select
              name="category"
              value={itemDetails.category}
              onChange={handleChange}
              className="item-form__dropdown">
              {categories.map((category, index) => (
                <option key={index} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>
          <div className="item-form__line"></div>
          {/* Item Availability */}
          <div className="item-form__availability">
            <h2 className="item-form__title">Item Availability</h2>
            {/* Status Radio Inputs */}
            <label className="item-form__label">Status</label>
            <div className="item-form__status">
              <div className="item-form__status-container">
                <input type="radio"
                       name="status" 
                       value="In Stock"  
                       checked={itemDetails.status === 'In Stock'} 
                       onChange={handleChange}/>
                <p className="item-form__status-container-text">In stock</p> 
              </div>
              <div className="item-form__status-container">
                <input type="radio"
                       name="status" 
                       value="Out of Stock" 
                       checked={itemDetails.status === 'Out of Stock'} 
                       onChange={handleChange}/>
                <p className="item-form__status-container-text">Out of stock</p>
              </div>
            </div>
            {itemDetails.status === 'In Stock' && (
              <div className="edit__form-second--quantity">
                <label>Quantity</label>
                <input type="text" name="quantity" value={itemDetails.quantity} onChange={handleChange} className="edit__form-quantity--value"/>
              </div>
            )}
            <label className="item-form__label">Warehouse</label>
            <select
              className="item-form__dropdown"
              name="warehouse_name"
              value={itemDetails.warehouse_name}
              onChange={handleChange}
            >
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.warehouse_name}>
                  {warehouse.warehouse_name}
                </option>
              ))}
            </select>
            <div className="item-form__button">
              <a href='/inventory' className="item-form__button-cancel">
                CANCEL
              </a>
              <button type="button" className="item-form__button-add" onClick={handleSave}>
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditInventory;
