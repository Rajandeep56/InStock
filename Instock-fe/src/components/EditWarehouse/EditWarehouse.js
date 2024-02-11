import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EditWarehouse.scss";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

const EditWarehouse = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/api/warehouses/${id}`
        );
        const warehouseData = response.data;
        setFormData({ ...warehouseData });
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
      }
    };

    fetchWarehouseData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    alert("Cancelled!");
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8088/api/warehouses/${id}`,
        formData
      );
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating warehouse:", error);
      alert("Failed to update warehouse. Please try again.");
    }
  };

  return (
    <section className="editWarehouse">
      <div className="editWarehouse--heading">
        <Link to="http://localhost:3000/">
          <img className="addWarehouse--arrow" src={arrowBack} alt="Back" />
        </Link>
        <h1>Edit Warehouse</h1>
      </div>

      <form className="item-form">
        <div className="container__item-form">
          <div className="container__warehousedetails">
            <h2 className="itemform--heading">Warehouse Details </h2>

            <label className="itemform--label" htmlFor="warehousename">
              Warehouse Name
            </label>
            <input
              className="itemform--input"
              type="text"
              id="warehousename"
              name="warehouse_name"
              value={formData.warehouse_name}
              onChange={handleInputChange}
            />

            <label className="itemform--label" htmlFor="streetAddress">
              Street Address
            </label>
            <input
              className="itemform--input"
              type="text"
              id="streetAddress"
              name="address"
              placeholder="Enter street address"
              value={formData.address}
              onChange={handleInputChange}
            />

            <label className="itemform--label" htmlFor="city">
              City
            </label>
            <input
              className="itemform--input"
              type="text"
              id="city"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleInputChange}
            />

            <label className="itemform--label" htmlFor="country">
              Country
            </label>
            <input
              className="itemform--input"
              type="text"
              id="country"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
          <div className="container__divider"></div>
          <div className="container__contactdetails">
            <h2 className="itemform--heading">Contact Details</h2>
            <label className="itemform--label" htmlFor="contactName">
              Contact Name
            </label>
            <input
              className="itemform--input"
              type="text"
              id="contactName"
              name="contact_name"
              placeholder="Enter contact name"
              value={formData.contact_name}
              onChange={handleInputChange}
            />

            <label className="itemform--label" htmlFor="contactPosition">
              Position
            </label>
            <input
              className="itemform--input"
              type="text"
              id="contactPosition"
              name="contact_position"
              placeholder="Enter contact position"
              value={formData.contact_position}
              onChange={handleInputChange}
            />

            <label className="itemform--label" htmlFor="contactEmail">
              Email
            </label>
            <input
              className="itemform--input"
              type="email"
              id="contactEmail"
              name="contact_email"
              placeholder="Enter contact email (e.g., glyon@instock.com)"
              value={formData.contact_email}
              onChange={handleInputChange}
            />

            <label className="itemform--label" htmlFor="contactPhone">
              Phone
            </label>
            <input
              className="itemform--input"
              type="tel"
              id="contactPhone"
              name="contact_phone"
              placeholder="+(647)507-0911"
              value={formData.contact_phone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="action--items">
          <button
            className="__button-cancel"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="__button" type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditWarehouse;
