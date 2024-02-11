const express = require("express");
const router = express.Router();
const knex = require('knex')(require('../../DB Setup/knexfile'));
const { fetchInventories, addInventoryItem} = require("../../Controllers/inventoryControllers");
require('dotenv').config();

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
  const { item_name, description, quantity, category, status, warehouse_id } = req.body;
  try {
    
    const updatedItem = await knex('inventories')
      .where({ id: parseInt(id) })
      .update({
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity
      });
    if (updatedItem) {
      res.json({ success: true, message: `Item with id ${id} updated successfully. ${warehouse_id}` });
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


//pull categpries
router.get('/cat/categories', async (req, res) => {
  try {
    const uniqueCategories = await knex('inventories').distinct('category');
    res.status(200).json(uniqueCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const item = await knex('inventories').where({ id: parseInt(id) }).first();

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await knex('inventories')
      .where({ id: id })
      .del();

    return res.status(204).json({message: "Inventory item deleted successfully"});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
