// import WarehouseItems from "../Warehouse Items/WarehouseItems";
import "./Warehouse.scss";
import Dropdown from "../../assets/icons/sort-24px.svg";
import WarehouseItems from "../Warehouse Items/WarehouseItems";
import SearchButton from  "../SearchFunction/search";
import "../SearchFunction/search.scss";
import { Link } from 'react-router-dom';
import "../AddWarehouse/AddWarehouse.scss"

function Warehouse({ warehouses }) {
  return (
    <section className="warehouse">
      <div className="container--warehouse">
        <div className="warehouse--heading">
            <h1>Warehouses</h1>
        </div>
        
        <div className="warehouse--search">
             <SearchButton/> 
             <Link to="/warehouse/add">
            <button className="__button">+ Add New Warehouse</button>
          </Link>
        </div>
        
        {/* Insert Add New Warehouse*/}
      </div>
      <div className="warehouse-list-header">
        <div className="warehouse-list-title">
          <h5>WAREHOUSE</h5>
          <img src={Dropdown} alt="filter" />
        </div>
        <div className="warehouse-list-title">
          <h5>ADDRESS</h5>
          <img src={Dropdown} alt="filter" />
        </div>
        <div className="warehouse-list-title">
          <h5>CONTACT NAME</h5>
          <img src={Dropdown} alt="filter" />
        </div>
        <div className="warehouse-list-title">
          <h5>CONTACT INFORMATION</h5>
          <img src={Dropdown} alt="filter" />
        </div>
        <div className="warehouse-list-title">
          <h5>ACTIONS</h5>
        </div>
      </div>
      <div className="warehouse-list">
        {warehouses ? <WarehouseItems warehouses={warehouses} /> : <></>}
      </div>
    </section>
  );
}

export default Warehouse;
