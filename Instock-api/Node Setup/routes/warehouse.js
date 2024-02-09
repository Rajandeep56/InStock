const express = require("express");
const router = express.Router();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const knex = require('knex')(require('../../DB Setup/knexfile'));

const fetchWarehousesFromDb = async () => {
  try {
    return await knex.select('*').from('warehouses');
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    throw error;
  }
};

const fetchWarehouseByIdFromDb = async (id) => {
  try {
    const result = await knex.select('*').from('warehouses').where({ id }).first();
    return result;
  } catch (error) {
    console.error("Error fetching warehouse by ID:", error);
    throw error;
  }
};

const addWarehouseToDb = async (warehouse) => {
  try {
    const [newWarehouseId] = await knex('warehouses').insert(warehouse);
    return await fetchWarehouseByIdFromDb(newWarehouseId);
  } catch (error) {
    console.error("Error adding warehouse:", error);
    throw error;
  }
};

router.get('/', async (req, res) => {
  try {
    const warehouses = await fetchWarehousesFromDb();
    const warehouseList = warehouses.map((warehouse) => ({
      id: warehouse.id,
      warehouse_name: warehouse.warehouse_name,
      address: warehouse.address,
      contact_name: warehouse.contact_name,
      contact_phone: warehouse.contact_phone,
      contact_email: warehouse.contact_email,
    }));
    return res.status(200).json({ warehouseList });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const warehouseMatch = await fetchWarehouseByIdFromDb(id);

    if (!warehouseMatch) {
      return res.status(404).json({ message: "Warehouse does not exist. Please check and try again" });
    }

    return res.status(200).json(warehouseMatch);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    if (
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      return res.status(400).json({ message: "All fields are required!!!" });
    }

    if (!emailRegex.test(contact_email)) {
      return res.status(400).json({ message: "Email format unacceptable." });
    }

    if (!phoneRegex.test(contact_phone)) {
      return res.status(400).json({
        message: "Phone format unacceptable. Acceptable format: +1(234) 567-8910 ",
      });
    }

    const newWarehouseDetails = {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    };

    const recentWarehouse = await addWarehouseToDb(newWarehouseDetails);

    return res.status(201).json({ recentWarehouse });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
