import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import rightIcon from '../../assets/icons/chevron_right-24px.svg';
import './InventoryList.scss';
//import DeleteItem from '../DeleteItem/DeleteItem';

const InventoryList = ({ warehouseId = null }) => {
    const [inventoryList, setInventoryList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [deletingInventory, setDeletingInventory] = useState(null)
  
    useEffect(() => {
      let endpoint = warehouseId ? `http://localhost:8088/api/warehouses/${warehouseId}/inventories` :
        'http://localhost:8088/inventory'

      axios.get(endpoint)
        .then(response => {
          setInventoryList(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    function deleteInventory(inventory){
      setDeletingInventory(inventory)
    }

    function onInventoryDeleted(inventory){
      setInventoryList(inventoryList.filter(item => item.id !== inventory.id));
      setDeletingInventory(null)
    }
  
    const showModal = (item) => {
      setSelectedItem(item);
      setDisplay(true);
    };
  
    const cancelModal = () => {
      setDisplay(false);
      setSelectedItem(null);
    };
  
    return (
        <>
<>
  <div className="inventoryList">
    <div className="inventoryList__form">
      <h1 className="inventoryList__title">Inventory</h1>
      <div className="inventoryList__form-container">
        <form className="inventoryList__form-sub">
          <input className="inventoryList__search" type="search" placeholder="Search..." />
          <Link to="/inventory/add">
            <button className="inventoryList__button">+ Add New Item</button>
          </Link>
        </form>
      </div>
    </div>
    <div className="inventoryList__list-divider" />
    <div className="inventoryList__category-box">
      <div className="inventoryList__categories">
        <div className="inventoryList__category-title">INVENTORY ITEM</div>
        <div className="inventoryList__category-title">CATEGORY</div>
        <div className="inventoryList__category-title">STATUS</div>
        <div className="inventoryList__category-title">QTY</div>
        <div className="inventoryList__category-title">WAREHOUSE</div>
        <div className="inventoryList__category-title">ACTIONS</div>
      </div>
    </div>
    {inventoryList.map((item) => (
      <div key={item.id} className="inventoryList__item-row">
        <div className="inventoryList__item-detail">{item.item_name}</div>
        <div className="inventoryList__item-detail">{item.category}</div>
        <div className="inventoryList__item-detail">{item.status}</div>
        <div className="inventoryList__item-detail">{item.quantity}</div>

        {
          warehouseId ? <></> :
          <div className="inventoryList__item-detail">{item.warehouse_name}</div>
        }
        
        <div className="inventoryList__actions-detail">
          <Link to={`/inventory/${item.id}/edit`}><img src={editIcon} alt="Edit" /></Link>
          <button onClick={() => deleteInventory(item)}><img src={deleteIcon} alt="Delete" /></button>
          <Link to={`/inventories/${item.id}`}><img src={rightIcon} alt="Details" /></Link>
        </div>
      </div>
    ))}
  </div>
</>
            {/* {deletingInventory ? <DeleteInventory
                inventory={deletingInventory}
                onDeleted={onInventoryDeleted}
                onCancelled={() => setDeletingInventory(null)}
                />
                :<></>
            } */}
        </>
      );
    };
    
    export default InventoryList;