const express = require("express");
const warehouseRoutes = require('./routes/warehouse');
const inventoryRoutes = require('./routes/inventory');
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = 8088;


app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    return res.send("Welcome to Instock");
});



app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/inventory", inventoryRoutes);



app.listen(PORT, () =>{
    console.log(`You are now on server ${PORT}`)
});

