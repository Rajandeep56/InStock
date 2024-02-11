import React from "react";
import { useParams } from "react-router-dom";
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import "./InventoryDetails.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function InventoryDetails() {
  // const { id } = useParams();
  // const [itemDetails, setItemDetails] = useState([]);
  const [warehouseName, setWarehouseName] = useState("");

  const [itemDetails, setItemDetails] = useState({
    item_name: '',
    description: '',
    category: '',
    status: '',
    quantity:'',
    warehouse_id: '',
    warehouse_name:''
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


  return (
    <>
      <section className="item">
        <form className="itemForm">
          <div className="item-top">
            <Link to={`/inventory`}>
              <div className="item-top__backIcon">
                <img
                  src={backIcon}
                  alt="arrow-back-icon"
                  className="item-top__backIcon"
                />
              </div>
            </Link>

            <h1 className="item-top__title" color="red">{itemDetails.item_name} </h1>
            <Link to={`/inventory/${id}/edit`}>
              <div className="item-top__edit">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="item-top__editIcon"
                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
                    fill="#FFFFFF"
                  />
                </svg>{" "}
                <span className="item-top__editText">Edit</span>
              </div>
            </Link>
          </div>
          <div className="item-bottom">
            <div className="item-bottom__left">
              <div className="item-bottom__left__description">
                <h3 className="item-bottom__title item-bottom__left__descriptionTitle">
                  ITEM DESCRIPTION
                </h3>
                <span className="item-bottom__left__descriptionText">
                  {itemDetails.description}
                </span>
              </div>
              <div className="item-bottom__right__category">
                <h3 className="item-bottom__title  item-bottom__right__categoryTitle">
                  CATEGORY
                </h3>
                <span className="item-bottom__right__categoryText">
                  {itemDetails.category}
                </span>
              </div>
            </div>

            <div className="item-bottom__right-wrapper">
              <div className="item-bottom__right item-bottom__right__uppper">
                <div className="item-bottom__right__status">
                  <h3 className="item-bottom__title  item-bottom__right__statusTitle">
                    STATUS
                  </h3>
                  {itemDetails.status === "In Stock" && (
                    <div className="item-bottom__right__status">
                      <span
                        className="item-bottom__right__statusText item-bottom__right__statusText--inStcok"
                        id="inStock"
                      >
                        In Stock
                      </span>
                    </div>
                  )}
                  {itemDetails.status === "Out of Stock" && (
                    <div className="item-bottom__right__status">
                      <span
                        className="item-bottom__right__statusText  item-bottom__right__statusText--outOfStock"
                        id="outOfStock"
                      >
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="item-bottom__right__qty">
                  <h3 className="item-bottom__title item-bottom__right__qtyTitle">
                    QUANTITY
                  </h3>
                  <span className="item-bottom__right__qtyText">
                    {itemDetails.quantity}
                  </span>
                </div>
              </div>
              <div className="item-bottom__right item-bottom__right__bottom">
                <div className="item-bottom__right__warehouse">
                  <h3 className="item-bottom__title item-bottom__right__warehouseTitle">
                    WAREHOUSE
                  </h3>
                  <span className="item-bottom__right__warehouseText">
                    {itemDetails.warehouse_name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
