import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '../../assets/icons/delete_outline-24px.svg';
import EditIcon from '../../assets/icons/edit-24px.svg';
import './WarehouseItems.scss';
import DeleteWarehouse from '../DeleteWarehouse/DeleteWarehouse';

const List = ({warehouses}) => {
    const [deletingWarehouse, setDeletingWarehouse] = useState(null)

    function deleteWarehouse(warehouse){
        setDeletingWarehouse(warehouse)
    }

    function onWarehouseDeleted(warehouse){
        warehouses = warehouses.filter(item => item.id !== warehouse.id);
        setDeletingWarehouse(null)
    }

    return (
        <ul>
            {warehouses.map((warehouse, id) => (
                    <li className="warehouse--container-list" key={id}>
                        <div className='warehouse-name'>
                            <Link to={`/warehouse/${warehouse.id}`} key={warehouse.id} className="warehouse--link">
                                {warehouse.warehouse_name}
                            </Link>
                        </div>
                        <div className='warehouse-address'>
                            <p>{warehouse.address}</p>
                        </div> 
                        <div className='warehouse-contactname'>
                            <p>{warehouse.contact_name}</p>
                        </div>
                        <div className="contact-information">
                            <p>{warehouse.contact_phone}</p>
                            <p>{warehouse.contact_email}</p>
                        </div>
                        <div className='action--icons'>
                            <img src={DeleteIcon} onClick={() => setDeletingWarehouse(warehouse)} alt="delete" />
                            <img src={EditIcon} alt="edit" />
                        </div>
                    </li>
            ))}

        {
            deletingWarehouse && (
            <DeleteWarehouse
                warehouse={deletingWarehouse}
                onDeleted={onWarehouseDeleted}
                onCancelled={() => setDeletingWarehouse(null)}
                />
        )
        }
        </ul>
        
    );
}

export default List;