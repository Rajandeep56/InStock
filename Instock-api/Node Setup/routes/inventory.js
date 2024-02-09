const express = require("express");
const router = express.Router();
const knex = require('knex')(require('../../DB Setup/knexfile'));
const fs = require("fs");
const { fetchInventories, addInventoryItem} = require("../../Controllers/inventoryControllers");
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const fetchWarehouseByIdFromDb = async (id) => {
  try {
    const result = await knex.select('*').from('warehouses').where({ id }).first();
    return result;
  } catch (error) {
    console.error("Error fetching warehouse by ID:", error);
    throw error;
  }
};

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('ID:', id); 
  try {
    const currentItem = await knex('inventories').where({ id: parseInt(id) }).first();

    if (currentItem) {
      res.json(currentItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { item_name, description, category, status, warehouse_id } = req.body;

  try {
    const updatedItem = await knex('inventories')
      .where({ id: parseInt(id) })
      .update({
        warehouse_id: warehouseName,
        item_name,
        description,
        category,
        status
      });

    if (updatedItem) {
      res.json({ success: true, message: `Item with id ${id} updated successfully.` });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/", async (req, res) => {
  console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD)
  try {
    const inventories = await fetchInventories();
    res.status(200).json(inventories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/add", addInventoryItem);

module.exports = router;
