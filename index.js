const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//mount routes
const blogRoutes = require("./routes/blog");
app.use("/api/v1", blogRoutes);

//Database connetion
const dbconnect = require("./config/database");
dbconnect();

//Start the server
app.listen(PORT, ()=>{
    console.log(`Server is started on port no${PORT}`);
    
})

//default route 
app.get('/', (req,res)=>{
    res.send(`<h1>This is Home Page</h1>`);
})
