const express = require("express");
const router = express.Router();
const knex = require('knex')(require('../../DB Setup/knexfile'));
const fs = require("fs");
const { fetchInventories, addInventoryItem } = require("../../controllers/inventoryControllers");



router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
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
        warehouse_id: parseInt(warehouse_id),
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
  try {
    const inventories = await fetchInventories();
    res.status(200).json(inventories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post("/", async (req, res) => {
  try {
    const { itemName, description, category, status, quantity, warehouseName } = req.body;

    if (!itemName || !description || !category || !status || !quantity || !warehouseName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newItem = await addInventoryItem({
      item_name: itemName,
      description,
      category,
      status,
      quantity: Number(quantity),
      warehouse_id: warehouseName, 
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
