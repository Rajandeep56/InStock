const knex = require('knex')(require('../DB Setup/knexfile'));

const fetchInventories = async () => {
  try {
    const inventories = await knex('inventories').select('*');
    return inventories;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching inventories from the database');
  }
};

const addInventoryItem = async (newItem) => {
  try {
    const [newInventoryItem] = await knex('inventories')
      .insert({
        ...newItem,
        id: undefined, 
      })
      .returning('*');

    return newInventoryItem;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding inventory item to the database');
  }
};

module.exports = { fetchInventories, addInventoryItem };
