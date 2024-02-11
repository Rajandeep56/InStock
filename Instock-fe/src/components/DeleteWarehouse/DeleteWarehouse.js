import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./DeleteWarehouse.scss";

function DeleteWarehouse({ warehouse, onDeleted, onCancelled }) {
  function cancelDeletion(){
    onCancelled()
  }

  function deleteWarehouse(){
    axios.delete('http://localhost:8088/api/warehouses/' + warehouse.id)
      .then(response => {
        onDeleted(warehouse)
      })
      .catch(error => {
        console.error(error);
        onCancelled()
        alert(error?.response?.data?.message || 'An error occurred')
      })

  }
  

  
  return (
    <div className="delete">
      
      <div className="delete__content">
        <h1 className="delete__content--title">Delete {warehouse.warehouse_name} warehouse?</h1>
        <span className="delete__content--close" onClick={cancelDeletion}>&times;</span>

        <div className="delete__content--text">
          Please confirm that you'd like to delete {warehouse.name} from the list of warehouses.
          You won't be able to undo this action.
        </div>

        <div className="delete__content--actions">
          <button type="button" className="delete__content--actions__cancel" onClick={cancelDeletion}>Cancel</button>
          <button type="button" className="delete__content--actions__delete" onClick={deleteWarehouse}>Delete</button>
        </div>

      </div>
      
    </div>
  );
}

export default DeleteWarehouse;
