import "./EditWarehouse.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import error from "../../assets/icons/error-24px.svg";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";

function EditWarehouse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [warehouseItem, setWarehouseItem] = useState([]);
  
  

  const getWarehouseItem = () => {
    axios
      .get(`http://localhost:8088/warehouses/${id}`)
      .then((res) => {
        const whItemArray = res.data["warehouseData"];
        whItemArray?.map((whItem) => {
          setWarehouseItem(res.data);
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getWarehouseItem();
  }, []);
  const whItemArray = warehouseItem["warehouseData"];
  const handleSubmit = (event) => {
    event.preventDefault();

   const myform=event.currentTarget
   console.log(myform);
   const isWarehouseNameValid = myform.warehousename.value;
   const isAdressValid = myform.address.value;
   const isCityValid = myform.city.value;
   const isCountryValid = myform.country.value;
   const isContactNameValid = myform.contactname.value;
   const isPositionValid = myform.position.value;
   const isPhonenumberValid = myform.phonenumber.value;
   const isEmailValid = myform.email.value;
   
   
   if (!isWarehouseNameValid) {
    myform.warehousename.style.border = "1px solid red";
    document.getElementById("warehousename-Valid").style.display = "block";
   }else{myform.warehousename.style.border = "1px solid #bdc5d5";
   document.getElementById("warehousename-Valid").style.display = "none";}
   
   if (!isAdressValid) {
     myform.address.style.border = "1px solid red";
     document.getElementById("address-Valid").style.display = "block";
   } else {
     myform.address.style.border = "1px solid #bdc5d5";
      document.getElementById("address-Valid").style.display = "none";
   }
   
   if (!isCityValid) {
     myform.city.style.border = "1px solid red";
     document.getElementById("city-Valid").style.display = "block";
   } else {
     myform.city.style.border = "1px solid #bdc5d5";
     document.getElementById("city-Valid").style.display = "none";
   }
   
   if (!isCountryValid) {
     myform.country.style.border = "1px solid red";
     document.getElementById("country-Valid").style.display = "block";
   } else {
     myform.country.style.border = "1px solid #bdc5d5";
     document.getElementById("country-Valid").style.display = "none";
   }
   
   if (!isContactNameValid) {
     myform.contactname.style.border = "1px solid red";
     document.getElementById("contactname-Valid").style.display = "block";
   } else {
     myform.contactname.style.border = "1px solid #bdc5d5";
     document.getElementById("contactname-Valid").style.display = "none";
   }
   
   if (!isPositionValid) {
     myform.position.style.border = "1px solid red";
     document.getElementById("position-Valid").style.display = "block";
   } else {
    myform.position.style.border = "1px solid #bdc5d5";
    document.getElementById("position-Valid").style.display = "none";
   }
   
   if (!isPhonenumberValid) {
     myform.phonenumber.style.border = "1px solid red";
     document.getElementById("phonenumber-Valid").style.display = "block";
   } else {
      myform.phonenumber.style.border = "1px solid #bdc5d5";
     document.getElementById("phonenumber-Valid").style.display = "none";
   }
   
   if (!isEmailValid) {
     myform.email.style.border = "1px solid red";
     document.getElementById("email-Valid").style.display = "block";
   } else {
     myform.email.style.border = "1px solid #bdc5d5";
     document.getElementById("email-Valid").style.display = "none";
   }
   
   if(isWarehouseNameValid && isAdressValid && isCityValid&&isCountryValid&&isContactNameValid&&isPositionValid&&isPhonenumberValid&&isEmailValid){
   
       const updatedWarehouse = {
         warehouse_name: event.target.warehousename.value,
         address: event.target.address.value,
         city: event.target.city.value,
         country: event.target.country.value,
         contact_name: event.target.contactname.value,
         contact_position: event.target.position.value,
         contact_phone: event.target.phonenumber.value,
         contact_email: event.target.email.value,
       };
   
       axios
         .put(`http://localhost:8088/warehouses/${id}`, updatedWarehouse)
         .then((response) => console.log(response.data));
       window.location = "/";
       
     };}
  return (
    <>
      <form className="form"
        noValidate onSubmit={handleSubmit}>
      
        {whItemArray?.map((whItem) => (
          <div key={whItem.id}>
            <div className="form-top">
            <Link to={`/warehouse`}>
              <div className="form-top__backIcon">
                <img
                  src={backArrowIcon}
                  alt="arrow-back-icon"
                  className="form-top__backIconimg"
                />
              </div>
            </Link>
            
      <div className="form__title">
        <p className="form__title-text">Edit Warehouse</p>
      </div>
          </div>
      <div className="form__content">
      <hr className="form__hr"></hr>
        <div className="form__warehousedetails">
          <p className="form__subtitle">Warehouse Details</p>
          <div className="form__container">
            <div className="form__detail">
              <label className="form__label">Warehouse Name</label>
              <input  className="form__input" defaultValue={whItem.warehouse_name}   name="warehousename"/>
          
            <div className="warehousename-Valid" id="warehousename-Valid">
              <img
                className="warehousename-Valid__img"
                src={error}
                alt="error"
              />
              <span className="warehousename-Valid__text">
                This field is required
              </span>
            </div></div>
            <div className="form__detail">
              <label className="form__label">Street Address</label>
              <input className="form__input" defaultValue={whItem.address}
                   name="address" ></input>
            
            <div className="address-Valid" id="address-Valid">
                <img className="address-Valid__img" src={error} alt="error" />
                <span className="address-Valid__text">
                  This field is required
                </span>
              </div></div>
            <div className="form__detail">
              <label className="form__label">City</label>
              <input className="form__input" defaultValue={whItem.city}
                name="city"           ></input>
            
            <div className="city-Valid" id="city-Valid">
                <img className="city-Valid__img" src={error} alt="error" />
                <span className="city-Valid__text">This field is required</span>
              </div></div>
            <div className="form__detail">
              <label className="form__label">Country</label>
              <input className="form__input" defaultValue={whItem.country}
                name="country"            ></input>
            
            <div className="country-Valid" id="country-Valid">
                <img className="country-Valid__img" src={error} alt="error" />
                <span className="country-Valid__text">
                  This field is required
                </span>
              </div></div>
          </div>
        </div>
        <hr className="form__hr"></hr>
        <div className="form__contactdetails">
          <p className="form__subtitle">Contact Details</p>
          <div className="form__container">
            <div className="form__detail">
              <label className="form__label">Contact Name</label>
              <input className="form__input" defaultValue={whItem.contact_name}
                 name="contactname"  ></input>
            
            <div className="contactname-Valid" id="contactname-Valid">
                <img
                  className="contactname-Valid__img"
                  src={error}
                  alt="error"
                />
                <span className="contactname-Valid__text">
                  This field is required
                </span>
              </div></div>
            <div className="form__detail">
              <label className="form__label">Position</label>
              <input className="form__input" defaultValue={whItem.contact_position} name="position"
                            ></input>
            
            <div className="position-Valid" id="position-Valid">
                <img className="position-Valid__img" src={error} alt="error" />
                <span className="position-Valid__text">
                  This field is required
                </span>
              </div></div>
            <div className="form__detail">
              <label className="form__label">Phone Number</label>
              <input className="form__input" defaultValue={whItem.contact_phone}  name="phonenumber"
                               ></input>
            
            <div className="phonenumber-Valid" id="phonenumber-Valid">
                <img
                  className="phonenumber-Valid__img"
                  src={error}
                  alt="error"
                />
                <span className="phonenumber-Valid__text">
                  This field is required
                </span>
              </div></div>
            <div className="form__detail">
              <label className="form__label">Email</label>
              <input className="form__input" defaultValue={whItem.contact_email}  name="email"
                               ></input>
            
            <div className="email-Valid" id="email-Valid">
                <img className="email-Valid__img" src={error} alt="error" />
                <span className="email-Valid__text">
                  This field is required
                </span>
              </div></div>
          </div>
        </div>
      </div>

      <div className="form__btns">
      <Link to="/warehouse">
        <button className="form__btncancel">Cancel</button>
        </Link>
        <button className="form__btnsave">Save</button>
      </div>
      </div>
        ))}
    </form>
    </>
  );
}

export default EditWarehouse;
