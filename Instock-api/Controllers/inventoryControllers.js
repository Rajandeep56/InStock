const knex = require('knex')(require('../DB Setup/knexfile'));
const { v4: uuidv4 } = require('uuid');

exports.fetchInventories = async () => {
  try {
    const inventories = await knex('inventories').select('*');
    return inventories;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching inventories from the database');
  }
};

const fetchWarehouseByNameFromDb = async (warehouseName) => {
  try {
    const result = await knex('warehouses').whereRaw('LOWER(warehouse_name) = ?', warehouseName.toLowerCase()).first();
    return result;
  } catch (error) {
    console.error("Error fetching warehouse by name:", error);
    throw error;
  }
};

exports.addInventoryItem = async (req, res) => {
  const { item_name, description, category, status, quantity, warehouse_id } = req.body;

  if (!item_name || !description || !category || !status || !warehouse_id) {
    return res.status(400).send("Please make sure to fill out all required fields.");
  }
  if (status === 'In Stock' && (quantity == null || quantity <= 0)) {
    return res.status(400).send("For 'In Stock' items, quantity must be provided and greater than 0.");
  }
  const warehouseExists = await knex('warehouses').where({ id: warehouse_id }).first();
  if (!warehouseExists) {
    return res.status(404).send("Warehouse not found.");
  }
  let adjustedQuantity = quantity;
  if (status === 'Out of Stock') {
    adjustedQuantity = 0; 
  } else if (status === 'In Stock' && quantity <= 0) {
    return res.status(400).send("In Stock items must have a positive quantity.");
  }
  try {
    const [newInventoryId] = await knex("inventories").insert({
      item_name,
      description,
      category,
      status,
      quantity: adjustedQuantity,
      warehouse_id
    }, 'id');

    const newInventoryItem = await knex('inventories').where({ id: newInventoryId }).first();
    return res.status(201).json(newInventoryItem);
  } catch (error) {
    console.error("Error adding inventory item:", error);
    return res.status(500).send("Error creating inventory item.");
  }
};

