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

  if (!item_name || !description || !category || !status || !quantity || !warehouse_id) {
    return res.status(400).send("Please make sure to fill out all required fields.");
  }

  // Check if the warehouse exists
  const warehouseExists = await knex('warehouses').where({ id: warehouse_id }).first();
  if (!warehouseExists) {
    return res.status(404).send("Warehouse not found.");
  }

  try {
    const [newInventoryId] = await knex("inventories").insert({
      item_name,
      description,
      category,
      status,
      quantity,
      warehouse_id
    }, 'id'); // Assuming 'id' is the auto-increment primary key

    const newInventoryItem = await knex('inventories').where({ id: newInventoryId }).first();
    return res.status(201).json(newInventoryItem);
  } catch (error) {
    console.error("Error adding inventory item:", error);
    return res.status(500).send("Error creating inventory item.");
  }
};
// exports.createInventoryItem = (req, res) => {

//   const newItem = {
//     item_name: req.body.itemName, 
//     description: req.body.description,
//     category: req.body.category,
//     status: req.body.status,
//     quantity: req.body.quantity, 
//     warehouse_id: req.body.warehouseName, 
//   };
  
//   knex('inventories')
//     .insert(newItem)
//     .then((ids) => {      
//       const newId = ids[0]; 
//       return knex('inventories').where({ id: newId }).first();
//     })
//     .then(newItemData => {
//       res.status(201).json(newItemData);
//     })
//     .catch(err => {
//       res.status(400).send(`Error creating new inventory item: ${err}`);
//     });
// };
