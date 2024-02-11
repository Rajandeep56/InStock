const express = require("express");
const router = express.Router();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+\d{1,3}\s?\(\d{1,4}\)\s?\d{1,4}-?\d{1,4}$/;
const knex = require('knex')(require('../../DB Setup/knexfile'));
const cors = require('cors');
router.use(cors());

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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await fetchWarehouseByIdFromDb(id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse does not exist. Please check and try again" });
    }

    await knex('warehouses')
      .where({ id: id })
      .del();

    return res.status(204).json({message: "Warehouse deleted successfully"});
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
//list of available warehouses
router.get('/list/warehouses', async (req, res) => {
  try {
    const warehouses = await knex('warehouses').select('id', 'warehouse_name');
    res.status(200).json(warehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// edit warehouse
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;

  try {
    const updatedWarehouse = await knex('warehouses')
      .where({ id: parseInt(id) })
      .update({
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email
      });

    if (updatedWarehouse) {
      res.json({ success: true, message: `Warehouse with id ${id} updated successfully.` });
    } else {
      res.status(404).json({ error: 'Warehouse not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
