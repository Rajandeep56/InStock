// import WarehouseItems from "../Warehouse Items/WarehouseItems";
import './Warehouse.scss';
import Dropdown from '../../assets/icons/sort-24px.svg';
import WarehouseItems from '../Warehouse Items/WarehouseItems';


function Warehouse({warehouses}) {
    return (
      <section className='warehouse'>
        <div className="container--warehouse">
            <h1>Warehouses</h1>
            {/* Insert search here */}
            {/* Insert Add New Warehouse*/}
        </div>
        <div className="warehouse-list-header">
            <div className="warehouse-list-title"> 
                <h5>WAREHOUSE</h5>
                <img src={Dropdown} alt="filter"/>
            </div>
            <div className="warehouse-list-title"> 
                <h5>ADDRESS</h5>
                <img src={Dropdown} alt="filter"/>
            </div>
            <div className="warehouse-list-title"> 
                <h5>CONTACT NAME</h5>
                <img src={Dropdown} alt="filter"/>
            </div>
            <div className="warehouse-list-title"> 
                <h5>CONTACT INFORMATION</h5>
                <img src={Dropdown} alt="filter"/>
            </div>
            <div className="warehouse-list-title"> 
                <h5>ACTIONS</h5>
            </div>
        </div>
        <div className="warehouse-list">
            <WarehouseItems warehouses={warehouses}/>
        </div>
      </section>
    );
  }
  




export default Warehouse;