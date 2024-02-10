import {useParams} from 'react-router-dom';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import errorIcon from "../../assets/icons/error-24px.svg";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import './AddWarehouse.scss';


function WarehouseDetails ({props}) {

    const {id} = useParams();
    const [warehouse, setWarehouse] = useState(null);

    useEffect(() =>{

        const fetchWarehouseDetails = async () => {
            try{
                const response = await Axios.get(`/api/warehouse/${id}`);
                setWarehouse(response.data)
            }
            catch(error){
                console.error('Oops! Error encountered when fetching warehouse details:', error)
            }
        };

        fetchWarehouseDetails();

    }, [id])


    return(
        <section className="addWarehouse">
        <div className="addWarehouse--heading">
          <img src={arrowBack} alt="Back" />
          <h1>Add New Warehouse</h1>
        </div>
        <form className="item-form" onSubmit={submitForm}>
          <div className="container__item-form">
            <div className="container__warehousedetails">
              <h2 className="itemform--heading">Warehouse Details </h2>
              <label className="itemform--label">Warehouse Name</label>
              <input
                className="itemform--input"
                type="text"
                placeholder="Enter Warehouse Name"
                name="warehouse_name"
                required
                value={formData.warehouse_name}
                onChange={handleChange}
              />
              {formData.warehouse_name === "" && (
                <div className="item-form__error">
                  <img
                    className="item-form__error-icon"
                    src={errorIcon}
                    alt="Error"
                  />
                  <div className="item-form__error-text">
                    <p>This field is required!</p>
                  </div>
                </div>  
              )}
              <label className="itemform--label">Street Address</label>
              <input
                className="itemform--input"
                type="text"
                placeholder="Street Address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
              />
              {formData.address === "" && (
                <div className="item-form__error">
                  <img
                    className="item-form__error-icon"
                    src={errorIcon}
                    alt="Error"
                  />
                  <div className="item-form__error-text">
                    <p>This field is required!</p>
                  </div>
                </div>  
              )}
              <label className="itemform--label">City</label>
              <input
                className="itemform--input"
                type="text"
                placeholder="City"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
              />
              {formData.city === "" && (
                <div className="item-form__error">
                  <img
                    className="item-form__error-icon"
                    src={errorIcon}
                    alt="Error"
                  />
                  <div className="item-form__error-text">
                    <p>This field is required!</p>
                  </div>
                </div>  
              )}
              <label className="itemform--label">Country</label>
              <input
                className="itemform--input"
                type="text"
                placeholder="Country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
              />
              {formData.country === "" && (
                <div className="item-form__error">
                  <img
                    className="item-form__error-icon"
                    src={errorIcon}
                    alt="Error"
                  />
                  <div className="item-form__error-text">
                    <p>This field is required!</p>
                  </div>
                </div>  
              )}
            </div>
            <div className="container__divider"></div>
            <div className="container__contactdetails">
              <h2 className="itemform--heading">Contact Details</h2>
              <label className="itemform--label">Contact Name</label>
              <input
                className="itemform--input"
                type="text"
                placeholder="Contact Name"
                name="contact_phone"
                required
                value={formData.contact_phone}
                onChange={handleChange}
              />
              {formData.contact_phone === "" && (
                <div className="item-form__error">
                  <img
                    className="item-form__error-icon"
                    src={errorIcon}
                    alt="Error"
                  />
                  <div className="item-form__error-text">
                    <p>This field is required!</p>
                  </div>
                </div>  
              )}
              <label className="itemform--label">Position</label>
              <input
                className="itemform--input"
                type="text"
                placeholder="Position"
                name="contact_position"
                required
                value={formData.contact_position}
                onChange={handleChange}
              />
              {formData.contact_position === "" && (
                <div className="item-form__error">
                  <img
                    className="item-form__error-icon"
                    src={errorIcon}
                    alt="Error"
                  />
                  <div className="item-form__error-text">
                    <p>This field is required!</p>
                  </div>
                </div>  
              )}
              <label className="itemform--label">Phone Number</label>
              <input
                className="itemform--input"
                type="number"
                placeholder="Phone Number"
                name="contact_phone"
                required
                value={formData.contact_phone}
                onChange={handleChange}
              />
              {formData.contact_phone === "" && (
                <div className="item-form__error">
                  <img
                    className="item-form__error-icon"
                    src={errorIcon}
                    alt="Error"
                  />
                  <div className="item-form__error-text">
                    <p>This field is required!</p>
                  </div>
                </div>  
              )}
              <label className="itemform--label">Email</label>
              <input
                className="itemform--input"
                type="email"
                placeholder="Email"
                name="contact_email"
                required
                value={formData.contact_email}
                onChange={handleChange}
              />
              {formData.contact_email === "" && (
                <div className="item-form__error">
                  <img
                    className="item-form__error-icon"
                    src={errorIcon}
                    alt="Error"
                  />
                  <div className="item-form__error-text">
                    <p>This field is required!</p>
                  </div>
                </div>  
              )}
              {/* End of script */}
            </div>
            </div>
          <div>
                <div className="action--items">
                  <button type="button" className="__button-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="__button">
                    + Add Item
                  </button>
                </div>
                
          </div>
        </form>
      </section>
    )
}

export default WarehouseDetails;